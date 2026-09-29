import { model, models, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    startedAt: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceMeters: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
  },
  { timestamps: true },
);

export default models.Activity || model('Activity', activitySchema);