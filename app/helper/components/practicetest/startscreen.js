import React, {useContext} from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { QuestionContext } from "../../context/questioncontext";
import { TestContext } from "@/app/study/activetest/activetestcontext";

export const StartScreen = () => {
    const {
        handleNextTestStage,
    } = useContext(TestContext);

    const {
        createQuiz,
    } = useContext(QuestionContext);

    const router = useRouter();
    const startTest = () => {
        createQuiz({ count: 27 });
        handleNextTestStage();
    }
    return (
        <div className = "w-full h-full bg-[rgb(182,182,182)]">
            <div className = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex w-[558px] p-4 gap-5 flex-col justify-between items-center rounded-lg border border-white bg-white shadow-md">
                <div style={{ color: "#716E6E", fontSize: "25px", fontWeight: "600" }}> Practice Test</div>
                <div className="w-[100%] justify-center text-center">
                    <strong>Time:</strong>
                    <div>134 minutes</div>
                    <strong>Number of Questions:</strong>
                    <div>54 Reading and Writing, 44 Math</div>
                    <strong>Sections:</strong>
                    <div>4</div>
                </div>
                <Button onClick={startTest} className="bg-appleBlue text-white rounded-[20px]">Start Test</Button>
            </div>
        </div>
    );
}