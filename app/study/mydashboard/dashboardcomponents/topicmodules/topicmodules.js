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
  Tab
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { CheckIconGreen } from "@/app/helper/assets/components/CheckIconGreen";
import { useData } from "@/app/helper/context/datacontext";
import { useRouter } from 'next/navigation';
import { QuestionContext } from "@/app/helper/context/questioncontext";
import { Spinner, Accordion, AccordionItem } from "@nextui-org/react";

const TopicModules = () => {
  const {
    selectedAnswerStatuses,
    setSelectedAnswerStatuses,
    selectedTopics,
    setSelectedTopics,
  } = useContext(QuestionContext);

  const [topicsPage, setTopicsPage] = useState(0);
  const [subject, setSubject] = useState("All");

  const [topics, setTopics] = useState(['Algebra', 'Advanced math', 'Problem solving and data analysis', 'Geometry and trigonometry', 'Information and ideas', 'Craft and structure', 'Standard English conventions']);
  const { topicMapping, topicSummaryList, getTopicsByCategory, filterTopicSummaryListByCategory, filterTopicSummaryListBySubject, filterTopicSummaryListBySubjectAll } = useData();
  const [selected, setSelected] = useState("Algebra");

  // Fallback to an empty array if topicSummaryList is undefined, null, or not an array
  const [displayTopicSummaryList, setDisplayTopicSummaryList] = useState(Array.isArray(topicSummaryList) ? topicSummaryList : []);

  useEffect(() => {
    if (Array.isArray(topicSummaryList) && subject === "All") {
      setDisplayTopicSummaryList(filterTopicSummaryListBySubjectAll());
    } else if (Array.isArray(topicSummaryList)) {
      setDisplayTopicSummaryList(filterTopicSummaryListBySubject(subject));
    }

    if(subject === "All") {
      setTopics(['Algebra', 'Advanced math', 'Problem solving and data analysis', 'Geometry and trigonometry', 'Information and ideas', 'Craft and structure', 'Standard English conventions']);
    } else if(subject === "Math") {
      setTopics(['Algebra', 'Advanced math', 'Problem solving and data analysis', 'Geometry and trigonometry']);
    } else if(subject === "Reading & Writing") {
      setTopics(['Information and ideas', 'Craft and structure', 'Standard English conventions']);
    }
  }, [topicSummaryList, subject]);

  const achievementTypeMapping = {
    "num answered": { icon: "ri:book-fill", earnedColor: "primary" },
    "num correct": { icon: "clarity:bullseye-solid", earnedColor: "success" },
    "num hard correct": { icon: "maki:mountain", earnedColor: "warning" },
    "num correct under 60": { icon: "mdi:clock", earnedColor: "secondary" },
    default: { icon: "ri:book-fill", earnedColor: "default" }
  };

  const router = useRouter();

  const handlePracticeClick = (topic) => {
    setSelectedTopics([topic]);
    setSelectedAnswerStatuses(["unattempted"]);
    router.push('/study/browse');
  };

  const handleReviewClick = (topic) => {
    setSelectedTopics([topic]);
    setSelectedAnswerStatuses(["incorrect"]);
    router.push('/study/browse');
  };

  const increasePage = () => {
    if(topicsPage < (displayTopicSummaryList.length / 10) - 1) {
      setTopicsPage(topicsPage + 1);
    }
  }

  const decreasePage = () => {
    if(topicsPage > 0) {
      setTopicsPage(topicsPage - 1);
    }
  }

  if(!Array.isArray(topicSummaryList) || topicSummaryList.length === 0){
    return <div className='w-full h-[200px] flex flex-row justify-center items-center'>
        <Spinner />
        <div className='ml-[20px]'>Loading...</div>
    </div>;
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-[95%] flex flex-row justify-around items-center font-semibold rounded-[10px] text-[14px]">
          <div
              className={`cursor-pointer h-[30px] w-[20%] flex justify-center items-center ${subject === 'All' ? 'border-b-[2px] border-themeLightGreen text-themeLightGreen' : 'text-themeDarkGray'}`}
              onClick={() => setSubject("All")}
          >
              All
          </div>
          <div
              className={`cursor-pointer h-[30px] w-[20%] flex justify-center items-center ${subject === 'Math' ? 'border-b-[2px] border-themeLightGreen text-themeLightGreen' : 'text-themeDarkGray'}`}
              onClick={() => setSubject("Math")}
          >
              Math
          </div>
          <div
              className={`cursor-pointer h-[30px] w-[20%] flex justify-center items-center ${subject === 'Reading & Writing' ? 'border-b-[2px] border-themeLightGreen text-themeLightGreen' : 'text-themeDarkGray'}`}
              onClick={() => setSubject("Reading & Writing")}
          >
              Reading & Writing
          </div>
          {/* <div
              className={`cursor-pointer text-[13px] h-[30px] w-[20%] flex justify-center items-center ${topic === 'Problem solving and data analysis' ? 'border-b-[2px] border-themeLightGreen text-themeLightGreen' : 'text-themeDarkGray'}`}
              onClick={() => setTopic("Problem solving and data analysis")}
          >
              Problem Solving and Data Analysis
          </div>
          <div
              className={`cursor-pointer text-[13px] h-[30px] w-[20%] flex justify-center items-center ${topic === 'Geometry and trigonometry' ? 'border-b-[2px] border-themeLightGreen text-themeLightGreen' : 'text-themeDarkGray'}`}
              onClick={() => setTopic("Geometry and trigonometry")}
          >
              Geometry and Trigonometry
          </div> */}
      </div>
      <div className="w-full flex flex-row justify-between items-end text-themeDarkGray">
        <div className="w-[500px] h-[50px] flex flex-row justify-around items-center text-[12px]">
          <div className="flex flex-row">
            Advanced
            <div className="w-[12px] h-[12px] ml-[5px] mr-[10px]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0Z" fill="#1283FF"/>
                <path d="M16.9847 8.1763C16.9847 8.18318 16.9847 8.18943 16.9803 8.1963L15.5628 14.6882C15.5191 14.9168 15.3971 15.123 15.2178 15.2713C15.0385 15.4196 14.813 15.5007 14.5803 15.5007H5.41965C5.18704 15.5006 4.96173 15.4194 4.78252 15.2711C4.6033 15.1228 4.48139 14.9167 4.43778 14.6882L3.02028 8.1963C3.02028 8.18943 3.01715 8.18318 3.0159 8.1763C2.97711 7.96136 3.00975 7.73964 3.10884 7.545C3.20792 7.35036 3.36801 7.19351 3.56464 7.09842C3.76126 7.00333 3.98361 6.97523 4.19771 7.01841C4.41181 7.06159 4.60588 7.17368 4.75028 7.33755L6.85465 9.60568L9.09215 4.58755C9.09226 4.58547 9.09226 4.58338 9.09215 4.5813C9.17216 4.40777 9.30022 4.26079 9.46116 4.15777C9.6221 4.05475 9.80919 4 10.0003 4C10.1914 4 10.3785 4.05475 10.5394 4.15777C10.7003 4.26079 10.8284 4.40777 10.9084 4.5813C10.9083 4.58338 10.9083 4.58547 10.9084 4.58755L13.1459 9.60568L15.2503 7.33755C15.395 7.1749 15.5888 7.06391 15.8023 7.02143C16.0158 6.97896 16.2374 7.00731 16.4333 7.1022C16.6292 7.19709 16.7888 7.35333 16.8879 7.54718C16.987 7.74104 17.0201 7.96193 16.9822 8.1763H16.9847Z" fill="white"/>
              </svg>
            </div>
          </div>
          <div className="flex flex-row">
            Intermediate
            <div className="w-[12px] h-[12px] ml-[5px] mr-[10px]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0Z" fill="#A18FDB"/>
              </svg>
            </div>
          </div>
          <div className="flex flex-row">
            Beginner
            <div className="w-[12px] h-[12px] ml-[5px] mr-[10px]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5C0 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0H15C16.3261 0 17.5979 0.526784 18.5355 1.46447C19.4732 2.40215 20 3.67392 20 5V15C20 16.3261 19.4732 17.5979 18.5355 18.5355C17.5979 19.4732 16.3261 20 15 20H5C3.67392 20 2.40215 19.4732 1.46447 18.5355C0.526784 17.5979 0 16.3261 0 15V5ZM5 2.5C4.33696 2.5 3.70107 2.76339 3.23223 3.23223C2.76339 3.70107 2.5 4.33696 2.5 5V15C2.5 15.663 2.76339 16.2989 3.23223 16.7678C3.70107 17.2366 4.33696 17.5 5 17.5H15C15.663 17.5 16.2989 17.2366 16.7678 16.7678C17.2366 16.2989 17.5 15.663 17.5 15V5C17.5 4.33696 17.2366 3.70107 16.7678 3.23223C16.2989 2.76339 15.663 2.5 15 2.5H5Z" fill="#A18FDB"/>
              </svg>
            </div>
          </div>
          <div className="flex flex-row">
            Not Started
            <div className="w-[12px] h-[12px] ml-[5px] mr-[10px]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5C0 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0H15C16.3261 0 17.5979 0.526784 18.5355 1.46447C19.4732 2.40215 20 3.67392 20 5V15C20 16.3261 19.4732 17.5979 18.5355 18.5355C17.5979 19.4732 16.3261 20 15 20H5C3.67392 20 2.40215 19.4732 1.46447 18.5355C0.526784 17.5979 0 16.3261 0 15V5ZM5 2.5C4.33696 2.5 3.70107 2.76339 3.23223 3.23223C2.76339 3.70107 2.5 4.33696 2.5 5V15C2.5 15.663 2.76339 16.2989 3.23223 16.7678C3.70107 17.2366 4.33696 17.5 5 17.5H15C15.663 17.5 16.2989 17.2366 16.7678 16.7678C17.2366 16.2989 17.5 15.663 17.5 15V5C17.5 4.33696 17.2366 3.70107 16.7678 3.23223C16.2989 2.76339 15.663 2.5 15 2.5H5Z" fill="#AAAAAA"/>
              </svg>
            </div>
          </div>
        </div>
        {/* <div className="h-[30px] bg-themeLightGray w-[175px] rounded pl-[5px] pb-[5px] pt-[5px] flex flex-col justify-between items-center">
          <div className="text-[12px] flex flex-row items-center">Practice:
            <div className="w-[12px] h-[12px] ml-[5px] mr-[10px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854zM15 5l3 3"></path>
              </svg>
            </div>
            Review:
            <div className="w-[12px] h-[12px] ml-[5px] mr-[10px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                <path fill="currentColor" d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 0 0 324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32M324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3l6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39m563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5l48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5m223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5M396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5m416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5"></path>
              </svg>
            </div>
          </div>
        </div> */}
      </div>
      {/* <Table removeWrapper isCompact = {true}>
        <TableHeader>
          <TableColumn width="500">Topic</TableColumn>
          <TableColumn>Mastery</TableColumn>
          <TableColumn># Questions answered</TableColumn>
          <TableColumn>% Correct</TableColumn>
          {/* <TableColumn>Achievements</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {displayTopicSummaryList.slice((10*topicsPage), (10 * (1 + topicsPage))).map((item, index) => (
            // <TableRow key={index} >
            //   <TableCell>
            //     <div className="flex flex-col">
            //       <p className="text-bold text-[12px] capitalize">{item.topic}</p>
            //       <p className="text-bold text-[10px] capitalize text-default-400">{item.category}</p>
            //     </div>
            //   </TableCell>
            //   <TableCell className="flex justify-center">
            //     <div className="w-[30px] h-[30px] mt-[15px]">
            //       {item.mastery_level === "Advanced" ? 
            //         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            //           <path d="M17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0Z" fill="#1283FF"/>
            //           <path d="M16.9847 8.1763C16.9847 8.18318 16.9847 8.18943 16.9803 8.1963L15.5628 14.6882C15.5191 14.9168 15.3971 15.123 15.2178 15.2713C15.0385 15.4196 14.813 15.5007 14.5803 15.5007H5.41965C5.18704 15.5006 4.96173 15.4194 4.78252 15.2711C4.6033 15.1228 4.48139 14.9167 4.43778 14.6882L3.02028 8.1963C3.02028 8.18943 3.01715 8.18318 3.0159 8.1763C2.97711 7.96136 3.00975 7.73964 3.10884 7.545C3.20792 7.35036 3.36801 7.19351 3.56464 7.09842C3.76126 7.00333 3.98361 6.97523 4.19771 7.01841C4.41181 7.06159 4.60588 7.17368 4.75028 7.33755L6.85465 9.60568L9.09215 4.58755C9.09226 4.58547 9.09226 4.58338 9.09215 4.5813C9.17216 4.40777 9.30022 4.26079 9.46116 4.15777C9.6221 4.05475 9.80919 4 10.0003 4C10.1914 4 10.3785 4.05475 10.5394 4.15777C10.7003 4.26079 10.8284 4.40777 10.9084 4.5813C10.9083 4.58338 10.9083 4.58547 10.9084 4.58755L13.1459 9.60568L15.2503 7.33755C15.395 7.1749 15.5888 7.06391 15.8023 7.02143C16.0158 6.97896 16.2374 7.00731 16.4333 7.1022C16.6292 7.19709 16.7888 7.35333 16.8879 7.54718C16.987 7.74104 17.0201 7.96193 16.9822 8.1763H16.9847Z" fill="white"/>
            //         </svg> :
            //         ( item.num_answered === 0 ? 
            //           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            //             <path d="M0 5C0 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0H15C16.3261 0 17.5979 0.526784 18.5355 1.46447C19.4732 2.40215 20 3.67392 20 5V15C20 16.3261 19.4732 17.5979 18.5355 18.5355C17.5979 19.4732 16.3261 20 15 20H5C3.67392 20 2.40215 19.4732 1.46447 18.5355C0.526784 17.5979 0 16.3261 0 15V5ZM5 2.5C4.33696 2.5 3.70107 2.76339 3.23223 3.23223C2.76339 3.70107 2.5 4.33696 2.5 5V15C2.5 15.663 2.76339 16.2989 3.23223 16.7678C3.70107 17.2366 4.33696 17.5 5 17.5H15C15.663 17.5 16.2989 17.2366 16.7678 16.7678C17.2366 16.2989 17.5 15.663 17.5 15V5C17.5 4.33696 17.2366 3.70107 16.7678 3.23223C16.2989 2.76339 15.663 2.5 15 2.5H5Z" fill="#AAAAAA"/>
            //           </svg> :
            //         ( item.mastery_level === "Beginner" ?
            //           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            //             <path d="M0 5C0 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0H15C16.3261 0 17.5979 0.526784 18.5355 1.46447C19.4732 2.40215 20 3.67392 20 5V15C20 16.3261 19.4732 17.5979 18.5355 18.5355C17.5979 19.4732 16.3261 20 15 20H5C3.67392 20 2.40215 19.4732 1.46447 18.5355C0.526784 17.5979 0 16.3261 0 15V5ZM5 2.5C4.33696 2.5 3.70107 2.76339 3.23223 3.23223C2.76339 3.70107 2.5 4.33696 2.5 5V15C2.5 15.663 2.76339 16.2989 3.23223 16.7678C3.70107 17.2366 4.33696 17.5 5 17.5H15C15.663 17.5 16.2989 17.2366 16.7678 16.7678C17.2366 16.2989 17.5 15.663 17.5 15V5C17.5 4.33696 17.2366 3.70107 16.7678 3.23223C16.2989 2.76339 15.663 2.5 15 2.5H5Z" fill="#A18FDB"/>
            //           </svg> :
            //           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            //             <path d="M17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0Z" fill="#A18FDB"/>
            //           </svg>
            //         ) )
            //       }
            //     </div>
            //   </TableCell>


            //   <TableCell width="500">
            //     <Progress
            //       value={100 * (item.num_answered || 0) / (item.num_total || 1)}
            //       size="md"
            //       showValueLabel={false}
            //     />
            //   </TableCell>

            //   <TableCell width="500">
            //     <Progress
            //       value={100 * (item.num_correct || 0) / (item.num_answered || 1)}
            //       size="md"
            //       color="danger"
            //       showValueLabel={false}
            //     />
            //   </TableCell>

            //   {/* <TableCell>
            //     <div className="flex flex-row gap-2">
            //       {Array.isArray(item.achievements) && item.achievements.map((achievement, index) => {
            //         // Retrieve the icon and button color based on the achievement type
            //         const { icon, earnedColor } = achievementTypeMapping[achievement.type] || achievementTypeMapping.default;

            //         // Determine the button color based on the earned status
            //         const buttonColor = achievement.earned ? earnedColor : "default";

            //         // Render Tooltip and Button
            //         const tooltipAndButton = (
            //           <Tooltip key={index} content={achievement.description}>
            //             <Button color={buttonColor} isIconOnly>
            //               <Icon icon={icon} width="30" height="30" />
            //             </Button>
            //           </Tooltip>
            //         );

            //         // Wrap with Badge if earned, otherwise just return the Tooltip and Button
            //         return achievement.earned ? (
            //           <Badge
            //             key={index}
            //             color={buttonColor}
            //             isOneChar
            //             content={<CheckIconGreen />} // Assuming CheckIconGreen is a valid component
            //           >
            //             {tooltipAndButton}
            //           </Badge>
            //         ) : (
            //           tooltipAndButton
            //         );
            //       })}
            //     </div>
            //   </TableCell>
            //   <TableCell>
            //     <div className="flex space-x-2 justify-end">
            //       {(item.num_total || 0) - (item.num_answered || 0) == 0 ?
            //         <div className="w-[25px] h-[25px] pt-[10px] pr-[5px] cursor-pointer" onClick={() => handlePracticeClick(item.topic)}>
            //           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            //             <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854zM15 5l3 3"></path>
            //           </svg>
            //         </div>
            //       :
            //         <Tooltip content={`You have ${(item.num_total || 0) - (item.num_answered || 0)} unanswered questions on ${item.topic}`}>
            //           <Badge className="w-[20px] h-[20px] text-[10px]" color="danger" content={Math.max(0, (item.num_total || 0) - (item.num_answered || 0))}>
            //             <div className="w-[25px] h-[25px] pt-[10px] pr-[5px] cursor-pointer" onClick={() => handlePracticeClick(item.topic)}>
            //               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            //                 <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854zM15 5l3 3"></path>
            //               </svg>
            //             </div>
            //           </Badge>
            //         </Tooltip>
            //       }
            //       {Math.max(0, (item.num_answered || 0) - (item.num_reviewed || 0)) == 0 ?
            //         <div className="w-[25px] h-[25px] pt-[10px] pr-[5px] cursor-pointer" onClick={() => handleReviewClick(item.topic)}>
            //           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            //             <path fill="currentColor" d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 0 0 324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32M324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3l6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39m563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5l48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5m223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5M396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5m416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5"></path>
            //           </svg>
            //         </div>
            //       :
            //         <Tooltip content={`You have 5 questions to review on ${item.topic}`}>
            //           <Badge className="w-[20px] h-[20px] text-[10px]" color="danger" content={Math.max(0, (item.num_answered || 0) - (item.num_reviewed || 0))}>
            //             <div className="w-[25px] h-[25px] pt-[10px] pr-[5px] cursor-pointer" onClick={() => handleReviewClick(item.topic)}>
            //               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            //                 <path fill="currentColor" d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 0 0 324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32M324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3l6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39m563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5l48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5m223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5M396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5m416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5"></path>
            //               </svg>
            //             </div>
            //           </Badge>
            //         </Tooltip>
            //       }
            //     </div>
            //   </TableCell>
            // </TableRow>
      //     ))}
      //   </TableBody>
      // </Table> */}
      <Accordion variant="splitted">
        {topics.map((item, index) => (
          <AccordionItem key={index} title={item}>
            {filterTopicSummaryListByCategory(item).map((topic, index) => (
              <div className="mt-[5px] mb-[5px] py-[5px] px-[10px] hover:bg-[#F8F7F7] flex flex-row justify-between cursor-pointer rounded-[5px]">
                <div>{topic.topic}</div>
                <div className="flex flex-row justify-center items-center">
                  {topic.mastery_level === "Advanced" ? 
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0Z" fill="#1283FF"/>
                      <path d="M16.9847 8.1763C16.9847 8.18318 16.9847 8.18943 16.9803 8.1963L15.5628 14.6882C15.5191 14.9168 15.3971 15.123 15.2178 15.2713C15.0385 15.4196 14.813 15.5007 14.5803 15.5007H5.41965C5.18704 15.5006 4.96173 15.4194 4.78252 15.2711C4.6033 15.1228 4.48139 14.9167 4.43778 14.6882L3.02028 8.1963C3.02028 8.18943 3.01715 8.18318 3.0159 8.1763C2.97711 7.96136 3.00975 7.73964 3.10884 7.545C3.20792 7.35036 3.36801 7.19351 3.56464 7.09842C3.76126 7.00333 3.98361 6.97523 4.19771 7.01841C4.41181 7.06159 4.60588 7.17368 4.75028 7.33755L6.85465 9.60568L9.09215 4.58755C9.09226 4.58547 9.09226 4.58338 9.09215 4.5813C9.17216 4.40777 9.30022 4.26079 9.46116 4.15777C9.6221 4.05475 9.80919 4 10.0003 4C10.1914 4 10.3785 4.05475 10.5394 4.15777C10.7003 4.26079 10.8284 4.40777 10.9084 4.5813C10.9083 4.58338 10.9083 4.58547 10.9084 4.58755L13.1459 9.60568L15.2503 7.33755C15.395 7.1749 15.5888 7.06391 15.8023 7.02143C16.0158 6.97896 16.2374 7.00731 16.4333 7.1022C16.6292 7.19709 16.7888 7.35333 16.8879 7.54718C16.987 7.74104 17.0201 7.96193 16.9822 8.1763H16.9847Z" fill="white"/>
                    </svg> :
                    ( topic.num_answered === 0 ? 
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 5C0 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0H15C16.3261 0 17.5979 0.526784 18.5355 1.46447C19.4732 2.40215 20 3.67392 20 5V15C20 16.3261 19.4732 17.5979 18.5355 18.5355C17.5979 19.4732 16.3261 20 15 20H5C3.67392 20 2.40215 19.4732 1.46447 18.5355C0.526784 17.5979 0 16.3261 0 15V5ZM5 2.5C4.33696 2.5 3.70107 2.76339 3.23223 3.23223C2.76339 3.70107 2.5 4.33696 2.5 5V15C2.5 15.663 2.76339 16.2989 3.23223 16.7678C3.70107 17.2366 4.33696 17.5 5 17.5H15C15.663 17.5 16.2989 17.2366 16.7678 16.7678C17.2366 16.2989 17.5 15.663 17.5 15V5C17.5 4.33696 17.2366 3.70107 16.7678 3.23223C16.2989 2.76339 15.663 2.5 15 2.5H5Z" fill="#AAAAAA"/>
                      </svg> :
                    ( topic.mastery_level === "Beginner" ?
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 5C0 3.67392 0.526784 2.40215 1.46447 1.46447C2.40215 0.526784 3.67392 0 5 0H15C16.3261 0 17.5979 0.526784 18.5355 1.46447C19.4732 2.40215 20 3.67392 20 5V15C20 16.3261 19.4732 17.5979 18.5355 18.5355C17.5979 19.4732 16.3261 20 15 20H5C3.67392 20 2.40215 19.4732 1.46447 18.5355C0.526784 17.5979 0 16.3261 0 15V5ZM5 2.5C4.33696 2.5 3.70107 2.76339 3.23223 3.23223C2.76339 3.70107 2.5 4.33696 2.5 5V15C2.5 15.663 2.76339 16.2989 3.23223 16.7678C3.70107 17.2366 4.33696 17.5 5 17.5H15C15.663 17.5 16.2989 17.2366 16.7678 16.7678C17.2366 16.2989 17.5 15.663 17.5 15V5C17.5 4.33696 17.2366 3.70107 16.7678 3.23223C16.2989 2.76339 15.663 2.5 15 2.5H5Z" fill="#A18FDB"/>
                      </svg> :
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0Z" fill="#A18FDB"/>
                      </svg>
                    ) )
                  }
                </div>
              </div>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
      {/* <div className="w-full flex flex-col justify-center items-center">
        <div>
          <div className="w-full flex flex-row">
            <div>
              <Button onClick={() => increasePage} className='bg-transparent w-[10px]'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      <g fill="none" fillRule="evenodd">
                          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                          <path fill="currentColor" d="M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414z"></path>
                      </g>
                  </svg>
              </Button>
            </div>
            <div>
              <Button onClick={() => decreasePage} className='bg-transparent'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      <g fill="none" fillRule="evenodd">
                          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                          <path fill="currentColor" d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z"></path>
                      </g>
                  </svg>
              </Button>
            </div>
          </div>
        </div> */}
        {/* <div>
          {topicsPage + 1} / {Math.floor((displayTopicSummaryList.length / 10) + 1)}
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default TopicModules;
