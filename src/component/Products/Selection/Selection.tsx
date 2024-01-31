import { Flex, Image, GreenText, SmallText, Line, SmallLine, Checkbox} from '../../../styles/globalStyles.styles';
import {
    RemoveText, SelectAllText, Warning
} from './Selection.styles'
import Move from '../Move/Move';
import { useState} from 'react';
import { Product } from '../../../types/types';

function Selection({products} : {products :Product[]}) {
    const [showMoveModal, setShowMoveModal] = useState(false);
    const [showNoSelectionWarning, setShowNoSelectionWarning] = useState(false);
    const handleShowMoveModal = () => {
        console.log(products.length )
        if(products.length > 0){
            setShowMoveModal(!showMoveModal)
        }
      }
    
      const handleMouseOver = () => {
        if(products.length <= 0){
            setShowNoSelectionWarning(true);
        }
      };
    
      const handleMouseOut = () => {
        setShowNoSelectionWarning(false);
      };

    return (
        <Flex align="center">
            <Image src="/done.svg" alt="selected" width="1.2em"></Image>
            <GreenText>selected</GreenText>
            <Line />
            <Image src="/arrow.svg" alt="move" width="1em"></Image>
            <SmallText onClick={()=>handleShowMoveModal()} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>move 
            {showNoSelectionWarning && <Warning>Please select at least one product.</Warning>}
            </SmallText>
            {showMoveModal&& !showNoSelectionWarning  && <Move products={products}/>}
            <SmallLine />
            <Image src="/bin.svg" alt="remove" width="1.5em"></Image>
            <RemoveText>remove</RemoveText>
            <Line />
            <SelectAllText>select all</SelectAllText>
            <Checkbox type="checkbox" ></Checkbox>
        </Flex>);
}

export default Selection;