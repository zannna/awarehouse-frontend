
import { ProductsFromWarehouse, ShowProductFromText, AddWarehouseImage, ShowProductFromContainer, ProductWarehouseList, AddWarehouseContainer, Checkbox, GroupText, WarehouseText } from './ProductWarehouses.styles';
import { Flex } from '../../../styles/globalStyles.styles';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { getWarehouses, Warehouse } from '../ProductsApi';
import { useKeycloak } from '@react-keycloak/web';
function ProductWarehouse() {
  const [showProductWarehouses, setShowProductWarehouses] = useState(false);
  const [cookies, setCookie] = useCookies(["warehouseId", "warehouseName"]);
  const [ warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [ selectedWarehouses, setSelectedWarehouses] = useState<Warehouse[]>([{ id: cookies.warehouseId, name: cookies.warehouseName }]);
  const { keycloak, initialized } = useKeycloak();
  useEffect(() => {
      const fetchWarehouses = async () => {
          const fetchedWarehouses= await  getWarehouses(keycloak.token);
           console.log(fetchedWarehouses);
          setWarehouses(fetchedWarehouses);
        };
      fetchWarehouses();
  },[]);

  useEffect(() => {
    console.log(selectedWarehouses);
  },[selectedWarehouses]);

  const productsWarehousesList = [
    { id: cookies.warehouseId, name: cookies.warehouseName },
  ];

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowProductWarehouses(false);
    }, 500);
  }

  const handleWarehouseSelection = (warehouseId: string, warehouseName :string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedWarehouses(prev => [...prev,  { id: warehouseId, name: warehouseName }]);
    } else {
      setSelectedWarehouses(prev => prev.filter(w => w.id !== warehouseId));
    }
  };

  return <ShowProductFromContainer align="center">
    <ShowProductFromText> SHOW PRODUCTS FROM:</ShowProductFromText>
    { selectedWarehouses.map((w) => (
      <ProductsFromWarehouse>
        {w.name}
      </ProductsFromWarehouse >
    ))}
    < AddWarehouseContainer>
      <AddWarehouseImage src="/add.svg" alt="add warehouse" onClick={() => { setShowProductWarehouses(!showProductWarehouses) }}></AddWarehouseImage>
      {showProductWarehouses && 
      <ProductWarehouseList onMouseLeave={handleMouseLeave}>
          {warehouses.map((warehouse) => (
            <WarehouseText key={warehouse.id}>
              {warehouse.name}  
              <Checkbox type="checkbox"  
                checked={selectedWarehouses.some(w => w.id === warehouse.id)}
                onChange={(e) => handleWarehouseSelection(warehouse.id, warehouse.name, e.target.checked)}>
              </Checkbox>
            </WarehouseText>
        ))}
      </ProductWarehouseList>      
      // <ProductWarehouseList onMouseLeave={handleMouseLeave}>
      //   <GroupText>group 1  <Checkbox type="checkbox" ></Checkbox></GroupText>
      //   <WarehouseText><span>Warehouse 2</span><Checkbox type="checkbox" ></Checkbox></WarehouseText>
      //   <WarehouseText>Warehouse 3 <Checkbox type="checkbox" ></Checkbox></WarehouseText>
      //   <GroupText>group 2  <Checkbox type="checkbox" ></Checkbox></GroupText>
      //   <WarehouseText>Warehouse 4 <Checkbox type="checkbox" ></Checkbox></WarehouseText>
      // </ ProductWarehouseList >
    //   <ProductWarehouseList onMouseLeave={handleMouseLeave}>
    //     <WarehouseText><span>Warehouse 2</span><Checkbox type="checkbox" ></Checkbox></WarehouseText>
    //     <WarehouseText>Warehouse 3 <Checkbox type="checkbox" ></Checkbox></WarehouseText>
    //     <WarehouseText>Warehouse 4 <Checkbox type="checkbox" ></Checkbox></WarehouseText>
    // </ ProductWarehouseList >
      }
    </AddWarehouseContainer>
  </ShowProductFromContainer>

}

export default ProductWarehouse;