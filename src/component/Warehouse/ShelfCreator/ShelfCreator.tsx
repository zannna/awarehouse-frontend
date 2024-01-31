import { useState, useRef, forwardRef,  useEffect } from 'react';
import { Flex, Text, Image } from '../../../styles/globalStyles.styles';
import Selector from '../../Selector/Selector';
import {NameInput, Input, ShelfCreationRow, CreateShelfContainer} from './ShelfCreator.styles'
import { BlueMarkText, ShelfTableHeaderText, TierRow } from '../Warehouse.styles';
import { unitMap } from '../../../constants/UnitConstants';
interface ShelfCreatorProps {
    setNewShelf: (data: any) => void;
  }
  
function ShelfCreator({...props }, ref: React.Ref<HTMLDivElement>){
    const [showTiers,  setShowTiers] = useState(false);
    const [numberOfTiers, setNumberOfTiers] = useState(0);
 
    function handleNumberOfTiers(event : any){
        console.log(event.target.value);
        event.preventDefault();
        const number = event.target.value;
        if(numberOfTiers==0 && number>0){
            setNumberOfTiers(number) ; 
            setShowTiers(true);
            setTimeout(() => {
                setShowTiers(true);
            }, 10000);
        }
    }
    return(
            < CreateShelfContainer  ref={ref}>
                <div ></div>
                <Flex justify='flex-end' padding='1em'><Image src="/cancel.svg" alt="add" width='1em' ></Image></Flex>
                <BlueMarkText> create shelf</BlueMarkText>
                    < ShelfCreationRow>
                    <ShelfTableHeaderText>number</ShelfTableHeaderText>
                    <ShelfTableHeaderText>name</ShelfTableHeaderText>
                    <ShelfTableHeaderText>size</ShelfTableHeaderText>
                    <ShelfTableHeaderText>height</ShelfTableHeaderText>
                    <ShelfTableHeaderText>length</ShelfTableHeaderText>
                    <ShelfTableHeaderText>width</ShelfTableHeaderText>
                    <ShelfTableHeaderText>unit</ShelfTableHeaderText>
                    <ShelfTableHeaderText>no. Tiers</ShelfTableHeaderText>
                    <ShelfTableHeaderText>same size of tiers</ShelfTableHeaderText>
                </ShelfCreationRow>
                <ShelfCreationRow>
                    <Flex align='center'> <Input></Input></Flex>
                    <NameInput></NameInput>
                    <input type="checkbox" />
                    <Input></Input>
                    <Input></Input>
                    <Input></Input>
                    {/* <Selector items={unitMap}></Selector> */}
                    <Input onChange={(event)=>{handleNumberOfTiers(event)}}></Input>
                    <input type="checkbox" />
                </ShelfCreationRow>
                {showTiers &&
                <><BlueMarkText> tiers:  </BlueMarkText><TierRow>
                        <ShelfTableHeaderText>number</ShelfTableHeaderText>
                        <ShelfTableHeaderText>name</ShelfTableHeaderText>
                        <ShelfTableHeaderText>size</ShelfTableHeaderText>
                        <ShelfTableHeaderText>height</ShelfTableHeaderText>
                        <ShelfTableHeaderText>length</ShelfTableHeaderText>
                        <ShelfTableHeaderText>width</ShelfTableHeaderText>
                        <ShelfTableHeaderText>unit</ShelfTableHeaderText>
                        <Image src="/square-add.svg" alt="add" width='1.3em' opacity='100%'></Image>
                    </TierRow>
                        {Array.from({ length: numberOfTiers }, (_, index) => (
                             <TierRow key={index}>
                                <Input></Input>
                                <NameInput></NameInput>
                                <input type="checkbox" />
                                <Input></Input>
                                <Input></Input>
                                <Input></Input>
                                <Input></Input>
                                <Image src="/minus.svg" alt="minus" width='1.3em'></Image>
                             </TierRow>
                          ))}
                            <Flex justify='center' width='100%' gap='3em' marginTop='3.5em' marginBottom='2em'>
                            <Image src="/accept.svg" alt="add" width='2.5em' opacity='100%'></Image>
                        </Flex></>
                    }

            </ CreateShelfContainer>
             
    )
}

export default forwardRef(ShelfCreator);