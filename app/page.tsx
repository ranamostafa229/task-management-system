"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // When user clicks the email link, this runs
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash); // to treat the string as query params
    const type = params.get("type");
    const token = params.get("access_token");

    if (type === "recovery" && token) {
      router.replace(`/reset-password?token=${token}`);
    }
  }, [router]);
  return <div></div>;
}
