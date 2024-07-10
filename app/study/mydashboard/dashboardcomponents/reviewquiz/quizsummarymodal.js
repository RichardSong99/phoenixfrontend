"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, RadioGroup, Radio } from "@nextui-org/react";
import { QuizSummary } from "./quizsummary";

export const QuizSummaryModal = ({ fullQuizData, isOpen, onOpen, onOpenChange }) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inner"} size="4xl">
            <ModalContent style={{ width: "80%", padding: "10px" }}>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Quiz Results
                        </ModalHeader>
                        <ModalBody style={{ padding: "0" }}>
                            <QuizSummary fullQuizData={fullQuizData} />
                        </ModalBody>
                        {/* <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter> */}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
