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
import { accountStore } from "./store";
import LoadingPage from "../loading";

export function AccoutsPage({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const page = accountStore((store) => store.page);
  const pageSize = accountStore((store) => store.pageSize);
  const refreshData = accountStore((store) => store.refreshData);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/accounts?userId=${userId}&page=${page}&pageSize=${pageSize}`,
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
          name: item.name,
          email: item.email,
          role: item.role,
        };
      });

      setData(dataRes);
    } catch (error: any) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId, page, pageSize]);

  useEffect(() => {
    fetchData();
  }, [refreshData]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Card className="h-full overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-lg">Quản lý tài khoản</CardTitle>
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
              dataLength={data.length}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
