"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SheetForm } from "./form";
import { DataTable } from "./data-table";
import { SearchInput } from "./search-input";
import { monitorStore } from "./store";
import LoadingPage from "../loading";

export function MonitorPage({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const page = monitorStore((store) => store.currentPage);
  const pageSize = monitorStore((store) => store.pageSize);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/monitor?userId=${userId}&page=${page}&pageSize=${pageSize}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Lỗi khi get data");
        }
        const result = await response.json();

        const dataRes = result.data.map((item: any) => {
          return {
            id: item.id,
            date: item.createdAt,
            sessionId: item.sessionId,
            sipMethod: item.sipMethod,
            sipFromUser: item.sipFromUser,
            sipToUser: item.sipToUser,
            sourceIP: item.sourceIP,
            srcPort: item.srcPort,
            destinationIP: item.destinationIP,
            dstPort: item.dstPort,
          };
        });

        setCount(result.count);
        setData(dataRes);
      } catch (error: any) {
        toast.error(`${error}`);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, page, pageSize]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Card className="h-full overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-lg">Giám sát</CardTitle>
            <div className="w-full flex justify-between mt-4">
              <div className="">
                <SearchInput />
              </div>
              <div className="">
                <SheetForm userId={userId} role={role} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="" style={{ height: "calc(100% - 180px)" }}>
            <DataTable
              columns={columns}
              data={data ? data : []}
              dataLength={count}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
