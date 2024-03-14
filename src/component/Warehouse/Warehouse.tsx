import { Flex, Background, Text, Image } from '../../styles/globalStyles.styles';
import {RowNumberContainer, RowNumberButton, WarehouseTable, ShelfRow, BlueMarkText} from './Warehouse.styles'
import MainNavigation from '../Header/MainNavigation';
import  ShelfAccordion from './ShelfAccordiom/ShelfAccordion'
import { useState, useRef, useEffect } from 'react';
import ShelfCreator from './ShelfCreator/ShelfCreator';
import { useCookies } from "react-cookie";
import { getShelves, ShelfDto, getRowsNumber, addRow } from './WarehouseApi';
import { useKeycloak } from '@react-keycloak/web';
function Warehouse() {
    const [cookies, setCookie] = useCookies(["warehouseId", "warehouseName"]);
    const [shelves, setShelves] = useState<ShelfDto[]>([]);
    const { keycloak, initialized } = useKeycloak();
    const [rowsNumber, setRowsNumber] = useState(5);
    useEffect(() => {
        console.log(shelves);
    },[shelves]);

    useEffect(() => {
       getShelves(keycloak.token, cookies.warehouseId).then((shelves) => {
        console.log(shelves);
              setShelves(shelves);
         });
        getRowsNumber(keycloak.token, cookies.warehouseId).then((rowsNumber) => {
            console.log(rowsNumber);
            setRowsNumber(rowsNumber);
        });
    },[]);

    const updateShelfStateAfterTierRemoval = (shelfId :string, tierId :string) => {
        setShelves((prevShelves) => prevShelves.map(shelf => {
            if (shelf.id === shelfId) {
                const updatedTiers = shelf.tiers.filter(tier => tier.id !== tierId);
                return { ...shelf, tiers: updatedTiers };
            }
            return shelf;
        }));
    }
    
    const  updateShelvesAfterShelfRemoval  =(shelfId :string)=>{
        setShelves(currentShelves => currentShelves.filter(shelf => shelf.id !== shelfId));
    }
     
    
    const handleAddRow = () => {
        addRow(keycloak.token, cookies.warehouseId).then((status) => {
            if(status === 200){
                setRowsNumber(rowsNumber+1);
            }
        });
    }

    return <Background>
         <MainNavigation />
         <Flex width='100%' direction='column' marginTop='3.5em'>
            <Text color="#344351" size="1.5em" weight="300">{cookies.warehouseName}</Text>
            <Flex gap='2em' marginTop='2em'>
            <div>number of rows</div>
                <Flex>
                <RowNumberContainer>{rowsNumber}</RowNumberContainer>
                <RowNumberButton onClick={()=>{handleAddRow()}}>+</RowNumberButton>
                </Flex>
            </Flex>
            <WarehouseTable>
            {Array.from({ length: rowsNumber }, (_, index) => (
               <ShelfAccordion key={index} setShelves={setShelves} shelves={shelves.filter(shelf => shelf.row === index+1)} row={index+1}  updateShelfStateAfterTierRemoval={ updateShelfStateAfterTierRemoval}
               updateShelvesAfterShelfRemoval={updateShelvesAfterShelfRemoval}
               ></ShelfAccordion>
               ))}
         </WarehouseTable>
         </Flex>
      
    </Background>
}
export default Warehouse;