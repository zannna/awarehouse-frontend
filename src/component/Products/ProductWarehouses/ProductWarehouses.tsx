
import { ProductsFromWarehouse, ShowProductFromText, PopupText, AddWarehouseImage, ShowProductFromContainer, ProductWarehouseList, AddWarehouseContainer, Checkbox, GroupText, WarehouseText } from './ProductWarehouses.styles';
import { Flex} from '../../../styles/globalStyles.styles';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import {Warehouse, getGroupsAndWarehouses, Group, GroupsAndWarehouses } from '../ProductsApi';
import { useKeycloak } from '@react-keycloak/web';
function ProductWarehouse({ selectedWarehouses, setSelectedWarehouses, selectedGroup, setSelectedGroup, setActualPage }: {
  selectedWarehouses: Warehouse[], setSelectedWarehouses: (warehouses: Warehouse[]) => void,
  selectedGroup: Group[], setSelectedGroup: (groups: Group[]) => void,
  setActualPage: (page: number) => void
}) {
  const [showProductWarehouses, setShowProductWarehouses] = useState(false);
  const [cookies, setCookie] = useCookies(["warehouseId", "warehouseName"]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [groupsAndWarehouses, setGroupsAndWarehouses] = useState<GroupsAndWarehouses>();
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    const fetchGroups = async () => {
      const fetchedGroups = await getGroupsAndWarehouses(keycloak.token);
      console.log(fetchedGroups);
      setGroupsAndWarehouses(fetchedGroups);
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    console.log(selectedWarehouses);
  }, [selectedWarehouses]);

  const productsWarehousesList = [
    { id: cookies.warehouseId, name: cookies.warehouseName },
  ];

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowProductWarehouses(false);
    }, 500);
  }

  const handleWarehouseSelection = (warehouseId: string, warehouseName: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedWarehouses([...selectedWarehouses, { id: warehouseId, name: warehouseName }]);
      setActualPage(0);
    } else {
      setSelectedWarehouses(selectedWarehouses.filter(w => w.id !== warehouseId));
    }
  };

  const addGroup = (group: Group, isChecked: boolean) => {
    if (isChecked) {
      setSelectedGroup([...selectedGroup, group]);
      setActualPage(0);
    } else {
      setSelectedGroup(selectedGroup.filter(g => g.id !== group.id));
    }
  };

  return <ShowProductFromContainer align="center">
    <ShowProductFromText> SHOW PRODUCTS FROM:</ShowProductFromText>
    {selectedWarehouses.map((w) => (
      <ProductsFromWarehouse>
        {w.name}
      </ProductsFromWarehouse >
    ))}
    {selectedGroup.map((g) => (
      <ProductsFromWarehouse>
        {g.name}
      </ProductsFromWarehouse >
    ))}
    < AddWarehouseContainer>
      <AddWarehouseImage src="/add.svg" alt="add warehouse" onClick={() => { setShowProductWarehouses(!showProductWarehouses) }}></AddWarehouseImage>
      {showProductWarehouses &&
        <ProductWarehouseList onMouseLeave={handleMouseLeave}>
          <Flex justify='center' marginBottom='1em'>
            warehouses
          </Flex>
          {groupsAndWarehouses?.warehousesWithoutGroup?.map(warehouse => (
            <WarehouseText key={warehouse.id}>
              {warehouse.name}
              <Checkbox
                type="checkbox"
                checked={selectedWarehouses.some(w => w.id === warehouse.id)}
                onChange={(e) => handleWarehouseSelection(warehouse.id, warehouse.name, e.target.checked)}
              ></Checkbox>
            </WarehouseText>
          ))}
          {groupsAndWarehouses?.groupWithWarehouses?.map(groupWithWarehouses => (
            <div key={groupWithWarehouses.group.id}>
              {groupWithWarehouses.warehouses.length > 0 && (
                <GroupText>{groupWithWarehouses.group.name}</GroupText>
              )}
              {groupWithWarehouses.warehouses.map(warehouse => (
                <WarehouseText key={warehouse.id}>
                  {warehouse.name}
                  <Checkbox
                    type="checkbox"
                    checked={selectedWarehouses.some(w => w.id === warehouse.id)}
                    onChange={(e) => handleWarehouseSelection(warehouse.id, warehouse.name, e.target.checked)}
                  ></Checkbox>
                </WarehouseText>
              ))}
            </div>
          ))}
          <Flex justify='center' marginTop='2em'>
            or groups
          </Flex>
          {groupsAndWarehouses?.groupWithWarehouses?.map((groupWithWarehouses) => (
            <PopupText key={groupWithWarehouses.group.id}>
              {groupWithWarehouses.group.name}
              <Checkbox
                type="checkbox"
                checked={selectedGroup.some(g => g.id === groupWithWarehouses.group.id)}
                onChange={(e) => addGroup(groupWithWarehouses.group, e.target.checked)}
              />
            </PopupText>
          ))}
        </ProductWarehouseList>
      }
    </AddWarehouseContainer>
  </ShowProductFromContainer>

}

export default ProductWarehouse;