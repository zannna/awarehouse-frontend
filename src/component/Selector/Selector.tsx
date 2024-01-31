import { SelectContainer, SelectHeader, SelectList, ListItem } from "./Selector.styles";
import { Flex, Image, Checkbox } from '../../styles/globalStyles.styles';
import { useState, useEffect} from 'react';
function Selector({ items, setSelected }: { items: Map<number, string>, setSelected: (item: string) => void}) {
  const [isListVisible, setListVisible] = useState(false);
  const firstEntry = items.entries().next().value;
  const firstValue = firstEntry ? firstEntry[1] : '';
  const [selectedItem, setSelectedItem] = useState( firstValue );

  const handleItemClick = (item: string) => {
    setSelected(item);
    setListVisible(false);
  };

  return (
    <SelectContainer onMouseLeave={() => setListVisible(false)}>
      <Flex justify="center" align="center" gap="0.5em">
        <SelectHeader onClick={() => setListVisible(!isListVisible)}>{selectedItem}</SelectHeader>
        <Image src="/arrow-down.svg" alt="down" width="1em" onClick={() => setListVisible(!isListVisible)} />
      </Flex>
      {isListVisible && (
        <SelectList >
          {Array.from(items.entries()).map(([key, value]) => (
            <ListItem key={key} onClick={() => handleItemClick(value)}>
              {value}
            </ListItem>
          ))}
        </SelectList>
      )}
    </SelectContainer>
  );
}

export default Selector;