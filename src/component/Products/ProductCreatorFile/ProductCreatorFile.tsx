import { Flex, Background, Text, Image } from '../../../styles/globalStyles.styles';
import { useState } from 'react';
import Selector from '../../Selector/Selector';
import { useKeycloak } from '@react-keycloak/web';
function ProductCreatorFile() {
    const { keycloak, initialized } = useKeycloak();
    const [selectedGroup, setSelectedGroup] = useState<string[]>([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState<string[]>([]);
    const [groups, setGroups] = useState<Map<string, string>>(new Map());
    const [warehouses, setWarehouses] = useState<Map<string, string>>(new Map());
    const [selectedScope, setSelectedScope] = useState<string>("group");
    const handleScopeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedScope(event.target.value);
    };
    
  return (
    <Flex direction='column' width='100%' gap='0.5em'>
    <Flex gap='1em' align='center'>
        <input type='radio'
            value="group"
            checked={selectedScope === "group"}
            onChange={handleScopeChange}
        ></input> group
        {selectedScope === "group" &&
            <Selector items={groups} setSelected={setSelectedGroup} selected={selectedGroup}></Selector>
        }
    </Flex>
    <Flex gap='1em' align='center'>
        <input type='radio'
            value="warehouse"
            checked={selectedScope === "warehouse"}
            onChange={handleScopeChange}
        ></input> warehouse
        {selectedScope === "warehouse" &&
            <Selector items={warehouses} setSelected={setSelectedWarehouse} selected={selectedWarehouse}></Selector>
        }
    </Flex>
</Flex>
  );
}
export default ProductCreatorFile;