"use client";
import AuthHeader from "./_components/AuthHeader";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
      router.replace(`/reset-password?token=${encodeURIComponent(token)}`);
    } else if (error) {
      router.replace(`/reset-password`);
    } else {
      router.replace(`/login`);
    }
  }, [router]);
  return (
    <div>
      <AuthHeader
        title="Redirecting..."
        description="Please wait while we take you to the right page."
      />
      <CardContent className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-28 ml-auto" />
      </CardContent>
    </div>
  );
}
