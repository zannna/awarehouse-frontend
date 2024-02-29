
import { ProductsFromWarehouse, ShowProductFromText, AddWarehouseImage, ShowProductFromContainer, ProductWarehouseList, AddWarehouseContainer, Checkbox, GroupText, WarehouseText } from './ProductWarehouses.styles';
import { Flex } from '../../../styles/globalStyles.styles';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { getWarehouses, Warehouse,  getGroupsWithWarehouses, GroupWithWarehouses, Group} from '../ProductsApi';
import { useKeycloak } from '@react-keycloak/web';
function ProductWarehouse({selectedWarehouses, setSelectedWarehouses, selectedGroup, setSelectedGroup} : {selectedWarehouses: Warehouse[], setSelectedWarehouses: (warehouses: Warehouse[]) => void,
   selectedGroup: Group[], setSelectedGroup: (groups: Group[]) => void}) {
  const [showProductWarehouses, setShowProductWarehouses] = useState(false);
  const [cookies, setCookie] = useCookies(["warehouseId", "warehouseName"]);
  const [ warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [groupsWithWarehouses, setGroupsWithWatehouses] = useState<GroupWithWarehouses[]>([]);
  const { keycloak, initialized } = useKeycloak();
 
  useEffect(() => {
      const fetchGroups = async () => {
          const fetchedGroups= await getGroupsWithWarehouses(keycloak.token);
           console.log(fetchedGroups);
           setGroupsWithWatehouses(fetchedGroups);
        };
      fetchGroups();
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
      setSelectedWarehouses( [...selectedWarehouses,  { id: warehouseId, name: warehouseName }]);
    } else {
      setSelectedWarehouses(selectedWarehouses.filter(w => w.id !== warehouseId));
    }
  };

  const addGroupAndAllWarehouses = (group :Group, allWarehouses: Warehouse[], isChecked: boolean) => {
    if (isChecked) {
      const newWarehouses = allWarehouses.filter(warehouse => !selectedWarehouses.some(w => w.id === warehouse.id));
      setSelectedWarehouses([...selectedWarehouses, ...newWarehouses]);
      setSelectedGroup([...selectedGroup, group]);
    } else {
       setSelectedGroup(selectedGroup.filter(g => g.id !== group.id));
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
           {groupsWithWarehouses.map((groupWithWarehouses) => (
            <>
                  <GroupText key={groupWithWarehouses.group.id}>{groupWithWarehouses.group.name}<Checkbox type="checkbox" onClick={(e)=>addGroupAndAllWarehouses(groupWithWarehouses.group, groupWithWarehouses.warehouses, (e.target as HTMLInputElement).checked)}></Checkbox></GroupText>
                  {groupWithWarehouses.warehouses.map((warehouse) => ( 
                     <WarehouseText key={warehouse.id}>{warehouse.name}
                     <Checkbox type="checkbox" 
                      checked={selectedWarehouses.some(w => w.id === warehouse.id)}
                      onChange={(e) => handleWarehouseSelection(warehouse.id, warehouse.name, e.target.checked)}
                      ></Checkbox></WarehouseText>

                  ))}
            </>))
}

      </ProductWarehouseList>      
}
    </AddWarehouseContainer>
  </ShowProductFromContainer>

}

export default ProductWarehouse;