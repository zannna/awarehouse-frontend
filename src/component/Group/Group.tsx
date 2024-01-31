import { Flex, Background, Text, Image, Line, GreenText, SmallLine } from '../../styles/globalStyles.styles';
import {Warehouse,  RedText, GroupText, GroupContainer, GroupItem, GroupName, GreyText} from './Group.styles'
import MainNavigation from '../Header/MainNavigation';
import { useState, useEffect } from 'react';
function Group(){
    const [content, setContent] = useState<string[]>([]);
    const dragStartHandler = (
        event: React.DragEvent<HTMLDivElement>,
        data: string
      ) => {
        event.dataTransfer.setData("text", data);
      };
      useEffect(() => {
        // Aktualizuje lokalny stan, gdy zmieni się zawartość
       console.log(content)
      }, [content]); // [content] to tablica zależności
    

      const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        setContent([...content, data]);
      };
    
      const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      };

return <Background>
<MainNavigation />
<Flex width='100%' marginTop='5em'>
    <Flex width='70%' direction='column'>
        <Flex gap='1em' height='fit-content' align='center'> 
        <GreyText>Group</GreyText>
            < Line/>
            <Flex gap='0.5em' align='center'>
                < GreenText>
                add new  
                </GreenText>
                <Image src="/add.svg" alt="add" width='1.2em' ></Image>
            </Flex>
            <SmallLine/>
            <Flex gap='0.5em' align='center'>
                <RedText>remove </RedText>
                <Image src="/bin.svg" alt="add" width='1.7em' ></Image>
            </Flex>
        </Flex>
        <GroupContainer>
            <GroupItem>
                <GroupName  onDragOver={allowDrop} onDrop={dropHandler}>group 1</GroupName>
                {content.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
            </GroupItem>
            <GroupItem>
                <GroupName>group 2</GroupName>
            </GroupItem>
        </GroupContainer>

    </Flex>
        <Flex width='30%'  align='flex-end' direction='column' gap='2em'>
                <GreyText>your warehouses</GreyText>
                <Warehouse onDragStart={(event) => dragStartHandler(event, "Lilly Bling sklep")}
        draggable={true}>Lilly Bling sklep</Warehouse>
                <Warehouse>Lilly Bling magazyn</Warehouse>
                <Warehouse>Budimex</Warehouse>
            </Flex>
        </Flex>
    </Background>
}
export default Group;