import { Background, Header, LogoContainer, Logo, Line, ViewOption, ArrowDownImage, ActualWarehouse, ActualText, WarehouseSelector, Options,  WarehouseList } from './MainNavigation.styles';
import { Flex } from '../../styles/globalStyles.styles';
import { useState, useEffect } from 'react';
function MainNavigation() {
    const [showWarehouses, setShowWarehouses] = useState(false);
    const handleMouseLeave = () => {
        setShowWarehouses(false)
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
                    <div id="choosenWarehouse" onClick={()=>{setShowWarehouses(!showWarehouses)}}>Warehouse 1 <ArrowDownImage src="/arrow-down.svg" alt="arrow down" ></ArrowDownImage></div>
                    {showWarehouses && < WarehouseList  onMouseLeave={handleMouseLeave}>
                        <div> group1 </div>
                        <div>Warehouse 2</div>
                        <div>Warehouse 3</div>
                        <div>Warehouse 4</div>
                        </ WarehouseList >
                        }
                </WarehouseSelector>
            </ActualWarehouse>
         
     </Header>
    </Background>)
}

export default  MainNavigation;