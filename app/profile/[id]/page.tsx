"use client";
import { useParams } from "next/navigation";

import React from "react";
import ViewProfile from "@/component/user/UserProfile";
import UserBlog from "@/component/blog/UserBlog";

export default function Page() {
  const params = useParams<{ id: string }>();
  return (
    <>
      <ViewProfile id={params.id} />
      <UserBlog id={params.id} />
    </>
  );
}
