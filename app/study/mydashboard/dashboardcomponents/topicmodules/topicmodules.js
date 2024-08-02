"use client"
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
  Divider
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { CheckIconGreen } from "@/app/helper/assets/components/CheckIconGreen";


const TopicModules = () => {

  // const renderCell = React.useCallback((topicName, columnKey) => {
  //   switch(columnKey){
  //     case ""
  //   }

  // }, [])



  return (
    <Table removeWrapper >
      <TableHeader>
        <TableColumn width="200">Topic</TableColumn>

        <TableColumn>Mastery</TableColumn>
        <TableColumn># Questions answered</TableColumn>
        <TableColumn>% Correct</TableColumn>
        <TableColumn>Achievements</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((item) => (

          <TableRow key={item}>
            <TableCell>
              <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">Linear algebra</p>
            <p className="text-bold text-sm capitalize text-default-400">Algebra</p>
            </div>
          </TableCell>
            <TableCell>
              <div className="flex flex-row">
               <Chip color="success" style={{ color: 'white' }}>Beginner</Chip>
                {/* <Badge content="5 more" color="warning"><Chip color="warning" variant="bordered">Intermediate</Chip></Badge>
                <Badge content="10 more" color="danger"><Chip color="danger" variant="bordered">Advanced</Chip></Badge> */}
              </div>
            </TableCell>

            <TableCell width="500">
              <Progress value={50} size="sm" label="Number of questions answered" showValueLabel={true} />

            </TableCell>

            <TableCell width="500">
              <Progress value={50} size="sm" color="danger" label="% answered correctly" showValueLabel={true} />

            </TableCell>
            <TableCell>
              <div className="flex flex-row gap-2">
                <Badge isOneChar color="primary" content={<CheckIconGreen />} >
                <Tooltip content = "I am a tooltip">

                  <Button color="primary" isIconOnly><Icon icon="ri:book-fill" width="30" height="30" style={{color: "appleGray1"}} /></Button>
                  </Tooltip>

                </Badge>
                
                <Button color="warning" isIconOnly><Icon icon="clarity:bullseye-solid" width="30" height="30" style={{color: "white"}} /></Button>
                <Button color="primary" isIconOnly><Icon icon="maki:mountain" width="30" height="30" style={{color: "appleGray1"}} /></Button>
                <Button color="default" isIconOnly><Icon icon="mdi:clock" width="30" height="30" style={{color: "white"}} /></Button>

                
                
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Badge color="danger" content="5"> <Button size="small" color="primary">Practice</Button></Badge>
                <Badge color="danger" content="5"> <Button size="small" color="success" style={{color: "white"}}>Review</Button></Badge>

              </div>
            </TableCell>

          </TableRow>

        ))}


      </TableBody>
    </Table>
  );
};

export default TopicModules;
