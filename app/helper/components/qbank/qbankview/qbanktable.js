import React, { useEffect, useState, useContext } from "react";
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

const QBankTable = ({ questionEngagementCombos }) => {
  const { isAuthenticated } = useUser();

  const {
    activeViewQuestion,

    viewQuestionModal,
    activeViewEngagement,
    isOpen,
    onOpenChange,
    isFormOpen,
    onFormOpenChange,
    editQuestion,
    MODEEDIT,
    MODENEW,
    questionsUpdated,
    setQuestionsUpdated,
    handleEditQuestion,
    handleDeleteQuestion,
  } = useContext(QuestionContext);

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
                <Icon
                  icon="lets-icons:check-fill"
                  width="32"
                  height="32"
                  style={{ color: "#3aca2f" }}
                />
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Icon
                  icon="material-symbols:bookmark"
                  width="32"
                  height="32"
                  style={{ color: "##002E62" }}
                />
              </TableCell>
              <TableCell>
                <Icon icon="ic:round-star" width="32 " height="32" style={{ color: "#F5A524" }} />

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* </div> */}

      {activeViewQuestion && (
        <QuestionModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          mode="practice"
        />
      )}

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
