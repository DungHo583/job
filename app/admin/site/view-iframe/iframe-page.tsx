"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingPage from "../loading";

export function ViewIframePage({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Card className="h-full">
          <CardContent className="pt-6" style={{ height: "100%" }}>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/-XJ4WoByAOA?si=eDPyMyxdeJ2VTFb7"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </CardContent>
        </Card>
      )}
    </>
  );
}
