import {
    Background, Header, SelectionContainer, LogoContainer, Logo, Line, ViewOption, ArrowDownImage, ActualWarehouse, ActualText,
    WarehouseSelector, Options, WarehouseList, WarehouseText, Popup, PopupItem
} from './MainNavigation.styles';
import { Flex, Box } from '../../styles/globalStyles.styles';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { getWarehouses, Warehouse } from './MainNavigationApi';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
function MainNavigation() {
    const [showWarehouses, setShowWarehouses] = useState(false);
    const { keycloak, initialized } = useKeycloak();
    const [cookies, setCookie] = useCookies(["warehouseId", "warehouseName"]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [showProductPopup, setShowProductPopup] = useState(false);
    const [showWarehousePopup, setShowWarehousePopup] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchWarehouses = async () => {
            const fetchedWarehouses = await getWarehouses(keycloak.token);
            console.log(fetchedWarehouses);
            setWarehouses(fetchedWarehouses);
        };
        fetchWarehouses();
    }, []);
    const toggleProductPopup = () => setShowProductPopup(!showProductPopup);
    const toggleWarehousePopup = () => setShowWarehousePopup(!showWarehousePopup);
    const toggleProfilePopup = () => setShowProfilePopup(!showProfilePopup);
    const handleMouseLeave = () => {
        setShowWarehouses(false)
    }
    const setChangeChoosenWarehouse = (warehouseId: string, warehouseName: string) => {
        setCookie("warehouseId", warehouseId);
        setCookie("warehouseName", warehouseName);
        window.location.reload();
    }
    return (<Background direction="column">
        <Header>
            <LogoContainer direction='row' align="center">
                A<Logo>warehouse</Logo>
            </LogoContainer>
            <Options>
                <SelectionContainer>
                    <Line />
                    <ViewOption>
                        product
                        <ArrowDownImage src="/arrow-down.svg" alt="arrow down" onClick={toggleProductPopup}></ArrowDownImage>
                    </ViewOption>
                    {showProductPopup && <Popup onMouseLeave={toggleProductPopup}>
                        <PopupItem onClick={()=>navigate('/product')}>manage</PopupItem>
                        <PopupItem onClick={()=>navigate('/warehouse/product')}>show by tier</PopupItem>
                    </Popup>}
                </SelectionContainer>
                <SelectionContainer>
                    <Line />
                    <ViewOption>
                        warehouse
                        <ArrowDownImage src="/arrow-down.svg" alt="arrow down" onClick={toggleWarehousePopup}></ArrowDownImage>
                    </ViewOption>
                    {showWarehousePopup && <Popup onMouseLeave={toggleWarehousePopup}>
                        <PopupItem onClick={()=>navigate('/warehouse')}>manage</PopupItem>
                        <PopupItem onClick={()=>navigate('/token')}>token</PopupItem>
                        <PopupItem onClick={()=>navigate('/group')}>groups</PopupItem>
                    </Popup>}
                </SelectionContainer>
                <SelectionContainer>
                    <Line />
                    <ViewOption>
                        profile
                        <ArrowDownImage src="/arrow-down.svg" alt="arrow down" onClick={toggleProfilePopup}></ArrowDownImage>
                    </ViewOption>
                    {showProfilePopup && <Popup onMouseLeave={toggleProfilePopup}>
                        <PopupItem  onClick={()=>navigate('/report')}>reports</PopupItem>
                        <PopupItem  onClick={() => keycloak.logout()}>logout</PopupItem>
                    </Popup>}
                </SelectionContainer>
            </Options>
            <ActualWarehouse direction='column'>
                <ActualText>
                    actual:
                </ActualText>
                <WarehouseSelector>
                    <div id="choosenWarehouse" onClick={() => { setShowWarehouses(!showWarehouses) }}>{cookies.warehouseName}<ArrowDownImage src="/arrow-down.svg" alt="arrow down" ></ArrowDownImage></div>
                    {showWarehouses && (
                        <WarehouseList onMouseLeave={handleMouseLeave}>
                            {
                                warehouses.map((warehouse) => (
                                    <WarehouseText key={warehouse.id} onClick={() => { setChangeChoosenWarehouse(warehouse.id, warehouse.name) }}>{warehouse.name}</WarehouseText>
                                ))}
                        </WarehouseList>
                    )}
                </WarehouseSelector>
            </ActualWarehouse>

        </Header>
    </Background>)
}

export default MainNavigation;