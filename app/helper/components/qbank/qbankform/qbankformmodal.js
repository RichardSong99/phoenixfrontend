import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, RadioGroup, Radio } from "@nextui-org/react";
import QBankForm from './qbankform';

export const QBankFormModal = ({ isOpen, onOpenChange, question, mode }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior={"inner"}
            size="full"
            shouldBlockScroll = {false}
        >
            <ModalContent style={{ padding: '10px' }}>
                <ModalBody>
                    <QBankForm
                        inputQuestion={question}
                        mode={mode}
                    />
                </ModalBody>

            </ModalContent>

        </Modal>
    );
}

