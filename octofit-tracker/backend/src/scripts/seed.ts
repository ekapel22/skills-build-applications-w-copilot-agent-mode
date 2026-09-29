import 'dotenv/config';
import { scryptSync } from 'node:crypto';
import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const periodStart = new Date('2026-01-01T00:00:00.000Z');
const passwordSalt = 'octofit-seed-v1';
const passwordHash = `scrypt$${passwordSalt}$${scryptSync('octofit-demo-password', passwordSalt, 64).toString('hex')}`;

async function seedDatabase() {
  await mongoose.connect(connectionString);

  try {
    const userSeeds = [
      { displayName: 'Alex Morgan', email: 'alex.morgan@example.com' },
      { displayName: 'Jordan Lee', email: 'jordan.lee@example.com' },
      { displayName: 'Sam Rivera', email: 'sam.rivera@example.com' },
      { displayName: 'Taylor Kim', email: 'taylor.kim@example.com' },
    ];

    for (const user of userSeeds) {
      await User.updateOne(
        { email: user.email },
        { $setOnInsert: { ...user, passwordHash } },
        { upsert: true },
      );
    }

    const users = await User.find({ email: { $in: userSeeds.map(({ email }) => email) } });
    const userByEmail = new Map(users.map((user) => [user.email, user]));
    const teams = [
      { name: 'Stride Society', members: ['alex.morgan@example.com', 'jordan.lee@example.com'] },
      { name: 'Trail Blazers', members: ['sam.rivera@example.com', 'taylor.kim@example.com'] },
    ];
    const teamByName = new Map<string, mongoose.Types.ObjectId>();

    for (const teamSeed of teams) {
      const team = await Team.findOneAndUpdate(
        { name: teamSeed.name },
        {
          $set: {
            members: teamSeed.members.map((email) => userByEmail.get(email)!.id),
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );
      teamByName.set(team.name, team._id);
    }

    const activitySeeds = [
      { email: 'alex.morgan@example.com', activityType: 'Running', startedAt: '2026-01-12T07:30:00.000Z', durationMinutes: 32, distanceMeters: 5200, calories: 340 },
      { email: 'jordan.lee@example.com', activityType: 'Cycling', startedAt: '2026-01-13T16:15:00.000Z', durationMinutes: 48, distanceMeters: 18000, calories: 410 },
      { email: 'sam.rivera@example.com', activityType: 'Walking', startedAt: '2026-01-14T08:00:00.000Z', durationMinutes: 40, distanceMeters: 3500, calories: 190 },
      { email: 'taylor.kim@example.com', activityType: 'Strength training', startedAt: '2026-01-14T18:00:00.000Z', durationMinutes: 45, calories: 280 },
      { email: 'alex.morgan@example.com', activityType: 'Yoga', startedAt: '2026-01-15T07:00:00.000Z', durationMinutes: 25, calories: 110 },
      { email: 'sam.rivera@example.com', activityType: 'Running', startedAt: '2026-01-16T06:45:00.000Z', durationMinutes: 28, distanceMeters: 4600, calories: 305 },
    ];

    for (const activity of activitySeeds) {
      const user = userByEmail.get(activity.email)!;
      const startedAt = new Date(activity.startedAt);
      await Activity.updateOne(
        { user: user._id, activityType: activity.activityType, startedAt },
        { $setOnInsert: { ...activity, user: user._id, startedAt } },
        { upsert: true },
      );
    }

    const leaderboardSeeds = [
      { email: 'alex.morgan@example.com', teamName: 'Stride Society', points: 420 },
      { email: 'jordan.lee@example.com', teamName: 'Stride Society', points: 365 },
      { email: 'sam.rivera@example.com', teamName: 'Trail Blazers', points: 390 },
      { email: 'taylor.kim@example.com', teamName: 'Trail Blazers', points: 315 },
    ];

    for (const entry of leaderboardSeeds) {
      const user = userByEmail.get(entry.email)!;
      await LeaderboardEntry.updateOne(
        { user: user._id, periodStart },
        {
          $set: {
            team: teamByName.get(entry.teamName),
            points: entry.points,
          },
          $setOnInsert: { user: user._id, periodStart },
        },
        { upsert: true },
      );
    }

    const workoutSeeds = [
      { name: 'Easy Run', description: 'A relaxed, conversational-pace run.', focus: 'Cardio', difficulty: 'beginner', durationMinutes: 25 },
      { name: 'Tempo Ride', description: 'Steady cycling intervals to build endurance.', focus: 'Cardio', difficulty: 'intermediate', durationMinutes: 40 },
      { name: 'Full Body Basics', description: 'A balanced introduction to bodyweight strength.', focus: 'Strength', difficulty: 'beginner', durationMinutes: 30 },
      { name: 'Mobility Reset', description: 'A gentle sequence for flexibility and recovery.', focus: 'Mobility', difficulty: 'beginner', durationMinutes: 20 },
    ] as const;

    for (const workout of workoutSeeds) {
      await Workout.updateOne(
        { name: workout.name },
        { $setOnInsert: workout },
        { upsert: true },
      );
    }

    console.log('Seeded users, teams, activities, leaderboard entries, and workouts in octofit_db');
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
