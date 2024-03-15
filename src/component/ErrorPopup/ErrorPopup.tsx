import { PopupContainer, Popup } from './ErrorPopup.styles';
import { Flex, Image } from '../../styles/globalStyles.styles';

interface ErrorPopupProps {
    message: string;
    onClose: () => void;
}


function ErrorPopup({ message, onClose }: ErrorPopupProps) {
  return (
         <PopupContainer>
            <Popup>
                <Flex justify='flex-end'>
                   <Image  src="/cancel.svg" alt="pointer" width="0.8em"  onClick={()=>onClose()} />
                </Flex>
                <Flex marginLeft='3em' marginRight='3em' marginBottom='4em'>
                {message}
                </Flex>
            </Popup>
        </PopupContainer>
  );
}
export default ErrorPopup;