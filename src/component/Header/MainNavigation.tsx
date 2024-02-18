import { Background, Header, LogoContainer, Logo, Line, ViewOption, ArrowDownImage, ActualWarehouse, ActualText, WarehouseSelector, Options,  WarehouseList, WarehouseText } from './MainNavigation.styles';
import { Flex, Box } from '../../styles/globalStyles.styles';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import {getWarehouses, Warehouse} from './MainNavigationApi';
import { useKeycloak } from '@react-keycloak/web';
function MainNavigation() {
    const [showWarehouses, setShowWarehouses] = useState(false);
    const { keycloak, initialized } = useKeycloak();
    const [cookies, setCookie] = useCookies(["warehouseId", "warehouseName"]);
    const [ warehouses, setWarehouses] = useState<Warehouse[]>([]);
    useEffect(() => {
        const fetchWarehouses = async () => {
            const fetchedWarehouses= await  getWarehouses(keycloak.token);
             console.log(fetchedWarehouses);
            setWarehouses(fetchedWarehouses);
          };
        fetchWarehouses();
    },[]);
    const handleMouseLeave = () => {
        setShowWarehouses(false)
      }
    const setChangeChoosenWarehouse= (warehouseId :string, warehouseName :string) => {
        setCookie("warehouseId", warehouseId);
        setCookie("warehouseName", warehouseName);
    }
    return (<Background direction="column">
     <Header>
            <LogoContainer direction='row' align="center"> 
                A<Logo>warehouse</Logo>
            </LogoContainer> 
            <Options>
                <Flex align="center" justify="center">
                    <Line/>
                    <ViewOption>
                        product
                        <ArrowDownImage src="/arrow-down.svg" alt="arrow down" ></ArrowDownImage>
                    </ViewOption>
                </Flex>
                <Flex align="center" justify="center">
                    <Line/>
                    <ViewOption>
                        warehouse
                        <ArrowDownImage src="/arrow-down.svg" alt="arrow down" ></ArrowDownImage>
                    </ViewOption>
                </Flex>
                <Flex align="center" justify="center">
                    <Line/>
                    <ViewOption>
                        profile
                        <ArrowDownImage src="/arrow-down.svg" alt="arrow down" ></ArrowDownImage>
                    </ViewOption>
                </Flex>
            </Options>
            <ActualWarehouse direction='column'>
                <ActualText>
                    actual: 
                </ActualText>
                <WarehouseSelector>
                    <div id="choosenWarehouse" onClick={()=>{setShowWarehouses(!showWarehouses)}}>{cookies.warehouseName}<ArrowDownImage src="/arrow-down.svg" alt="arrow down" ></ArrowDownImage></div>
                    {showWarehouses && (
                        <WarehouseList onMouseLeave={handleMouseLeave}>
                            { 
                                warehouses.map((warehouse) => (
                                    <WarehouseText key={warehouse.id} onClick={()=>{setChangeChoosenWarehouse(warehouse.id, warehouse.name)}}>{warehouse.name}</WarehouseText>
                                ))}
                        </WarehouseList>
                    )}
                </WarehouseSelector>
            </ActualWarehouse>
         
     </Header>
    </Background>)
}

export default  MainNavigation;