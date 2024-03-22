// "use client"
// import React, { useState } from "react";

// import { topicsData } from "../data/data";
// import styles from "./browsequestions.module.css"

// export default function BrowseQuestions() {

//     const [activeTopics, setActiveTopics] = useState([]);

//     const handleTopicClick = (topic) => {
//         if (activeTopics.includes(topic)) {
//             setActiveTopics(activeTopics.filter((activeTopic) => activeTopic !== topic));
//         } else {
//             setActiveTopics([...activeTopics, topic]);
//         }
//     }

//     return (
//         <div className={styles.menu}>
//             {topicsData.map((topic) => (
//                 <div key={topic.name} >
//                     <div className={styles.topicName}> {topic.name} </div>
//                     <div className={styles.subtopicContainer}>
//                         {topic.children.map((child) => (
//                             <div key={child.name} onClick={() => handleTopicClick(child.name)}>
//                                 <div
//                                     htmlFor={child.name}
//                                     className={`${styles.subtopicMenu} ${activeTopics.includes(child.name) ? styles.active : ''}`}
//                                 >


//                                     {child.name} </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }