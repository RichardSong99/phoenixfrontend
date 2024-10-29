import React, { useState, useContext, useEffect } from "react";
import { QuestionModal } from "@/app/helper/components/question/questionviewcomponents/questionmodal";
import { QBankFormModal } from "@/app/helper/components/qbank/qbankform/qbankformmodal";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Chip,
} from "@nextui-org/react";
import { QuestionContext } from "@/app/helper/context/questioncontext";
import renderMarkdownWithLaTeX from "../../latexrender/markdownwlatex";
import { formatDate } from "@/app/helper/data/utility";
import { useUser } from "@/app/helper/context/usercontext";
import { Icon } from "@iconify/react";
import { updateEngagement } from "@/app/helper/apiservices/engagementservice";
import { getUserData } from '@/app/helper/apiservices/userservice';
import { Spinner } from "@nextui-org/react";

const NewQBankTable = ({ questionEngagementCombos: initialCombos }) => {
    const { isAuthenticated } = useUser();
    const [questionEngagementCombos, setQuestionEngagementCombos] = useState(initialCombos);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const {
        viewQuestionModal,
        isOpen,
        onOpenChange,
        isFormOpen,
        onFormOpenChange,
        editQuestion,
        MODEEDIT,
        handleEditQuestion,
        handleDeleteQuestion,
    } = useContext(QuestionContext);

    const updateStarredTrue = async (engagementID) => {
        try {
            const response = await updateEngagement({ engagementID: engagementID, update: { "starred": true } });
        } catch (error) {
            console.error('Failed to update engagement:', error);
        }

        setQuestionEngagementCombos((prevCombos) =>
            prevCombos.map((combo) =>
                combo.Engagement.id === engagementID
                    ? { ...combo, Engagement: { ...combo.Engagement, starred: true } }
                    : combo
            )
        );
    };

    const updateStarredFalse = async (engagementID) => {
        try {
            await updateEngagement({ engagementID: engagementID, update: { "starred": false } });
        } catch (error) {
            console.error('Failed to update engagement:', error);
        }

        setQuestionEngagementCombos((prevCombos) =>
            prevCombos.map((combo) =>
                combo.Engagement.id === engagementID
                    ? { ...combo, Engagement: { ...combo.Engagement, starred: false } }
                    : combo
            )
        );
    };

    const truncatePrompt = (text, wordLimit) => {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + " ...";
        }
        return text;
    };

    function formatDifficulty(difficulty) {
        return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await getUserData("65b6bdc051859b1dd3cb10fe");
                setUser(response);
                console.log("response", response.type);
            } catch (error) {
                console.error('Failed to confirm user:', error);
            }
        };

        checkUser();
    }, []);

    useEffect(() => {
        if (initialCombos) {
            setQuestionEngagementCombos(initialCombos);
            setLoading(false);
        } else {
            setError("Failed to load data");
            setLoading(false);
        }
    }, [initialCombos]);

    if (user === null) {
        return <div className='w-full h-[200px] flex flex-row justify-center items-center'>
            <Spinner />
            <div className='ml-[20px]'>Loading...</div>
        </div>;
    }

    return (
        <div className="flex flex-col gap-y-4 p-2">
            <Table removeWrapper >
                <TableHeader>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Question</TableColumn>
                    <TableColumn>Difficulty</TableColumn>
                    <TableColumn>MC / FR</TableColumn>
                    {/* <TableColumn>Reviewed</TableColumn> */}
                    <TableColumn>Starred</TableColumn>
                    <TableColumn>View</TableColumn>

                </TableHeader>
                <TableBody emptyContent = {"No questions. Try resetting filter"}>
                    {questionEngagementCombos.map((questionEngagement, index) => (
                        <TableRow key={index} className="cursor-pointer hover:bg-gray-100" >

                            <TableCell className="flex flex-row gap-2 justify-center items-center">
                                <div className="w-[20px] h-[20px]">
                                    {questionEngagement?.status === "correct" ?
                                        <><svg className="fill-[#0FAF89]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path>
                                        </svg></> : questionEngagement?.status === "incorrect" ?
                                            <svg className="fill-[#FF414C]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M9.172 16.242L12 13.414l2.828 2.828l1.414-1.414L13.414 12l2.828-2.828l-1.414-1.414L12 10.586L9.172 7.758L7.758 9.172L10.586 12l-2.828 2.828z"></path>
                                                <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2S2 6.486 2 12s4.486 10 10 10m0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8"></path>
                                            </svg> :questionEngagement?.status === "omitted" ?
                                            <svg className="fill-[#FFC107] border-[#FFC107]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="10" fill="#FFC107" />

                                            </svg> :  <svg className="fill-appleGray4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path>
                                            </svg>
                                    }
                                </div>
                                <Chip className="bg-[#F8F7F7] text-[#333333] px-[10px] py-[3px] flex flex-row justify-center items-center">
                                    {isNaN(Math.floor(questionEngagement?.Engagement?.duration / 60)) ? 0 : Math.floor(questionEngagement?.Engagement?.duration / 60)}:
                                    {isNaN(Math.floor(questionEngagement?.Engagement?.duration % 60)) ? '00' : Math.floor(questionEngagement?.Engagement?.duration % 60).toString().padStart(2, '0')}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                {renderMarkdownWithLaTeX(truncatePrompt(questionEngagement?.Question?.prompt, 16))}
                            </TableCell>
                            <TableCell>
                                <Chip
                                    color={
                                        questionEngagement?.Question?.difficulty === "easy"
                                            ? "success"
                                            : questionEngagement?.Question?.difficulty === "medium"
                                                ? "warning"
                                                : "danger"
                                    }
                                    className="text-white"
                                >
                                    {questionEngagement?.Question?.difficulty}
                                </Chip>
                            </TableCell>
                            {/* <TableCell>
                                {questionEngagement?.Engagement?.reviewed_response}
                            </TableCell> */}
                            <TableCell className = "text-gray-500 text-center">
                                {questionEngagement?.Question?.answer_type === "multipleChoice" ? "MC" : "FR"}
                            </TableCell>
                            <TableCell className="flex flex-row">
                                {/* {questionEngagement && (!questionEngagement?.Engagement?.flagged ? (
                                    <svg
                                        className='h-[30px] w-[30px] fill-[#14BF96]'
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3zm2-3.05l5-2.15l5 2.15V5H7zM7 5h10z"></path>
                                    </svg>
                                ) : (
                                    <svg
                                        className='h-[30px] w-[30px] fill-[#14BF96]'
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"></path>
                                    </svg>
                                ))} */}
                                {!questionEngagement?.Engagement?.starred ? (
                                    <svg
                                        className='h-[30px] w-[30px] fill-[#1865F2] cursor-pointer'
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 256 256"
                                        onClick={() => updateStarredTrue(questionEngagement?.Engagement?.id)}
                                    >
                                        <path d="M243 96a20.33 20.33 0 0 0-17.74-14l-56.59-4.57l-21.84-52.81a20.36 20.36 0 0 0-37.66 0L87.35 77.44L30.76 82a20.45 20.45 0 0 0-11.66 35.88l43.18 37.24l-13.2 55.7A20.37 20.37 0 0 0 79.57 233L128 203.19L176.43 233a20.39 20.39 0 0 0 30.49-22.15l-13.2-55.7l43.18-37.24A20.43 20.43 0 0 0 243 96m-70.47 45.7a12 12 0 0 0-3.84 11.86L181.58 208l-47.29-29.08a12 12 0 0 0-12.58 0L74.42 208l12.89-54.4a12 12 0 0 0-3.84-11.86l-42.27-36.5l55.4-4.47a12 12 0 0 0 10.13-7.38L128 41.89l21.27 51.5a12 12 0 0 0 10.13 7.38l55.4 4.47Z"></path>
                                    </svg>
                                ) : (
                                    <svg
                                        className='h-[30px] w-[30px] fill-[#1865F2] cursor-pointer'
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 256 256"
                                        onClick={() => updateStarredFalse(questionEngagement?.Engagement?.id)}
                                    >
                                        <path d="m234.29 114.85l-45 38.83L203 211.75a16.4 16.4 0 0 1-24.5 17.82L128 198.49l-50.53 31.08A16.4 16.4 0 0 1 53 211.75l13.76-58.07l-45-38.83A16.46 16.46 0 0 1 31.08 86l59-4.76l22.76-55.08a16.36 16.36 0 0 1 30.27 0l22.75 55.08l59 4.76a16.46 16.46 0 0 1 9.37 28.86Z"></path>
                                    </svg>
                                )}
                            </TableCell>
                            <TableCell>
                                <Button isIconOnly size="sm" onClick={() =>
                                    viewQuestionModal({
                                        questionId: questionEngagement?.Question?.id,
                                        engagementId: questionEngagement?.Engagement?.id,
                                    })
                                }>
                                    <Icon icon="line-md:arrow-right" width="24" height="24" style={{ color: "#0B2149" }} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <QuestionModal isOpen={isOpen} onOpenChange={onOpenChange} mode="practice" />

        </div>
    );
};

export default NewQBankTable;
