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
    Progress
} from "@nextui-org/react";

export function TestTable() {

    return (
        <div >
            <Table removeWrapper aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>Review Test</TableColumn>
                    <TableColumn>Reading Score</TableColumn>
                    <TableColumn>Math Score</TableColumn>
                    <TableColumn width = "300">Total Score</TableColumn>
                    <TableColumn>Date</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Button color="success" variant="bordered" size="sm">
                                Review Test
                            </Button>
                        </TableCell>
                        <TableCell></TableCell>

                        <TableCell className="flex flex-row gap-2">
                        </TableCell>

                        <TableCell>
                            
                        </TableCell>

                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}