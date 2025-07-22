// ClientLayout.tsx
"use client";

import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout, setUser } from "@/features/auth/authSlice";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(setUser(session.user));
    } else if (status === "unauthenticated") {
      dispatch(logout());
    }
  }, [session, dispatch, status]);
  return <>{children}</>;
}
