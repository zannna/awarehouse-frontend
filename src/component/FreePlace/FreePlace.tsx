import { Flex, Background, Text, Image } from '../../styles/globalStyles.styles';
import { Input, ShelfContainer, Row, BlueRow} from './FreePlace.styles';
import MainNavigation from '../Header/MainNavigation';
function FreePlace() {
  return (
    <Background>
         <MainNavigation />
         <Flex width='100%' direction='column' marginTop='3.5em'>
            <Text color="#344351" size="1.5em" weight="300">Find free place for product</Text>
            <Flex gap='2em' marginTop='3em' align='center' >
            <div>
                <Text color="#6A6A6A" size="1.2em" weight="500" marginRight='1.5em'>product:</Text>
            </div>
            <div>length</div>
            <Input></Input>
            <div>width</div>
            <Input></Input>
            <div>height</div>
            <Input></Input>
            <div>amount</div>
            <Input></Input>
            </Flex>
         </Flex>
        <ShelfContainer>
            <BlueRow>
                <div>row 1</div>
                <div>no. 1</div>
                <div>shirts</div>
            </BlueRow>
            <Row>
                <div>tier 1</div>
                <div>shirts</div>
                <div>usage: 80%</div>
            </Row>
        </ShelfContainer>
    </Background>
  );
}   

export default FreePlace;