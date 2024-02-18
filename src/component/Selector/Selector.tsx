import { SelectContainer, SelectHeader, SelectList, ListItem } from "./Selector.styles";
import { Flex, Image, Checkbox } from '../../styles/globalStyles.styles';
import { useState, useEffect} from 'react';
function Selector({ items, selected, setSelected }: { items: Map<string, string>,  selected :string[]|null,  setSelected: (item: string[]) => void}) {
  const [isListVisible, setListVisible] = useState(false);
  const [selectedCopy, setSelectedCopy] = useState<string []>([]);
useEffect(() => {
  console.log(items)
  console.log(selected)
  if(selected==null){
    const firstEntry = items.entries().next().value;
    setSelected(firstEntry);
    setSelectedCopy(firstEntry);
  }
  else{
    setSelectedCopy(selected);
  }
}, [items]);

  const handleItemClick = (item: string[]) => {
    setSelected(item);
    setSelectedCopy(item);
    setListVisible(false);
  };
  useEffect(() =>{
      console.log(selectedCopy);
  },[selectedCopy]);

  return (
    <SelectContainer onMouseLeave={() => setListVisible(false)}>
      <Flex justify="center" align="center" gap="0.5em">
        <SelectHeader onClick={() => setListVisible(!isListVisible)}>{selectedCopy ? selectedCopy[1] :""}</SelectHeader>
        <Image src="/arrow-down.svg" alt="down" width="1em" onClick={() => setListVisible(!isListVisible)} />
      </Flex>
      {isListVisible && (
        <SelectList >
          {Array.from(items.entries()).map(([key, value]) => (
            <ListItem key={key} onClick={() => handleItemClick([key, value])}>
              {value}
            </ListItem>
          ))}
        </SelectList>
      )}
    </SelectContainer>
  );
}

export default Selector;