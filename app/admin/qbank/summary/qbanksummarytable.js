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
    const { topicSummaryList, getCategoryList, filterTopicSummaryListBySubject, loadUserData } = useData();
    const [mathDisplayTopicSummaryList, setMathDisplayTopicSummaryList] = useState([]);
    const [rwDisplayTopicSummaryList, setRWDisplayTopicSummaryList] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);


    useEffect(() => {
        if (Array.isArray(topicSummaryList)) {
            setMathDisplayTopicSummaryList(filterTopicSummaryListBySubject("Math"));
            setRWDisplayTopicSummaryList(filterTopicSummaryListBySubject("Reading & Writing"));

        }
    }
        , [topicSummaryList, selectedSubject]);

    const handleDataRefresh = async () => {
        setDataLoading(true);
        await loadUserData();
        setDataLoading(false);
    }


    return (
        <div className="flex w-full flex-col gap-4">
            <div>
            <Button isLoading = {dataLoading} onPress={handleDataRefresh} color = "primary">Refresh</Button>
            </div>
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
        </div>
    );
}

export default QBankSummaryTable;