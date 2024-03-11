import { useState, useRef, forwardRef,  useEffect } from 'react';
import { Flex, Text, Image } from '../../../styles/globalStyles.styles';
import Selector from '../../Selector/Selector';
import {NameInput, Input, ShelfCreationRow, CreateShelfContainer} from './ShelfCreator.styles'
import { BlueMarkText,TierRow, ShelfTableHeaderText } from '../Warehouse.styles';
import { unitMap } from '../../../constants/MapConstants';
import {Dimensions, ShelfCreation, TierCreation, createShelf, ShelfDto, updateShelf, Tier} from '../WarehouseApi'
import {metreMap, metreConverter } from '../../../constants/MapConstants'
import { useCookies } from "react-cookie";
import { useKeycloak } from '@react-keycloak/web';
interface ShelfCreatorProps {
    setNewShelf: (data: any) => void;
    addShelf: (shelf: ShelfDto) => void;
    row: number;
    editShelf?: ShelfDto;
    setEditShelf?: (data: any) => void;
  }
  
function ShelfCreator({...props }, ref: React.Ref<HTMLDivElement>){
    const [shelfNumber, setShelfNumber] = useState(0);
    const [shelfName, setShelfName] = useState('');
    const [shelfSize, setShelfSize] = useState(false);
    const [shelfHeight, setShelfHeight] = useState(0);
    const [shelfLength, setShelfLength] = useState(0);
    const [shelfWidth, setShelfWidth] = useState(0);
    const [sameSizeOfTiers, setSameSizeOfTiers] = useState(false);
    const [showTiers,  setShowTiers] = useState(false);
    const [numberOfTiers, setNumberOfTiers] = useState(0);
    const [selectedUnit, setSelectedUnit] = useState<string[]>(["4", metreMap.get('4') || '']);
    const [tiers, setTiers] = useState<TierCreation[]>([]);
    const [cookies, setCookie] = useCookies(["warehouseId", "warehouseName"]);
    const {keycloak, initialized } = useKeycloak();

    useEffect(() => {
      if (props.editShelf) {
        console.log(props.editShelf);
          setShelfNumber(props.editShelf.number);
          setShelfName(props.editShelf.name);
          setShelfSize(props.editShelf.size);
          setShelfHeight(props.editShelf.dimensions?.height);
          setShelfLength(props.editShelf.dimensions?.length);
          setShelfWidth(props.editShelf.dimensions?.width);
          setSameSizeOfTiers(props.editShelf.sameSizeTiers);
          setNumberOfTiers(props.editShelf.tiers.length);
          setSelectedUnit(["0", unitMap.get(props.editShelf.dimensions.unit) || '']);
          setTiers( props.editShelf.tiers);
          setShowTiers(true);
        }
  }, [props.editShelf]);

  useEffect(() => {
    console.log(tiers);
  }, [tiers]);

  useEffect(() => {
    if (!props.editShelf){
      setTiers(prevTiers => {
          const newTiers = [...prevTiers];
          for (let i = prevTiers.length; i < numberOfTiers; i++) {
              newTiers.push({ number: i + 1, name: '', size: false, dimensions: { height: 0, length: 0, width: 0 } });
          }
          if (numberOfTiers < prevTiers.length) {
              return newTiers.slice(0, numberOfTiers);
          }
          return newTiers;
      });
    }
  }, [numberOfTiers]);
  
    const updateTiers = (index: number,  detailType:  Exclude<keyof TierCreation, 'dimensions'>, value: string | number | boolean ) => {
        setTiers(prevTiers => {
          const updatedTiers :TierCreation[]= [...prevTiers];
          const tier = updatedTiers[index] || { number: 0, name: '', size: false, dimensions: { height: 0, length: 0, width: 0 } };
          (tier as any)[detailType]  = value;
          updatedTiers[index] = tier;
          return updatedTiers;
        });
      }
      

      const updateTierDimensions = (elementId: number, dimensionType: keyof Dimensions, value: string) => {
        const dimensionValue = parseFloat(value); 
        setTiers(prevTiers => prevTiers.map((tier, index) => {
          if (index === elementId) {
            return {
              ...tier,
              dimensions: {
                ...tier.dimensions,
                [dimensionType]: isNaN(dimensionValue) ? 0 : dimensionValue,
              },
            };
          }
          return tier;
        }));
      };
 
      function handleNumberOfTiers(event : any){
          console.log(event.target.value);
          event.preventDefault();
          const number = event.target.value;
        //  if(numberOfTiers==0 && number>0){
              setNumberOfTiers(number) ; 
              setShowTiers(true);
              setTimeout(() => {
                  setShowTiers(true);
              }, 10000);
         // }
      }
    async function sendShelfCreationRequest(){
      if (props.editShelf) {
        const shelfData = {
          id: props.editShelf.id,
          number: shelfNumber,
          name: shelfName,
          size: shelfSize,
          unit: selectedUnit[1],
          sameSizeTiers: sameSizeOfTiers,
          row: props.row,
          dimensions: {
              height: shelfHeight,
              length: shelfLength,
              width: shelfWidth,
              unit: metreConverter(selectedUnit[1] ? selectedUnit[1] : 'm'),
          },
          tiers: tiers.map(tier => ({
            id: tier.id,
            number: tier.number, 
            name: tier.name, 
            size: tier.size,
            dimensions: {
                height: shelfHeight,
                length: shelfLength,
                width: shelfWidth,
                unit: metreConverter(selectedUnit[1] ? selectedUnit[1] : 'm'),
            }
          }))
        }
        const updatedShelf = await updateShelf(keycloak.token, cookies['warehouseId'], shelfData);
        props.setEditShelf(updatedShelf);
        props.setNewShelf(false);

      }
      else{
        const shelfData = {
          number: shelfNumber,
          name: shelfName,
          size: shelfSize,
          unit: selectedUnit[1],
          sameSizeTiers: sameSizeOfTiers,
          row: props.row,
          dimensions: {
              height: shelfHeight,
              length: shelfLength,
              width: shelfWidth,
              unit: metreConverter(selectedUnit[1]),
          },
          tiers: tiers.map(tier => ({
            number: tier.number, 
            name: tier.name, 
            size: tier.size,
            dimensions: {
                height: shelfHeight,
                length: shelfLength,
                width: shelfWidth,
                unit: metreConverter(selectedUnit[1]),
            }
          }))
        }
        console.log(shelfData)
        const fetchedProduct= await createShelf(keycloak.token, cookies['warehouseId'], shelfData);
        console.log(fetchedProduct);
        props.setNewShelf(false);
        props.addShelf(fetchedProduct);
      }
    }

    const removeTier = (indexToRemove: number) => {
      setTiers((currentTiers) => currentTiers.filter((_, index) => index !== indexToRemove));
      setNumberOfTiers(currentNumberOfTiers => currentNumberOfTiers - 1);
  };

  
  const changeSameSizeOfTiers= (value : boolean)=>{
    const height =  shelfHeight/numberOfTiers;
    const length =  shelfLength/numberOfTiers;
    const width =  shelfWidth/numberOfTiers;
    setSameSizeOfTiers(value);
    const updatedTiers = tiers.map((tier, index) => ({    
        ...tier, 
        size: true,
        dimensions: {
          height:  height,
          length: length,
          width: width
        }
      
    }));
    setTiers(updatedTiers);
  }
  function closeCreateShelf(){
    props.setNewShelf(false);
    props.setEditShelf(null);

  }

    return(
            < CreateShelfContainer  ref={ref}>
                <div ></div>
                <Flex justify='flex-end' padding='1em'><Image src="/cancel.svg" alt="add" width='1em' 
                onClick={()=>{props.setNewShelf(false)}} ></Image></Flex>
                <BlueMarkText> create shelf</BlueMarkText>
                    <ShelfCreationRow>
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
                <Flex align='center'> <Input value={shelfNumber} onChange={(e) => setShelfNumber(parseFloat(e.target.value))}></Input></Flex>
                  <NameInput value={shelfName} onChange={(e) => setShelfName(e.target.value)}></NameInput>
                  <input type="checkbox" checked={shelfSize} onChange={(e) => setShelfSize(e.target.checked)} />
                  <Input value={shelfHeight}
                   disabled={!shelfSize}
                    onChange={(e) => setShelfHeight(parseFloat(e.target.value))}
                    style={{ opacity: !shelfSize ? 0.7 : 1 }}
                    ></Input>
                  <Input value={shelfLength} 
                    disabled={!shelfSize}
                    onChange={(e) => setShelfLength(parseFloat(e.target.value))}
                    style={{ opacity: !shelfSize ? 0.7 : 1 }}></Input>
                  <Input value={shelfWidth} 
                    disabled={!shelfSize}
                    onChange={(e) => setShelfWidth(parseFloat(e.target.value))}
                    style={{ opacity: !shelfSize ? 0.7 : 1 }}></Input>
                  <Selector items={metreMap} selected={selectedUnit}  setSelected={setSelectedUnit} ></Selector>
                  <Input  onChange={(event)=>{handleNumberOfTiers(event)}} value={numberOfTiers}></Input>
                  <input type="checkbox" checked={sameSizeOfTiers} onChange={(e) => changeSameSizeOfTiers(e.target.checked)} disabled={!shelfSize} />
                </ShelfCreationRow>
                {showTiers &&
                <><BlueMarkText> tiers:  </BlueMarkText><TierRow>
                        <ShelfTableHeaderText>number</ShelfTableHeaderText>
                        <ShelfTableHeaderText>name</ShelfTableHeaderText>
                        <ShelfTableHeaderText>size</ShelfTableHeaderText>
                        <ShelfTableHeaderText>height</ShelfTableHeaderText>
                        <ShelfTableHeaderText>length</ShelfTableHeaderText>
                        <ShelfTableHeaderText>width</ShelfTableHeaderText>
                        <Image src="/square-add.svg" alt="add" width='1.3em' opacity='100%'></Image>
                    </TierRow>
                    {tiers.map((tier, index) => (
                    <TierRow key={index}>
                        <Input onChange={(e) => updateTiers(index, 'number', e.target.value)} value={tier.number}></Input>
                        <NameInput onChange={(e) => updateTiers(index, 'name', e.target.value)}  value={tier.name}></NameInput>
                        <input disabled={!shelfSize} type="checkbox" checked={tier.size} onChange={(e) => updateTiers(index, 'size', e.target.checked)} />
                        <Input onChange={(e) => updateTierDimensions(index, 'height', e.target.value)} disabled={!(shelfSize && tier.size)}  value={tier.dimensions.height}
                         style={{ opacity: !(shelfSize && tier.size)   ? 0.7 : 1 }}></Input>
                        <Input onChange={(e) => updateTierDimensions(index, 'length', e.target.value)} disabled={!(shelfSize && tier.size)}  value={tier.dimensions.length}
                         style={{ opacity: !(shelfSize && tier.size)   ? 0.7 : 1 }}></Input>
                        <Input onChange={(e) => updateTierDimensions(index, 'width', e.target.value)} disabled={!(shelfSize && tier.size)}  value={tier.dimensions.width}
                           style={{ opacity: !(shelfSize && tier.size)  ? 0.7 : 1 }}></Input>
                        <Image src="/minus.svg" alt="minus" width='1.3em' onClick={() => removeTier(index)}></Image>
                    </TierRow>
                     ))}

                            <Flex justify='center' width='100%' gap='3em' marginTop='3.5em' marginBottom='2em'>
                            <Image src="/accept.svg" alt="add" width='2.5em' opacity='100%' onClick={()=>sendShelfCreationRequest()}></Image>
                        </Flex></>
                    }

            </ CreateShelfContainer>
             
    )
}

export default forwardRef(ShelfCreator);