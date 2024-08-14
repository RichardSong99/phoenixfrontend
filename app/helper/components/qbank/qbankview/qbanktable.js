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

const QBankTable = ({ questionEngagementCombos: initialCombos }) => {
  const { isAuthenticated } = useUser();
  const [questionEngagementCombos, setQuestionEngagementCombos] = useState(initialCombos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialCombos) {
      setQuestionEngagementCombos(initialCombos);
      setLoading(false);
    } else {
      setError("Failed to load data");
      setLoading(false);
    }
  }, [initialCombos]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
    const response = await updateEngagement({ engagementID: engagementID, update: { "starred": true } });
    
    // Update state directly
    setQuestionEngagementCombos((prevCombos) =>
      prevCombos.map((combo) =>
        combo.Engagement.id === engagementID
          ? { ...combo, Engagement: { ...combo.Engagement, starred: true } }
          : combo
      )
    );
  };

  const updateStarredFalse = async (engagementID) => {
    await updateEngagement({ engagementID: engagementID, update: { "starred": false } });
    
    // Update state directly
    setQuestionEngagementCombos((prevCombos) =>
      prevCombos.map((combo) =>
        combo.Engagement.id === engagementID
          ? { ...combo, Engagement: { ...combo.Engagement, starred: false } }
          : combo
      )
    );
  };

  return (
    <div className="flex flex-col gap-y-4 p-2">
      <Table removeWrapper>
        <TableHeader>
          <TableColumn>Action</TableColumn>
          <TableColumn>Prompt</TableColumn>
          <TableColumn>Topic</TableColumn>
          <TableColumn>Difficulty</TableColumn>
          <TableColumn>Access Option</TableColumn>
          <TableColumn>Answer Type</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Date Answered</TableColumn>
          <TableColumn>Date Created</TableColumn>
          <TableColumn>Date Last Edited</TableColumn>
          <TableColumn>Reviewed</TableColumn>
          <TableColumn>Amount of time</TableColumn>
          <TableColumn>Flagged</TableColumn>
          <TableColumn>Starred</TableColumn>
        </TableHeader>
        <TableBody>
          {questionEngagementCombos.map((questionEngagement, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    color="danger"
                    onClick={() =>
                      handleDeleteQuestion(questionEngagement?.Question?.id)
                    }
                  >
                    Delete
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() =>
                      handleEditQuestion(questionEngagement?.Question?.id)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    color="primary"
                    onClick={() =>
                      viewQuestionModal({
                        questionId: questionEngagement?.Question?.id,
                        engagementId: questionEngagement?.Engagement?.id,
                      })
                    }
                  >
                    View
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                {renderMarkdownWithLaTeX(questionEngagement?.Question?.Prompt)}
              </TableCell>
              <TableCell>{questionEngagement?.Question?.Topic}</TableCell>
              <TableCell>
                <Chip
                  color={
                    questionEngagement?.Question?.Difficulty === "easy"
                      ? "success"
                      : questionEngagement?.Question?.Difficulty === "medium"
                        ? "warning"
                        : "danger"
                  }
                  className="text-white"
                >
                  {questionEngagement?.Question?.Difficulty}
                </Chip>
              </TableCell>
              <TableCell>
                {questionEngagement?.Question?.AccessOption}
              </TableCell>
              <TableCell>{questionEngagement?.Question?.AnswerType}</TableCell>
              <TableCell>
                <Chip
                  color={
                    questionEngagement?.status === "correct"
                      ? "success"
                      : questionEngagement?.status === "incorrect"
                        ? "danger"
                        : questionEngagement?.status === "omitted"
                          ? "warning"
                          : "default"
                  }
                  className="text-white"
                >
                  {isAuthenticated ? questionEngagement?.status : "Unattempted"}
                </Chip>
              </TableCell>
              <TableCell>
                {questionEngagement?.Engagement?.AttemptTime && (
                  <div>
                    {formatDate(questionEngagement?.Engagement?.AttemptTime)}
                  </div>
                )}
              </TableCell>
              <TableCell>
                {formatDate(questionEngagement?.Question?.CreationDate)}
              </TableCell>
              <TableCell>
                {formatDate(questionEngagement?.Question?.LastEditedDate)}
              </TableCell>
              <TableCell>
                {questionEngagement?.Engagement?.reviewed && <Icon
                  icon="lets-icons:check-fill"
                  width="32"
                  height="32"
                  style={{ color: "#3aca2f" }}
                />}
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                {questionEngagement && (!questionEngagement?.Engagement?.flagged ? (
                    <svg
                        className='h-[30px] w-[30px] fill-appleRed'
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3zm2-3.05l5-2.15l5 2.15V5H7zM7 5h10z"></path>
                    </svg>
                ) : (
                    <svg
                        className='h-[30px] w-[30px] fill-appleRed'
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"></path>
                    </svg>
                ))}
              </TableCell>
              <TableCell>
                {!questionEngagement?.Engagement?.starred ? (
                    <svg
                        className='h-[30px] w-[30px] fill-appleYellow'
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
                        className='h-[30px] w-[30px] fill-appleYellow'
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <QuestionModal isOpen={isOpen} onOpenChange={onOpenChange} mode="practice" />
      {editQuestion && (
        <QBankFormModal
          isOpen={isFormOpen}
          onOpenChange={onFormOpenChange}
          question={editQuestion}
          mode={MODEEDIT}
        />
      )}
    </div>
  );
};

export default QBankTable;
