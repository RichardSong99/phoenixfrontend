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
} from "@nextui-org/react";

const TopicModules = () => {
  return (
    <Table removeWrapper>
      <TableHeader>
        <TableColumn width = "520">Module</TableColumn>
        <TableColumn width = "520">% Question Bank Completed</TableColumn>
        <TableColumn width = "520">Mastery</TableColumn>
        <TableColumn></TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Module 1</TableCell>
          <TableCell>
            <Progress value={50} />
          </TableCell>
          <TableCell>
            <Progress value={50} />
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Button size="small">Practice</Button>
              <Button size="small">Browse</Button>
              <Button size="small">Review</Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TopicModules;
