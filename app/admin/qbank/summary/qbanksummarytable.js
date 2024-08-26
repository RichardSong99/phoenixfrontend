import React, { useState, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Chip,
    Progress,
    Badge,
    Tooltip,
    Divider,
    Tabs,
    Tab
} from "@nextui-org/react";
import { useData } from "@/app/helper/context/datacontext";


const QBankSummaryTable = () => {
    const [selectedSubject, setSelectedSubject] = useState("Math");
    const {topicSummaryList, getCategoryList, filterTopicSummaryListBySubject } = useData();
    const [mathDisplayTopicSummaryList, setMathDisplayTopicSummaryList] = useState([]);
    const [rwDisplayTopicSummaryList, setRWDisplayTopicSummaryList] = useState([]);


    useEffect(() => {
        if (Array.isArray(topicSummaryList)) {
          setMathDisplayTopicSummaryList(filterTopicSummaryListBySubject("Math"));
          setRWDisplayTopicSummaryList(filterTopicSummaryListBySubject("Reading & Writing"));

        }
      }
      , [topicSummaryList, selectedSubject]);

    return (
        <div className="flex w-full flex-row gap-4">


            <Table removeWrapper isCompact={true} >
                <TableHeader>
                    <TableColumn>Topic</TableColumn>
                    <TableColumn># Easy</TableColumn>
                    <TableColumn># Medium</TableColumn>
                    <TableColumn># Hard</TableColumn>
                    <TableColumn># Total</TableColumn>
                </TableHeader>
                <TableBody>
                    {mathDisplayTopicSummaryList.map((item, index) => (
                        <TableRow key={item.topic} >
                            <TableCell>
                                <div className="flex flex-col">
                                    <p className="text-bold text-sm capitalize">{item.topic}</p>
                                    <p className="text-bold text-sm capitalize text-default-400">{item.category}</p>
                                </div>
                            </TableCell>
                            <TableCell>{item.num_easy}</TableCell>
                            <TableCell>{item.num_medium}</TableCell>
                            <TableCell>{item.num_hard}</TableCell>
                            <TableCell>{item.num_total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Table removeWrapper isCompact={true}>
                <TableHeader>
                    <TableColumn>Topic</TableColumn>
                    <TableColumn># Easy</TableColumn>
                    <TableColumn># Medium</TableColumn>
                    <TableColumn># Hard</TableColumn>
                    <TableColumn># Total</TableColumn>
                </TableHeader>
                <TableBody>
                    {rwDisplayTopicSummaryList.map((item, index) => (
                        <TableRow key={index} >
                            <TableCell>
                                <div className="flex flex-col">
                                    <p className="text-bold text-sm capitalize">{item.topic}</p>
                                    <p className="text-bold text-sm capitalize text-default-400">{item.category}</p>
                                </div>
                            </TableCell>
                            <TableCell>{item.num_easy}</TableCell>
                            <TableCell>{item.num_medium}</TableCell>
                            <TableCell>{item.num_hard}</TableCell>
                            <TableCell>{item.num_total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>



        </div>
    );
}

export default QBankSummaryTable;