import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isToday } from "date-fns";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  // Ensure MongoDB connection
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }

  const page = await Page.findOne({ owner: session.user.email }).lean();

  if (!page) {
    return <div>No page found for this user.</div>;
  }

  // Group view events by date
  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: "view",
        page: page.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Get all click events for this page
  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  }).lean();

  // Group clicks by browser (or location)
  const browserBreakdown = await Event.aggregate([
    {
      $match: {
        page: page.uri,
        type: "click",
      },
    },
    {
      $group: {
        _id: "$browser", // Group by browser (can also be "location" for location breakdown)
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  return (
    <div>
      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Views</h2>
        <Chart
          data={groupedViews.map((o) => ({
            date: o._id,
            views: o.count,
          }))}
        />
      </SectionBox>

      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Clicks</h2>
        {page.links.map((link) => {
          const todayClicks = clicks.filter(
            (c) => c.uri === link.url && isToday(new Date(c.createdAt))
          ).length;

          const totalClicks = clicks.filter((c) => c.uri === link.url).length;

          return (
            <div
              key={link.title + link.url}
              className="md:flex gap-4 items-center border-t border-gray-200 py-4"
            >
              <div className="text-blue-500 pl-4">
                <FontAwesomeIcon icon={faLink} />
              </div>
              <div className="grow">
                <h3>{link.title || "no title"}</h3>
                <p className="text-gray-700 text-sm">{link.subtitle || "no description"}</p>
                <a
                  className="text-xs text-blue-400 break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.url}
                >
                  {link.url}
                </a>
              </div>
              <div className="text-center">
                <div className="border rounded-md p-2 mt-1 md:mt-0">
                  <div className="text-3xl">{todayClicks}</div>
                  <div className="text-gray-400 text-xs uppercase font-bold">clicks today</div>
                </div>
              </div>
              <div className="text-center">
                <div className="border rounded-md p-2 mt-1 md:mt-0">
                  <div className="text-3xl">{totalClicks}</div>
                  <div className="text-gray-400 text-xs uppercase font-bold">clicks total</div>
                </div>
              </div>
            </div>
          );
        })}
      </SectionBox>

      <SectionBox>
        <h2 className="text-xl mb-6 text-center">Click Breakdown by Browser</h2>
        <ul className="space-y-4">
          {browserBreakdown.map((item) => (
            <li key={item._id} className="flex justify-between text-lg">
              <span>{item._id || "Unknown browser"}</span>
              <span>{item.count} clicks</span>
            </li>
          ))}
        </ul>
      </SectionBox>

      {/* Optional: Add location breakdown */}
      {/* <SectionBox>
        <h2 className="text-xl mb-6 text-center">Click Breakdown by Location</h2>
        <ul className="space-y-4">
          {locationBreakdown.map((item) => (
            <li key={item._id} className="flex justify-between text-lg">
              <span>{item._id || "Unknown location"}</span>
              <span>{item.count} clicks</span>
            </li>
          ))}
        </ul>
      </SectionBox> */}
    </div>
  );
}
