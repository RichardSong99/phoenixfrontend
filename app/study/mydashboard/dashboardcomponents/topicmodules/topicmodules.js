"use client"
import React, { useState, useEffect, useContext } from "react";
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
  Tab,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
  CheckboxGroup,
  Slider,

} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { CheckIconGreen } from "@/app/helper/assets/components/CheckIconGreen";
import { useRouter } from 'next/navigation';
import { QuestionContext } from "@/app/helper/context/questioncontext";
import { Spinner, Accordion, AccordionItem } from "@nextui-org/react";
import { CustomCheckbox } from "@/app/helper/assets/components/CustomCheckbox";
import { useData } from "@/app/helper/context/datacontext";


const TopicModules = () => {
  const {
    getTopicsByCategory,
    getTopicSummaryElement,
    topicSummaryList,
  } = useData();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedDifficultiesLocal, setSelectedDifficultiesLocal] = useState(["easy", "medium", "hard"]);
  const [selectedTopicsLocal, setSelectedTopicsLocal] = useState([]);
  const router = useRouter();

  const [selectedDisplaySubject, setSelectedDisplaySubject] = useState("All");
  
  const { createAdaptiveQuiz, setSelectedTopics } = useContext(QuestionContext);

  const [displayErrorInModal, setDisplayErrorInModal] = useState(false);

  const handlePracticeClick = async (onClose, topics) => {
    onClose();
    setSelectedTopics(["Linear equations in 1 variable"]);
    // setSelectedAnswerStatuses(["unattempted"]);
    // setSelectedDifficulties(["easy"]);
    try {
      const response = await createAdaptiveQuiz({
          allowedDifficulties: selectedDifficultiesLocal, 
          topics: selectedTopicsLocal,
          // numQuestions: 10,
          
        });

      console.log("response", response)
      
      if (response !== null) {
        router.push(`/study/activequiz?quizid=${response}&review=false&mode=adaptive`);
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


  const renderTopics = (category) => {
    const topics = getTopicsByCategory(category);
    return topics.map( (topic, index) => {
            var progressValue = 0
      console.log("topic", topic)
      try{
        var topicSummaryElement =  getTopicSummaryElement(topic);
        var progressValue = (topicSummaryElement.usage) * 100;
      }catch(e){
        console.log(e)
      }

      return (
        <div key={index} className="flex flex-row justify-between items-center w-full">
          <div style={{ fontSize: "14px", color: "#333333" }} className="px-2">
            {topic}
          </div>

          <div className="flex flex-row items-center gap-5">
            <Tooltip content={`${Math.round(progressValue)}% completed`}>
              <Progress value={progressValue} color="default" className="w-60" size="md" />
            </Tooltip>
            <Chip color="success" size="sm" className="text-white">
              Advanced
            </Chip>
            <Button isIconOnly size="sm" onPress={() => handleTopicClick(topic)}>
              <Icon icon="line-md:arrow-right" width="24" height="24" style={{ color: "#0B2149" }} />
            </Button>
          </div>
        </div>
      );
    });
  };

  const mathModules = (
    <>
      <div className="w-full p-0 border border-gray-300 shadow-md rounded-lg px-2 py-2 flex items-center">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <div style={{ fontSize: "15px", color: "#333333", fontWeight: "bold" }} className="px-2">
              Algebra
            </div>
          </div>
          <Divider />
          {renderTopics("Algebra")}
        </div>
      </div>
  
      <div className="w-full p-0 border border-gray-300 shadow-md rounded-lg px-2 py-2 flex items-center">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <div style={{ fontSize: "15px", color: "#333333", fontWeight: "bold" }} className="px-2">
              Advanced Math
            </div>
          </div>
          <Divider />
          {renderTopics("Advanced math")}
        </div>
      </div>
  
      <div className="w-full p-0 border border-gray-300 shadow-md rounded-lg px-2 py-2 flex items-center">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <div style={{ fontSize: "15px", color: "#333333", fontWeight: "bold" }} className="px-2">
              Problem Solving & Data Analysis
            </div>
          </div>
          <Divider />
          {renderTopics("Problem solving and data analysis")}
        </div>
      </div>
  
      <div className="w-full p-0 border border-gray-300 shadow-md rounded-lg px-2 py-2 flex items-center">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <div style={{ fontSize: "15px", color: "#333333", fontWeight: "bold" }} className="px-2">
              Geometry & Trigonometry
            </div>
          </div>
          <Divider />
          {renderTopics("Geometry and trigonometry")}
        </div>
      </div>
    </>
  );

  const rwModules = (
    <>
      <div className="w-full p-0 border border-gray-300 shadow-md rounded-lg px-2 py-2 flex items-center">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <div style={{ fontSize: "15px", color: "#333333", fontWeight: "bold" }} className="px-2">
              Rhetorical and Structural Analysis
            </div>
          </div>
          <Divider />
          {renderTopics("Rhetorical and structural analysis")}
        </div>
      </div>
  
      <div className="w-full p-0 border border-gray-300 shadow-md rounded-lg px-2 py-2 flex items-center">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <div style={{ fontSize: "15px", color: "#333333", fontWeight: "bold" }} className="px-2">
              Interpreting Information and Ideas
            </div>
          </div>
          <Divider />
          {renderTopics("Interpreting information and ideas")}
        </div>
      </div>
  
      <div className="w-full p-0 border border-gray-300 shadow-md rounded-lg px-2 py-2 flex items-center">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <div style={{ fontSize: "15px", color: "#333333", fontWeight: "bold" }} className="px-2">
              Standard English Conventions
            </div>
          </div>
          <Divider />
          {renderTopics("Standard English conventions")}
        </div>
      </div>
  
      <div className="w-full p-0 border border-gray-300 shadow-md rounded-lg px-2 py-2 flex items-center">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <div style={{ fontSize: "15px", color: "#333333", fontWeight: "bold" }} className="px-2">
              Effective Expression and Revision
            </div>
          </div>
          <Divider />
          {renderTopics("Effective expression and revision")}
        </div>
      </div>
    </>
  );
  

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div>
        <Tabs color="default" aria-label="Tabs colors" radius="full" selectedKey = {selectedDisplaySubject} onSelectionChange={setSelectedDisplaySubject}>
          <Tab key="All" title="All" />
          
          <Tab key="Math" title="Math" />
          <Tab key="Reading & Writing" title="Reading & Writing" />
        </Tabs>
      </div>

      <div className="flex flex-col w-full px-20 gap-3">
        {selectedDisplaySubject === "All" || selectedDisplaySubject === "Math" ? mathModules : null}
        {selectedDisplaySubject === "All" || selectedDisplaySubject === "Reading & Writing" ? rwModules : null}
       
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

                <Slider
                  size="md"
                  step={5}
                  label="Number of questions"
                  showSteps={true}
                  maxValue={20}
                  minValue={5}
                  defaultValue={10}
                  className="max-w-md"
                  style={{ fontSize: "18px", color: "#95959B" }}
                />

                {displayErrorInModal &&
                  <div className="text-red-500 text-sm">
                    Error creating adaptive quiz.
                  </div>}
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
