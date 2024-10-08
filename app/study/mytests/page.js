"use client"

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Progress,
    Button,
  } from "@nextui-org/react";

import { TestTable } from "./reviewtest/testtable";
import { useRouter } from "next/navigation";

export default function MyTestDashboard() {
    const router = useRouter();
    const startTest = () => {
        router.push("/study/activetest");
    }
    return (
        <div className="flex flex-col w-full justify-center p-10 gap-4">
            <div className="flex flex-row w-full justify-center landing-section">
                <Card
                className="bg-blue-500 rounded-lg shadow-md p-4"
                style={{ width: "100%" }}
                >
                    <CardHeader>
                        <h1 className="text-2xl font-bold text-white">My Tests</h1>
                    </CardHeader>
                </Card>
            </div>
            <Card>
                <CardHeader>
                <div className="flex flex-row w-full justify-between items-center">
                    <div>
                    <h5 className="font-bold text-large">Review Tests</h5>
                    </div>
                    <div className="flex flex-row gap-2">
                    </div>
                    {/* <Button onClick={startTest} className="bg-appleBlue text-white rounded-[20px]" variant="contained" size="sm">
                        Create Practice Test
                    </Button> */}
                </div>
                </CardHeader>
                <CardBody>
                    <TestTable />
                </CardBody>
            </Card>
        </div>
    );
}
