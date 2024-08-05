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
import { useData } from "@/app/helper/context/datacontext";


const TopicModules = () => {
  const { mathTopicMapping, topicSummaryList } = useData();

  // Fallback to an empty array if topicSummaryList is undefined, null, or not an array
  const [displayTopicSummaryList, setDisplayTopicSummaryList] = useState(Array.isArray(topicSummaryList) ? topicSummaryList : []);

  const achievementTypeMapping = {
    "num answered": { icon: "ri:book-fill", earnedColor: "primary" },
    "num correct": { icon: "clarity:bullseye-solid", earnedColor: "success" },
    "num hard correct": { icon: "maki:mountain", earnedColor: "warning" },
    "num correct under 60": { icon: "mdi:clock", earnedColor: "secondary" },
    default: { icon: "ri:book-fill", earnedColor: "default" }
  };

  return (
    <Table removeWrapper>
      <TableHeader>
        <TableColumn width="200">Topic</TableColumn>
        <TableColumn>Mastery</TableColumn>
        <TableColumn># Questions answered</TableColumn>
        <TableColumn>% Correct</TableColumn>
        <TableColumn>Achievements</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
        {displayTopicSummaryList.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{item.topic}</p>
                <p className="text-bold text-sm capitalize text-default-400">{item.category}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-row">
                <Chip color="success" style={{ color: 'white' }}>Beginner</Chip>
              </div>
            </TableCell>

            <TableCell width="500">
              <Progress
                value={100 * (item.num_answered || 0) / (item.num_total || 1)}
                size="sm"
                label="Number of questions answered"
                showValueLabel={true}
              />
            </TableCell>

            <TableCell width="500">
              <Progress
                value={100 * (item.num_correct || 0) / (item.num_answered || 1)}
                size="sm"
                color="danger"
                label="% answered correctly"
                showValueLabel={true}
              />
            </TableCell>

            <TableCell>
              <div className="flex flex-row gap-2">
                {Array.isArray(item.achievements) && item.achievements.map((achievement, index) => {
                  // Retrieve the icon and button color based on the achievement type
                  const { icon, earnedColor } = achievementTypeMapping[achievement.type] || achievementTypeMapping.default;

                  // Determine the button color based on the earned status
                  const buttonColor = achievement.earned ? earnedColor : "default";

                  // Render Tooltip and Button
                  const tooltipAndButton = (
                    <Tooltip key={index} content={achievement.description}>
                      <Button color={buttonColor} isIconOnly>
                        <Icon icon={icon} width="30" height="30" />
                      </Button>
                    </Tooltip>
                  );

                  // Wrap with Badge if earned, otherwise just return the Tooltip and Button
                  return achievement.earned ? (
                    <Badge
                      key={index}
                      color={buttonColor}
                      isOneChar
                      content={<CheckIconGreen />} // Assuming CheckIconGreen is a valid component
                    >
                      {tooltipAndButton}
                    </Badge>
                  ) : (
                    tooltipAndButton
                  );
                })}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Badge color="danger" content={Math.max(0, (item.num_total || 0) - (item.num_answered || 0))}>
                  <Button size="small" color="primary">Practice</Button>
                </Badge>
                <Badge color="danger" content="5">
                  <Button size="small" color="success" style={{ color: "white" }}>Review</Button>
                </Badge>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TopicModules;
