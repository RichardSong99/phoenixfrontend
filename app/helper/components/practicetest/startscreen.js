import React, { useContext } from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { QuestionContext } from "../../context/questioncontext";
import { TestContext } from "@/app/study/activetest/activetestcontext";

export const StartScreen = ({ testID }) => {
    const {
        handleNextTestStage,
        initializeModuleIDs,
    } = useContext(TestContext);

    const {
        createQuiz,
    } = useContext(QuestionContext);

    const router = useRouter();
    const startTest = async () => {
        await initializeModuleIDs(testID);
        handleNextTestStage();
    }
    return (
        <div className="w-full h-full bg-gray-200 flex justify-center items-center">
            <div className="flex flex-col w-[90%] max-w-[600px] p-8 gap-6 items-center justify-between rounded-2xl bg-white shadow-lg">
                <h1 className="text-gray-700 text-2xl font-semibold">Practice Test</h1>

                <div className="w-full text-center text-gray-600">
                    <p className="text-lg"><strong>Time:</strong> 134 minutes</p>
                    <p className="text-lg"><strong>Number of Questions:</strong> 54 Reading and Writing, 44 Math</p>
                    <p className="text-lg"><strong>Sections:</strong> 4</p>
                </div>

                <button
                    onClick={startTest}
                    className="w-full max-w-[250px] py-3 mt-4 text-lg font-medium bg-appleBlue text-white rounded-full transition-transform transform hover:scale-105"
                >
                    Start Test
                </button>
            </div>
        </div>

    );
}