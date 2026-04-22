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
    const error = params.get("error");

    if (type === "recovery" && token && !error) {
      router.replace(`/reset-password?token=${token}`);
    } else if (error) {
      router.replace(`/reset-password`);
    } else {
      router.replace(`/login`);
    }
  }, [router]);
  return <div></div>;
}
