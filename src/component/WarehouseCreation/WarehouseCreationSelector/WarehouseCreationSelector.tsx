import { SelectContainer, SelectHeader, SelectList, ListItem, GroupContainer, Input } from "./WarehouseCreationSelector.styles";
import { Flex, Image, Checkbox, Text } from '../../../styles/globalStyles.styles';
import { useState, useEffect} from 'react';
import { GroupData,  createGroup } from '../WarehouseCreationApi';
import { useKeycloak } from "@react-keycloak/web";
import { useRef } from "react";
function Selector({ selectorId , initialItems,  onSelectedItemChange: onSelectedGroupChange}: { selectorId :string, initialItems: GroupData[],   onSelectedItemChange :  (selectorId :string, item: GroupData) => void}) {
  const [items, setItems] = useState<GroupData[]>(initialItems);
  const [isListVisible, setListVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GroupData>();
  const [showGroupCreation, setShowGroupCreation]  = useState(false);
  const [groupName, setGroupName] = useState("");
  const { keycloak, initialized } = useKeycloak();
  const handleItemClick = (item: GroupData) => {
    setSelectedItem(item);
    setListVisible(false);
    onSelectedGroupChange(selectorId, item);
  };

   const groupContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event :any) => {
      if (groupContainerRef.current && !groupContainerRef.current.contains(event.target)) {
        setShowGroupCreation(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }});
    
    async function sendCreateGroupRequest(){
      const newGroup= await createGroup(groupName, keycloak.token); 
      console.log(newGroup);
      setItems(currentItems => [...currentItems, newGroup]);
      setSelectedItem(newGroup);
      setShowGroupCreation(false);
      onSelectedGroupChange(selectorId, newGroup);
    }

  return ( 
    <SelectContainer onMouseLeave={() => setListVisible(false)}>
      <Flex justify="center" align="center" gap="0.5em">
        <SelectHeader onClick={() => setListVisible(!isListVisible)}>
        {selectedItem !=null ? selectedItem.name  : null}
          </SelectHeader>
        <Image src="/arrow-down.svg" alt="down" width="1em" onClick={() => setListVisible(!isListVisible)} />
      </Flex>
      {(isListVisible || showGroupCreation) && (
      <SelectList>
        {items.map((item) => (
          <ListItem key={item.id} onClick={() => handleItemClick(item)}>
            {item.name}
          </ListItem>
        ))}
        <ListItem>
          <Flex gap='0.5em' align="center" width="wrap-content">
            <Text>add group</Text>
            <Image src="/square-add.svg" alt="down" width="1.1em" opacity='70%' onClick={() => setShowGroupCreation(true)} />
          </Flex>
          {showGroupCreation && (
            <GroupContainer ref={groupContainerRef}>
              name: <Input isValid={true}  onChange={event => setGroupName(event.target.value)}></Input>
              <Image src="/cancel.svg" alt="down" width="0.9em" opacity='60%' onClick={() => setShowGroupCreation(!showGroupCreation)} />
              <Image src="/accept.svg" alt="down" width="1.3em" opacity='100%' onClick={() =>  sendCreateGroupRequest()} />
            </GroupContainer>
          )}
        </ListItem>
      </SelectList>
      )
}
    </SelectContainer>
  
  );
}

export default Selector;