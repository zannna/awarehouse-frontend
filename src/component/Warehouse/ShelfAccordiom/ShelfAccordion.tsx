import { ShelfRow, ShelfText, TierRow, TierRowContainer,  FirstTierText,  } from "./ShelfAccordion.styles";
import { Flex, Image, Text } from "../../../styles/globalStyles.styles";
import Selector from "../../Selector/Selector";
import {metreMap} from '../../../constants/UnitConstants'
import { useState } from "react";
function ShelfAccordion(){
    const [showTiers, setShowTiers] = useState(false);
    
 return (<>
    < ShelfRow>
    <ShelfText>1</ShelfText>
    <ShelfText>underwear</ShelfText>
    <ShelfText><input type="checkbox" /></ShelfText>
    <Flex gap='0.5em' justify='center'>  
        <ShelfText>0.2  </ShelfText>
        {/* <Flex height='0.5em' fontSize='0.7em'> <Selector items={metreMap}></Selector></Flex> */}
    </Flex>
    <Flex gap='0.5em' justify='center'>  
        <ShelfText>0.2  </ShelfText>
        {/* <Flex height='0.5em' fontSize='0.7em'> <Selector items={metreMap}></Selector></Flex> */}
    </Flex>
    <Flex gap='0.5em' justify='center'>  
        <ShelfText>0.2  </ShelfText>
        {/* <Flex height='0.5em' fontSize='0.7em'> <Selector items={metreMap}></Selector></Flex> */}
    </Flex>
    <ShelfText>3</ShelfText>
    <ShelfText><input type="checkbox" /></ShelfText>
    <Flex justify='flex-end'gap='0.6em'> 
        <Image src="/blue-arrow-down.svg" alt="add" width='1.6em' opacity='90%' onClick={()=>{setShowTiers(!showTiers)}}></Image>
        <Image src="/gear.svg" alt="add" width='1.6em' ></Image>
        <Image src="/bin.svg" alt="add" width='2em' ></Image>
    </Flex>
</ShelfRow>
{showTiers &&
<TierRowContainer>
    <Text color="#6A6A6A" size='1.2em' weight="300" family='Palanquin Dark' align='center' margin='1.5em'> tiers:</Text>
<TierRow>
    <FirstTierText>number</FirstTierText>
    <FirstTierText>name</FirstTierText>
    <FirstTierText>size</FirstTierText>
    <FirstTierText>height</FirstTierText>
    <FirstTierText>length</FirstTierText>
    <FirstTierText>width</FirstTierText>

</TierRow>
<TierRow>
    <ShelfText>1</ShelfText>
    <ShelfText>socks</ShelfText>
    <ShelfText>
    <input type="checkbox" /></ShelfText>
    <Flex justify='center'gap='0.6em'>
        {/* <ShelfText>0.2</ShelfText>  <Flex height='0.5em' fontSize='0.7em'> <Selector items={metreMap}></Selector></Flex> */}
    </Flex>
    <Flex justify='center'gap='0.6em'>
        {/* <ShelfText>0.2</ShelfText>  <Flex height='0.5em' fontSize='0.7em'> <Selector items={metreMap}></Selector></Flex> */}
    </Flex>
    <Flex justify='center'gap='0.6em'>
        {/* <ShelfText>0.2</ShelfText>  <Flex height='0.5em' fontSize='0.7em'> <Selector items={metreMap}></Selector></Flex> */}
    </Flex>
    <Flex justify='flex-end'gap='0.6em'> 
        <Image src="/gear.svg" alt="add" width='1.6em' ></Image>
        <Image src="/bin.svg" alt="add" width='2em' ></Image>
    </Flex>
</TierRow>

</TierRowContainer>}
</>
 )
}
export default ShelfAccordion;