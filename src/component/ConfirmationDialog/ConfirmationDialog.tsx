import { DialogContainer, Dialog, ClearButton, DoneButton } from "./ConfirmationDialog.styles";
import { Flex, Text } from "../../styles/globalStyles.styles";
export interface ConfirmationDialogProps {

    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}
function ConfirmationDialog({ isOpen, onClose, onConfirm, message }: ConfirmationDialogProps) {

    return (<>
        {isOpen &&
        <DialogContainer >
            <Dialog>
                <Flex direction='column' justify="center" height='100%' align="center" gap="6em">
                    <Text size='1.2em' > {message}</Text>
                    <Flex gap='2em' width='50%' align='center'>
                        <ClearButton onClick={onClose}>Cancel</ClearButton>
                        <DoneButton onClick={onConfirm} >
                            Confirm
                            </DoneButton>
                    </Flex>
            </Flex>
        </Dialog>

    </DialogContainer >}
  </>
  );
}
export default ConfirmationDialog;