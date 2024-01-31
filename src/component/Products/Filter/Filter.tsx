import {
  FilterButton, SelectedFilterText, ChoosenFilter, CancelImage, ModalContainer, Modal, FilterText, FilterOptions, FilterInput, ClearButton, DoneButton, FilterOptionMark, Checkbox, SortContainer
} from './Filter.styles';
import { Flex, Image } from '../../../styles/globalStyles.styles';
import { useState, useEffect } from 'react';

function Filter() {
  const [isOpen, setOpen] = useState(false);
  const [sortId, setSortId] = useState('');
  const [sortTypeId, setSortTypeId] = useState('down');
  const [sortWarehouse, setSortWarehouse] = useState('');
  const [sortTypeWarehouse, setSortTypeWarehouse] = useState('down');
  const [sortRow, setSortRow] = useState('');
  const [sortTypeRow, setSortTypeRow] = useState('down');
  const [sortShelf, setSortShelf] = useState('');
  const [sortTypeShelf, setSortTypeShelf] = useState('down');
  const [sortTier, setSortTier] = useState('');
  const [sortTypeTier, setSortTypeTier] = useState('down');
  const [sortName, setSortName] = useState('');
  const [sortTypeName, setSortTypeName] = useState('down');
  const [sortAmount, setSortAmount] = useState('');
  const [sortTypeAmount, setSortTypeAmount] = useState('down');
  const [sortPrice, setSortPrice] = useState('');
  const [sortTypePrice, setSortTypePrice] = useState('down');

  const handleSortToggle = () => {
    console.log('sort');
    setSortTypeId((prevSortTypeId) => (prevSortTypeId === 'down' ? 'up' : 'down'));
  };

  return <Flex align="center" marginTop="2em" gap="1.5em">
    <FilterButton onClick={() => setOpen(!isOpen)}>
      <Image src="/filter.svg" alt="add warehouse" width="1.2em"></Image>
      FILTER & SORT</FilterButton>
    <SelectedFilterText>selected filters:</SelectedFilterText>
    <ChoosenFilter>row: 3
      <CancelImage src="/cancel.svg" alt="add warehouse"></CancelImage>
    </ChoosenFilter>
    <ChoosenFilter>row: 3
      <CancelImage src="/cancel.svg" alt="add warehouse"></CancelImage>
    </ChoosenFilter>
    <ChoosenFilter>row: 3
      <CancelImage src="/cancel.svg" alt="add warehouse"></CancelImage>
    </ChoosenFilter>
    {isOpen && (
      <ModalContainer>
        <Modal>
          <Flex justify='flex-end' marginTop='2em' marginRight='3em' width="100%">
            <CancelImage src="/cancel.svg" alt="add warehouse"  onClick={() => setOpen(false)}></CancelImage>
          </Flex>
          <FilterText>FILTER & SORT</FilterText>
          <Flex direction='column' width='70%' align='center'>
          <FilterOptionMark>filter</FilterOptionMark>
          <Flex width="100%"  marginTop="2em" marginBottom='0.5em'>
            <FilterOptions>id</FilterOptions>
            </Flex>
            <FilterInput></FilterInput>
            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>warehouse</FilterOptions>
            </Flex>
            <FilterInput></FilterInput>
            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>row</FilterOptions>
            </Flex>
            <FilterInput></FilterInput>
            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>shelf</FilterOptions>
            </Flex>
            <FilterInput></FilterInput>
            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>tier</FilterOptions>
            </Flex>
            <FilterInput></FilterInput>
            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>name</FilterOptions>
            </Flex>
            <FilterInput></FilterInput>
            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>amount</FilterOptions>
            </Flex>
            <FilterInput></FilterInput>
            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>price</FilterOptions>
            </Flex>
            <FilterInput></FilterInput>
            <FilterOptionMark>sort by</FilterOptionMark>
            <SortContainer>
              <Flex>id <Checkbox type="checkbox"/> <Image src={`/${sortTypeId}.svg`}  alt="down" width="1.2em" onClick={()=>setSortTypeId((prev) => (prev === 'down' ? 'up' : 'down'))}></Image></Flex>
              <Flex>warehouse <Checkbox type="checkbox"/>  <Image src={`/${sortTypeWarehouse}.svg`} alt="down" width="1.2em" onClick={()=>setSortTypeWarehouse((prev) => (prev === 'down' ? 'up' : 'down'))}></Image></Flex>
              <Flex>row <Checkbox type="checkbox"/>  <Image src={`/${sortTypeRow}.svg`} alt="down" width="1.2em" onClick={()=>setSortTypeRow((prev) => (prev === 'down' ? 'up' : 'down'))}></Image></Flex>
              <Flex>shelf <Checkbox type="checkbox"/> <Image src={`/${sortTypeShelf}.svg`} alt="down" width="1.2em" onClick={()=>setSortTypeShelf((prev) => (prev === 'down' ? 'up' : 'down'))}></Image> </Flex>
              <Flex>tier <Checkbox type="checkbox"/>  <Image src={`/${sortTypeTier}.svg`} alt="down" width="1.2em" onClick={()=>setSortTypeTier((prev) => (prev === 'down' ? 'up' : 'down'))}></Image></Flex>
              <Flex>name <Checkbox type="checkbox"/> <Image src={`/${sortTypeName}.svg`} alt="down" width="1.2em" onClick={()=>setSortTypeName((prev) => (prev === 'down' ? 'up' : 'down'))}></Image></Flex>
              <Flex>amount <Checkbox type="checkbox"/>  <Image src={`/${sortTypeAmount}.svg`} alt="down" width="1.2em" onClick={()=>setSortTypeAmount((prev) => (prev === 'down' ? 'up' : 'down'))}></Image></Flex>
              <Flex>price <Checkbox type="checkbox"/>  <Image src={`/${sortTypePrice}.svg`} alt="down" width="1.2em" onClick={()=>setSortTypePrice((prev) => (prev === 'down' ? 'up' : 'down'))}></Image></Flex>
            </SortContainer>
          </Flex>
          <Flex justify='center' gap="3em" width="70%" marginTop="2em" marginBottom="3em">
          <ClearButton>CLEAR FILTERS</ClearButton>
          <DoneButton>DONE</DoneButton>
          </Flex>
        </Modal>
      </ModalContainer>)}
  </Flex>
}
export default Filter;