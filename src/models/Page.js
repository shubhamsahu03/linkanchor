import { model, models, Schema } from "mongoose";

// Page schema with links containing a clickCount field
const PageSchema = new Schema(
  {
    uri: { type: String, required: true, min: 1, unique: true },
    owner: { type: String, required: true },
    displayName: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "" },
    bgType: { type: String, default: "color" },
    bgColor: { type: String, default: "#000" },
    bgImage: { type: String, default: "" },
    buttons: { type: Object, default: {} },
    links: [
      {
        title: String,
        subtitle: String,
        url: String,
        clickCount: { type: Number, default: 0 }, // Track clicks for each link
      },
    ],
  },
  { timestamps: true }
);

export const Page = models?.Page || model("Page", PageSchema);
