import { Flex, Background, Text, Image } from '../../styles/globalStyles.styles';
import {RowNumberContainer, RowNumberButton, WarehouseTable, ShelfTableHeaderText, ShelfRow, RowContainer, 
    BlueMarkText,  GreyMarkText, TierRow, FirstTierText} from './Warehouse.styles'
import MainNavigation from '../Header/MainNavigation';
import { Button } from '../UserWarehouses/UserWarehouses.styles';
import Selector from '../Selector/Selector';
import  ShelfAccordion from './ShelfAccordiom/ShelfAccordion'
import { CreationInput } from '../Products/ProductsPage.styles';
import { useState, useRef } from 'react';
import ShelfCreator from './ShelfCreator/ShelfCreator';
import {unitMap} from '../../constants/UnitConstants'
function Warehouse() {
    const [newShelf, setNewShelf] = useState(false);
    const myRef = useRef<null | HTMLDivElement>(null);
    function addNewShelf(){
        setNewShelf(true);
        myRef.current?.scrollIntoView({behavior: 'smooth', block: "center"});
    }


    return <Background>
         <MainNavigation />
         <Flex width='100%' direction='column' marginTop='3.5em'>
            <Text color="#344351" size="1.5em" weight="300"> Warehouse1</Text>
            <Flex gap='2em' marginTop='2em'>
            <div>number of rows</div>
                <Flex>
                < RowNumberContainer>5</RowNumberContainer>
                <RowNumberButton>+</RowNumberButton>
                </Flex>
                {/* unit<Selector items={unitMap}></Selector> */}
            </Flex>
            <WarehouseTable>
                <RowContainer>  Row 1 
                    <Flex align='center' gap='0.5em' cursor='pointer' onClick={addNewShelf}>
                        <Image src="/add.svg" alt="add" width='1.2em' ></Image>
                        <Text family='Play' weight='400' size='0.8em'>add shelf</Text>
                    </Flex>
                </RowContainer>
              <BlueMarkText>shelves:</BlueMarkText>
                < ShelfRow>
                    <ShelfTableHeaderText>number</ShelfTableHeaderText>
                    <ShelfTableHeaderText>name</ShelfTableHeaderText>
                    <ShelfTableHeaderText>size</ShelfTableHeaderText>
                    <ShelfTableHeaderText>height</ShelfTableHeaderText>
                    <ShelfTableHeaderText>length</ShelfTableHeaderText>
                    <ShelfTableHeaderText>width</ShelfTableHeaderText>
                    <ShelfTableHeaderText >no. Tiers</ShelfTableHeaderText>
                    <ShelfTableHeaderText>same size of tiers</ShelfTableHeaderText>
                </ShelfRow>
                < ShelfAccordion/>
                < ShelfAccordion/>
                < ShelfAccordion/>
                < ShelfAccordion/>
                < ShelfAccordion/>
                < ShelfAccordion/>
                < ShelfAccordion/>
                {/* <ShelfCreator setNewShelf={setNewShelf} ref={myRef}/> */}
                <div ref={myRef}>
                { newShelf &&
                    <ShelfCreator setNewShelf={setNewShelf} />}
                </div>
                    {/* {newShelf && <ShelfCreator ref={myRef}/>} */}
         </WarehouseTable>
         </Flex>
         {/* <Filter /> */}
      
    </Background>
}
export default Warehouse;