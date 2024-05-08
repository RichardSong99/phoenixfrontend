"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Study() {
  const router = useRouter();

  useEffect(() => {
    router.push("/study/mydashboard"); // Replace "/study/mydashboard" with the desired URL
  }, []);

  return null;
}
