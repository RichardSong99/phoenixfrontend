import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Progress,
  Button,
  Badge,
  CircularProgress,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

export const GamifiedPanel = ({}) => {
  // Component logic goes here

  return (
    // JSX code for the component goes here
    <div>
      {/* Content of the GamifiedPanel component */}
      <Card className = "max-w-[800px]">
        <CardHeader>
          <div className="flex flex-row w-full justify-between items-center">
            <div>
              <h5 className="font-bold text-large">Linear equations</h5>
            </div>
            <div className="flex flex-row gap-4">
              <Badge content="5" color="danger">
                <Button>Review</Button>
              </Badge>

              <Badge content="5" color="danger">
                <Button>Practice</Button>
              </Badge>
            </div>
          </div>
        </CardHeader>
  
        <CardFooter>
          <Accordion>
            <AccordionItem title="View achievements">
              <div className="flex flex-row w-full gap-5">
                <CircularProgress
                  classNames={{
                    svg: "w-36 h-36 drop-shadow-md",
                    indicator: "stroke-primary",
                    track: "stroke-default/20",
                    value: "text-3xl font-semibold text-primary",
                  }}
                  value={70}
                  strokeWidth={4}
                  showValueLabel={true}
                />

                <CircularProgress
                  classNames={{
                    svg: "w-36 h-36 drop-shadow-md",
                    indicator: "stroke-secondary",
                    track: "stroke-default/20",
                    value: "text-3xl font-semibold text-secondary",
                  }}
                  value={70}
                  strokeWidth={4}
                  showValueLabel={true}
                />
              </div>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      </Card>
    </div>
  );
};
