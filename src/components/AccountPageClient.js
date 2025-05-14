"use client";

import { useEffect, useState } from "react";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import UsernameForm from "@/components/forms/UsernameForm";

export default function AccountPageClient({ page, user, desiredUsername }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (page) {
    return (
      <>
        <PageSettingsForm page={page} user={user} />
        <PageButtonsForm page={page} user={user} />
        <PageLinksForm page={page} user={user} />
      </>
    );
  }

  return <UsernameForm desiredUsername={desiredUsername} />;
}
