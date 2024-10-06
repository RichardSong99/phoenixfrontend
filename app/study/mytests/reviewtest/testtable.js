"use client"

import React, { useState, useEffect, useContext } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    useDisclosure,
    Chip,
    Progress,
    Spinner
} from "@nextui-org/react";
import { getTestsForUser } from '@/app/helper/apiservices/testservice';
import { useRouter } from 'next/navigation';

export function TestTable() {
    const [testData, setTestData] = useState([]);

    useEffect(() => {
        const fetchTests = async () => {
            const response = await getTestsForUser();
            setTestData(response.filter(test => test !== null));
        };
        fetchTests();
    }, []);

    const router = useRouter();

    const startTest = (testID) => {
        console.log("start test", testID);
        router.push(`/study/activetest?testid=${testID}`);
    };

    if(testData.length === 0){
        return <div className='w-full h-[200px] flex flex-row justify-center items-center'>
            <Spinner />
            <div className='ml-[20px]'>Loading...</div>
        </div>;
    }

    return (
        <div >
            <Table removeWrapper aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>Action</TableColumn>
                    <TableColumn>Test Name</TableColumn>
                    <TableColumn>Reading Score</TableColumn>
                    <TableColumn>Math Score</TableColumn>
                    <TableColumn width = "300">Total Score</TableColumn>
                    <TableColumn>Date</TableColumn>
                </TableHeader>
                <TableBody>
                    {testData.map((item, index) => (
                        <TableRow>
                            <TableCell>
                                <Button className='mr-[20px] rounded-[20px]' color="success" variant="bordered" size="sm">
                                    Review Test
                                </Button>
                                <Button onClick={() => startTest(item.id)} className='mr-[-80px] border-appleBlue text-appleGray1 rounded-[20px]' variant="bordered" size="sm">
                                    Start Test
                                </Button>
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.reading_score}</TableCell>
                            <TableCell>{item.math_score}</TableCell>
                            <TableCell>{item.reading_score + item.math_score}</TableCell>
                            <TableCell>{new Date(item.attempt_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}