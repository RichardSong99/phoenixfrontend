import { fetchVideosById } from "@/app/helper/apiservices/videoservice";
import { fetchQuestionsById } from "@/app/helper/apiservices/questionservice";
import { fetchLessonModule } from "@/app/helper/apiservices/parameterdataservice";
import { fetchQuizUnderlyingById } from "@/app/helper/apiservices/quizservice";

export function createProcessedObjectList({
    type,
    rawObjectList
}) {
    let processedObjectList = rawObjectList.map((object, index) => {
        if (type === "lessons") {
            return {
                type: "video",
                videoData: object,
                title: object.Title
            };
        } else if (type === "practiceQuestions") {
            return {
                type: "question",
                questionData: object,
                title: `Question ${index + 1}`
            };
        }
    });

    return processedObjectList;
}

// lessons ============================================================================================================

export const fetchLessonData = async (groupId, setVideoIDList, setNumTotal, setNumCompleted, setPercentCompleted, setObjectList) => {
    try {
        const response = await fetchLessonModule({ name: groupId });
        setVideoIDList(response.VideoIDs);
        console.log("response.videoIDList", response.VideoIDs);
        await updateLessonObjectList(response.VideoIDs, setNumTotal, setNumCompleted, setPercentCompleted, setObjectList);
    } catch (error) {
        console.log(error);
    }
};

export const updateLessonObjectList = async (videoIDList, setNumTotal, setNumCompleted, setPercentCompleted, setObjectList) => {
    try {
        const videoResponse = await fetchVideosById({ videoIDList });
        console.log("videoResponse", videoResponse);
        setNumTotal(videoResponse.numTotal);
        setNumCompleted(videoResponse.numWatched);
        setPercentCompleted(videoResponse.percentWatched);
        setObjectList(createProcessedObjectList({ type: "lessons", rawObjectList: videoResponse.videos }));
    } catch (error) {
        console.log(error);
    }
};

// quizzes ============================================================================================================

export const fetchQuizData = async (quizID, setNumTotal, setNumCompleted, setNumCorrect, setNumIncorrect, setNumOmitted, setNumUnattempted, setPercentCompleted, setPercentCorrect, setObjectList) => {
    try {
        const response = await fetchQuizUnderlyingById({ quizID: quizID });
        setNumTotal(response.NumTotal);
        setNumCompleted(response.NumAnswered);
        setNumCorrect(response.NumCorrect);
        setNumIncorrect(response.NumIncorrect);
        setNumOmitted(response.NumOmitted);
        setNumUnattempted(response.NumUnattempted);
        setPercentCompleted(response.PercentAnswered);
        setPercentCorrect(response.PercentCorrect);

        console.log("response of fetchQuizData", response);

        setObjectList(createProcessedObjectList({ type: "practiceQuestions", rawObjectList: response.Questions }));
    } catch (error) {
        console.error("Error:", error);
    }
}