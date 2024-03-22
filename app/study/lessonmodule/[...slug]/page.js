"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Update import
import { ContentViewer } from '../../components/contentviewer/contentviewer';
import { fetchLessonData, updateLessonObjectList } from '../../data/objectlist';


export default function Page() {

    const pathname = usePathname(); // Update variable name
    const router = useRouter(); // Update variable name
    const [groupId, activeIndex] = pathname.split('/').slice(-2).map(part => decodeURI(part));

    const [videoIDList, setVideoIDList] = useState([]);
    const [objectList, setObjectList] = useState(null);
    const [numTotal, setNumTotal] = useState(0);
    const [numCompleted, setNumCompleted] = useState(0);
    const [percentCompleted, setPercentCompleted] = useState(0);

    const handleClose = () => {
        router.push(`/study/lessonmodule/`);
    }

    useEffect(() => {
        fetchLessonData(groupId, setVideoIDList, setNumTotal, setNumCompleted, setPercentCompleted, setObjectList);
    }, []);

    const refreshObjectList = () => {
        updateLessonObjectList(videoIDList, setNumTotal, setNumCompleted, setPercentCompleted, setObjectList);
    };

    return (
        <>{objectList && (<ContentViewer
            groupName={groupId}
            mode={"lessons"}
            activeIndex={parseInt(activeIndex)}
            handleClose={handleClose}

            objectList={objectList}
            numTotal={numTotal}
            numCompleted={numCompleted}
            percentCompleted={percentCompleted}
            refreshObjectList={refreshObjectList}
        />)}
        </>
    );

}
