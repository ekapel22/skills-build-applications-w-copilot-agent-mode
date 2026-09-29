import cors from 'cors';
import express, { type ErrorRequestHandler, type RequestHandler } from 'express';
import type { Model } from 'mongoose';
import Activity from './models/Activity.js';
import LeaderboardEntry from './models/LeaderboardEntry.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

const app = express();

app.use(cors());
app.use(express.json());

const listDocuments = <DocumentType,>(model: Model<DocumentType>, projection?: string): RequestHandler =>
  async (_request, response, next) => {
    try {
      let query = model.find();
      if (projection) query = query.select(projection);
      response.json(await query.lean());
    } catch (error) {
      next(error);
    }
  };

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' });
});
app.get('/api/users', listDocuments(User, '-passwordHash'));
app.get('/api/teams', listDocuments(Team));
app.get('/api/activities', listDocuments(Activity));
app.get('/api/leaderboard', listDocuments(LeaderboardEntry));
app.get('/api/workouts', listDocuments(Workout));

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

export default app;