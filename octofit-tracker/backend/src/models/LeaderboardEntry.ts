import { model, models, Schema } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
    periodStart: { type: Date, required: true },
  },
  { timestamps: true },
);

leaderboardEntrySchema.index({ user: 1, periodStart: 1 }, { unique: true });

export default models.LeaderboardEntry || model('LeaderboardEntry', leaderboardEntrySchema);