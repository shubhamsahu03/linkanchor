import { model, models, Schema } from "mongoose";

// Event schema to track all click events, including browser and location info
const EventSchema = new Schema(
  {
    type: String, // 'click' or 'view'
    page: String,
    uri: String,
    browser: String,
    location: String,
  },
  { timestamps: true }
);

export const Event = models?.Event || model("Event", EventSchema);
