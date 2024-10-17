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
import { Icon } from '@iconify/react';

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
             
                    <TableColumn>Test Name</TableColumn>
                    <TableColumn>Reading Score</TableColumn>
                    <TableColumn>Math Score</TableColumn>
                    <TableColumn>Total Score</TableColumn>
                    <TableColumn>Date</TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody>
                    {testData.map((item, index) => (
                        <TableRow key = {index}>
                        
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.reading_score}</TableCell>
                            <TableCell>{item.math_score}</TableCell>
                            <TableCell>{item.reading_score + item.math_score}</TableCell>
                            <TableCell>{new Date(item.attempt_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                            <TableCell>
                                {item.completed ? (<Button  color="success" variant="bordered" size="md">
                                    Review
                                    <Icon
                                                    icon="line-md:arrow-right"
                                                    width="16"
                                                    height="16"
                                                    className="text-green-600 hover:text-black"
                                                />
                                </Button>):
                                (<Button onClick={() => startTest(item.id)} className=' border-themeDarkBlue text-themeDarkBlue' variant="bordered" size="md">
                                    Start 
                                    <Icon
                                                    icon="line-md:arrow-right"
                                                    width="16"
                                                    height="16"
                                                    className="text-themeDarkBlue hover:text-black"
                                                />
                                </Button>)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}