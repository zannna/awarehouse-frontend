import {MainContainer, Background, LogoContainer, InputWrapper, InputText, Input, GreyButton, BlueButton, SelectorWrapper} from './WarehouseCreation.styles';
import { Flex, Text, BlueText, Image, GridItem  } from '../../styles/globalStyles.styles';
import  WarehouseCreationSelector  from './WarehouseCreationSelector/WarehouseCreationSelector';
import Selector  from '../Selector/Selector';
import { getAdminGroups, GroupData,  createWarehouse, Warehouse } from './WarehouseCreationApi';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import {unitMap} from '../../constants/MapConstants'
import { CookiesProvider, useCookies } from "react-cookie";
import React from 'react'
function WarehouseCreation(){
    const [error, setError] = useState<string | undefined>(undefined);
    const [groups, setGroups] = useState<GroupData[]>([]);
    const { keycloak, initialized } = useKeycloak();
    const [selectedGroup, setSelectedGroup] = useState<{ [key: string]: GroupData }>({});
    const [selectorGroupComponents, setSelectorGroupComponents] = useState<React.ReactElement[]>([]);
    const [name, setName] = useState("");
    const [numberOfRows, setNumberOfRows] = useState(0);
    const [unit, setUnit] = useState<string[]>([])
    const [cookies, setCookie] = useCookies(["warehouseId", "warehouseName"]);
    const [nameIsValid, setNameIsValid] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroups = async () => {
          const fetchedGroups= await getAdminGroups(keycloak.token);
          setGroups(fetchedGroups);
          setIsInitialized(true);
        };
          fetchGroups();
      }, []);

      useEffect(() => {
        if(selectorGroupComponents.length === 0 && isInitialized==true){
          const initialSelector = (
            <WarehouseCreationSelector
              key="selector-0"
              selectorId="selector-0"
              groups={groups}
              setGroups={setGroups}
              onSelectedGroupChange={handleGroupSelectedItemChange}
            />
          );
          setSelectorGroupComponents([initialSelector]);
        }
      }, [isInitialized]);

    const handleGroupSelectedItemChange = (selectorId :string, item :GroupData) => {
        setSelectedGroup(prevItems => ({
          ...prevItems,
          [selectorId]: item
        }));
      };

      const removeGroupSelector = (id :string|null) => {
        console.log(id);
        if(id!=null){
            setSelectorGroupComponents(prevComponents => prevComponents.filter(component => component.key !== id));
            delete selectedGroup[id];
            console.log(selectedGroup);
        }

      };

    const addNewGroupSelector = () => {
        const selectorId = `selector-${Object.keys(selectorGroupComponents).length}`;
        console.log(selectedGroup);
        const newSelector = <WarehouseCreationSelector  key={selectorId} selectorId={selectorId} groups={groups} setGroups={setGroups}  onSelectedGroupChange={ handleGroupSelectedItemChange} />;
        setSelectorGroupComponents((prevSelectors) =>[...prevSelectors, newSelector]);
      };

    const isWarehouseCreationValid = () => {
        if(name ===''){
          setNameIsValid(false);
          return false;
        }
        return true;
    }
    const sendWarehouseCreationRequest= async () =>{
      if( isWarehouseCreationValid()){
        const groupIds = Object.values(selectedGroup).map(group => group.id);
        const warehouseCreation: Warehouse = {
          name: name,
          numberOfRows: numberOfRows,
          unit: "METER",
          groupIds: groupIds
      }
      console.log(warehouseCreation);
      const warehouse= await createWarehouse(keycloak.token, warehouseCreation);
      setCookie("warehouseId", warehouse.id);
      setCookie("warehouseName", warehouse.name);
      navigate('/p');
      }

  }
    
return (<Background>
    <MainContainer>
      <LogoContainer> 
            A<Text size='0.5em'>warehouse</Text>
        </LogoContainer>
        <BlueText>create warehouse</BlueText>
        < InputWrapper>
        <InputText>name</InputText>
            <Input isValid={nameIsValid}  onChange={event => setName(event.target.value)}></Input>
        </ InputWrapper>
        <InputWrapper>
            <Text>number of rows</Text>
            <Input width="4em"
                isValid={true}
                 onChange={event => setNumberOfRows(parseInt(event.target.value,0))}
            ></Input>
        </InputWrapper>
        <SelectorWrapper>
            <InputText>unit</InputText>
            <Selector  items={unitMap} selected={unit} setSelected={setUnit}></Selector>
        </SelectorWrapper>
        <Flex direction='column' gap='0.5em'>
            <SelectorWrapper>
                <InputText>groups</InputText>
                {selectorGroupComponents[0]}
                <Flex>
                    <Image src="/square-minus.svg" alt="down" width="1.5em" opacity='70%' onClick={()=>removeGroupSelector(selectorGroupComponents[0].key)}/>
                    <Image src="/square-add.svg" alt="down" width="1.5em" opacity='50%' onClick={()=>addNewGroupSelector()}/>   
                </Flex>
            </SelectorWrapper>
            {selectorGroupComponents.slice(1).map((component, index) =>{
                 return(
                <SelectorWrapper>
                    <GridItem gridArea='selector'>
                        {component}
                    </GridItem>
                    <GridItem gridArea="button">
                        <Image src="/square-minus.svg" alt="down" width="1.5em" opacity='70%' onClick={()=> removeGroupSelector(component.key)}/>
                    </GridItem>
                </SelectorWrapper>
            );
            })}
        </Flex>
        <Text size='0.7em' color='red'>{error != undefined ? error : ''}</Text>       
        <Flex justify='center' gap="3em" width="50%" marginTop="2em" marginBottom="3em">
      <GreyButton>CANCEL</GreyButton>
      <BlueButton onClick={()=>{ sendWarehouseCreationRequest()}} >CREATE</BlueButton>
      </Flex>
    </MainContainer>
    </Background>);

}
export default WarehouseCreation;