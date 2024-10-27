"use client";
import React, { useState, useContext } from "react";
import {
  Button,
  Chip,
  Progress,
  Tooltip,
  Divider,
  Tabs,
  Tab,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
  CheckboxGroup,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { QuestionContext } from "@/app/helper/context/questioncontext";
import { useData } from "@/app/helper/context/datacontext";
import { CustomCheckbox } from "@/app/helper/assets/components/CustomCheckbox";

const getBackgroundColor = (progressValue) => {
  if (progressValue === 0) return "bg-gray-300";
  if (progressValue < 20) return "bg-gray-500";
  if (progressValue < 40) return "bg-gray-400";
  if (progressValue < 60) return "bg-green-300";
  if (progressValue < 80) return "bg-green-400";
  return "bg-green-500"; // Fully green at 80% or above
};

const ModuleCard = ({ category, handleTopicClick }) => {
  const { getTopicsByCategory, getTopicSummaryElement } = useData();

  const topics = getTopicsByCategory(category);

  return (
    <div className="w-full p-0 border border-gray-300 shadow-md rounded-lg px-2 py-2 flex items-center">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <span className="px-2 font-bold text-gray-800" style={{ fontSize: "18px" }}>
            {category}
          </span>
        </div>
        <Divider />
        {topics.map((topic, index) => {
          const { usage = 0, accuracy = 0 } = getTopicSummaryElement(topic) || {};
          const progressValue = usage * 100;
          const accuracyValue = accuracy * 100;

          return (
            <div key={index} className="flex flex-row justify-between items-center w-full">
              <div style={{ fontSize: "14px", color: "#333333" }} className="px-2">
                {topic}
              </div>
              <div className="flex flex-row items-center gap-5">
                <Tooltip content={`${Math.round(progressValue)}% completed`}>
                  <Progress value={progressValue} color="default" className="w-60" size="md" />
                </Tooltip>
                <div className = "w-16"> 
                <Chip size="sm" className={`text-white ${getBackgroundColor(progressValue)}`}>
                  {Math.round(progressValue)}% completed
                </Chip>
                </div>
                <div className = "w-16"> 

                <Chip size="sm" className={`text-white ${getBackgroundColor(accuracyValue)}`}>
                  {accuracyValue === 0 ? "--" : Math.round(accuracyValue)}% correct
                </Chip>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  onPress={() => handleTopicClick(topic)}
                  className="border-blue-800"
                  variant="bordered"
                >
                  <Icon icon="line-md:arrow-right" width="15" height="15" style={{ color: "#0B2149" }} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TopicModules = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedDifficultiesLocal, setSelectedDifficultiesLocal] = useState(["easy", "medium", "hard"]);
  const [selectedTopicsLocal, setSelectedTopicsLocal] = useState([]);
  const [selectedDisplaySubject, setSelectedDisplaySubject] = useState("All");
  const [displayErrorInModal, setDisplayErrorInModal] = useState(false);

  const { createAdaptiveQuiz, setSelectedTopics, NEWADAPTIVEQUIZACTION } = useContext(QuestionContext);
  const router = useRouter();

  const handlePracticeClick = async (onClose) => {
    onClose();
    setSelectedTopics(selectedTopicsLocal);
    try {
      const response = await createAdaptiveQuiz({
        allowedDifficulties: selectedDifficultiesLocal,
        topics: selectedTopicsLocal,
      });

      if (response !== null) {
        router.push(`/study/activequiz?quizid=${response}&action=${NEWADAPTIVEQUIZACTION}`);
      } else {
        console.log("Failed to create adaptive quiz");
        setDisplayErrorInModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTopicClick = (topic) => {
    setSelectedTopicsLocal([topic]);
    onOpen();
  };

  const mathCategories = ["Algebra", "Advanced math", "Problem solving and data analysis", "Geometry and trigonometry"];
  const rwCategories = [
    "Rhetorical and structural analysis",
    "Interpreting information and ideas",
    "Standard English conventions",
    "Effective expression and revision",
  ];

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div>
        <Tabs
          color="default"
          aria-label="Tabs colors"
          radius="full"
          selectedKey={selectedDisplaySubject}
          onSelectionChange={setSelectedDisplaySubject}
        >
          <Tab key="All" title="All" />
          <Tab key="Math" title="Math" />
          <Tab key="Reading & Writing" title="Reading & Writing" />
        </Tabs>
      </div>

      <div className="flex flex-col w-full px-20 gap-3">
        {(selectedDisplaySubject === "All" || selectedDisplaySubject === "Math") &&
          mathCategories.map((category) => (
            <ModuleCard key={category} category={category} handleTopicClick={handleTopicClick} />
          ))}

        {(selectedDisplaySubject === "All" || selectedDisplaySubject === "Reading & Writing") &&
          rwCategories.map((category) => (
            <ModuleCard key={category} category={category} handleTopicClick={handleTopicClick} />
          ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Start Practice</ModalHeader>
              <ModalBody>
                <CheckboxGroup
                  className="gap-1"
                  label="Select difficulties"
                  orientation="horizontal"
                  value={selectedDifficultiesLocal}
                  onChange={setSelectedDifficultiesLocal}
                >
                  <CustomCheckbox value="easy">easy</CustomCheckbox>
                  <CustomCheckbox value="medium">medium</CustomCheckbox>
                  <CustomCheckbox value="hard">hard</CustomCheckbox>
                </CheckboxGroup>

                {displayErrorInModal && <div className="text-red-500 text-sm">Error creating adaptive quiz.</div>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handlePracticeClick(onClose)}>
                  Start Practice
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TopicModules;
