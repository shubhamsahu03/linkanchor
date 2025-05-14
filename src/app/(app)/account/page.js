import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import cloneDeep from "clone-deep";
import { Page } from "@/models/Page";
import AccountPageClient from "@/components/AccountPageClient";

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  if (!session) {
    return redirect("/");
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const page = await Page.findOne({ owner: session.user.email });

  const leanPage = page ? cloneDeep(page.toJSON()) : null;
  if (leanPage) leanPage._id = leanPage._id.toString();

  return (
    <AccountPageClient
      page={leanPage}
      user={session.user}
      desiredUsername={desiredUsername}
    />
  );
}
