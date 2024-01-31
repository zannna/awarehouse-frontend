import { Background,  Header, LogoContainer, LineWithText, Logo, ButtonContainer, Button, NewWarehouseButton, JoinWarehouseButton, Line, Text, NewButtonContainer, NewWarehouseImage } from './UserWarehouses.styles';
import { Flex } from '../../styles/globalStyles.styles';
const buttonsData = [
    { id: 1, label: 'Warehouse 1' },
    { id: 2, label: 'Warehouse 2' },
    { id: 3, label: 'Warehouse 3' },
    { id: 4, label: 'Warehouse 4' },
    { id: 5, label: 'Button 5' },

];

function UserWarehouses() {
    return (<Background direction="column" padding="7em">
        <Header direction="column" align="center" justify="center">
            <LogoContainer direction='row' align="center" justify="center"> 
                 A<Logo>warehouse</Logo>
            </LogoContainer> 
            <LineWithText />
        </ Header>
        <Flex direction="column" align="center" justify="center" width="100%">
            <Text>
                choose a warehouse
            </Text>
            <ButtonContainer>
                {buttonsData.map((button) => (
                    <Button key={button.id}>{button.label}</Button>
                ))}
            </ButtonContainer>
            <Text>
                or
            </Text>
            <NewButtonContainer>
                <NewWarehouseButton>
                    new warehouse
                    <NewWarehouseImage src="/add.svg" alt="add button" ></NewWarehouseImage>
                </NewWarehouseButton>
                <JoinWarehouseButton>join warehouse<NewWarehouseImage src="/chain.svg" alt="join button" ></NewWarehouseImage></JoinWarehouseButton>
            </NewButtonContainer>
        </Flex>
        <Line />
    </Background>)
}

export default UserWarehouses;