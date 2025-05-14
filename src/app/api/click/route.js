import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    const url = new URL(req.url);
    const clickedLink = atob(url.searchParams.get("url"));
    const page = url.searchParams.get("page");

    const userAgent = req.headers.get("user-agent") || "";
    const browser = userAgent.split(" ")[0] || "unknown";
    const ip = req.headers.get("x-forwarded-for") || "0.0.0.0";
    const location = "unknown";

    console.log("Clicked URL:", clickedLink);
    console.log("Page URI:", page);

    await Event.create({
      type: "click",
      uri: clickedLink,
      page,
      browser,
      location,
    });

    const updateResult = await Page.updateOne(
      { uri: page, "links.url": clickedLink },
      { $inc: { "links.$.clickCount": 1 } }
    );

    console.log("ClickCount Update Result:", updateResult);

    return Response.json({ success: true });
  } catch (e) {
    console.error("Click tracking failed:", e);
    return new Response("Error", { status: 500 });
  }
}
