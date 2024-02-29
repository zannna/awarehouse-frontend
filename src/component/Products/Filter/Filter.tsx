import {
  FilterButton, SelectedFilterText, ChoosenFilter, CancelImage, ModalContainer, Modal, FilterText, FilterOptions, FilterInput, ClearButton, DoneButton, FilterOptionMark, Checkbox, SortContainer
} from './Filter.styles';
import { Flex, Image, Text } from '../../../styles/globalStyles.styles';
import { useState, useEffect } from 'react';

function Filter({ updateSearch, updateSearchConditions, sortConditions, setSortConditions }: {
  updateSearch: { [key: string]: string }, updateSearchConditions: (key: string, value: string) => void,
  sortConditions: { [key: string]: string }, setSortConditions: (sortConditions: { [key: string]: string }) => void}){
  const [isOpen, setOpen] = useState(false);
  const [sortConditionsList, setSortConditionsList] = useState<string[]>([]);

  useEffect(() => {
    setSortConditionsList(Object.keys(sortConditions));
  },[]);
  
  const setFilter = () => {
    Object.entries(searchInputs).forEach(([key, value]) => {
      if (value) {
        updateSearchConditions(key, value);
      }
    });
    
    const newSortConditions = sortConditionsList.reduce((acc: { [key: string]: string }, field) => {
      const direction = sortDirections[field];
      if (direction) {
        acc[field] = direction;
      }
      return acc;
    }, {});
    setSortConditions(newSortConditions);

    setOpen(false);
  }
  
  const [searchInputs, setSearchInputs] = useState({
    id: updateSearch.id || '',
    group: updateSearch.group || '',
    row: updateSearch.row || '',
    shelf: updateSearch.shelf || '',
    tier: updateSearch.tier || '',
    name: updateSearch.name || '',
  });

  const [sortDirections, setSortDirections] = useState<{ [key: string]: string }>({
    id: sortConditions.id || 'desc',
    warehouse: sortConditions.warehouse || 'desc',
    row: sortConditions.row || 'desc',
    shelf: sortConditions.shelf || 'desc',
    tier: sortConditions.tier || 'desc',
    name: sortConditions.name || 'desc',
    amount: sortConditions.amount || 'desc',
    price: sortConditions.price || 'desc',
  });

  const handleSearchInputChange = (key: string, value: string) => {
    setSearchInputs(prevInputs => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  const updateSortConditions = (field: string, isSorted: boolean, sortDirection: string) => {
    if (isSorted) {
      setSortConditionsList(prevList => {
        if (!prevList.includes(field)) {
          return [...prevList, field];
        }
        return prevList;
      });
    } else {
      setSortConditionsList(prevList => prevList.filter(key => key !== field));
    }
  };
  

  const updateSortDirection = (field :string) => {
    const sortDirection = sortDirections[field] === 'desc' ? 'asc' : 'desc';
    setSortDirections(prevInputs => ({
      ...prevInputs,
      [field]: sortDirection,
    }));
  }

  const removeSearchCondition = (key: string) => {
    delete updateSearch[key];
    handleSearchInputChange(key, '');
  };

  const removeSortCondition = (key: string) => {
    
    delete sortConditions[key];
    const { [key]: _, ...newConditions } = sortConditions;
    setSortConditions(newConditions);
    setSortConditionsList(prevList => prevList.filter(field => field !== key));
    console.log(sortConditionsList);
    console.log(sortConditions);
  };

  const renderSelectedSearchFilters = () => {
    return Object.entries(searchInputs).map(([key, value]) => {
      if (value) {
        return (
          <ChoosenFilter key={key}>
            {key}: {value}
            <CancelImage src="/cancel.svg" alt="remove filter" onClick={() => removeSearchCondition(key)} />
          </ChoosenFilter>
        );
      }
      return null;
    }).filter(component => component !== null); 
  };

  const renderSelectedSortFilters = () => {
    return Object.entries(sortConditionsList).map(([key, value]) => {
      if (value) {
        return (
          <ChoosenFilter key={key}>
           sorted by:&nbsp;&nbsp;
             {value}
            <CancelImage src="/cancel.svg" alt="remove filter" onClick={() =>  removeSortCondition(value)} />
          </ChoosenFilter>
        );
      }
      return null;
    }).filter(component => component !== null); 
  };


  return <Flex align="center" marginTop="2em" gap="1.5em">
    <FilterButton onClick={() => setOpen(!isOpen)}>
      <Image src="/filter.svg" alt="add warehouse" width="1.2em"></Image>
      FILTER & SORT</FilterButton>
    <SelectedFilterText>selected filters:</SelectedFilterText>
    {renderSelectedSearchFilters()} 
    {renderSelectedSortFilters()}
    {isOpen && (
      <ModalContainer>
        <Modal>
          <Flex justify='flex-end' marginTop='2em' marginRight='3em' width="100%">
            <CancelImage src="/cancel.svg" alt="add warehouse" onClick={() => setOpen(false)}></CancelImage>
          </Flex>
          <FilterText>FILTER & SORT</FilterText>
          <Flex direction='column' width='70%' align='center'>
            <FilterOptionMark>filter</FilterOptionMark>
            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>id</FilterOptions>
            </Flex>
            <FilterInput value={searchInputs.id} onChange={(e) => handleSearchInputChange('id', e.target.value)} />
            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>group</FilterOptions>
            </Flex>
            <FilterInput value={searchInputs.group || ''} onChange={(e) => handleSearchInputChange('group', e.target.value)} />

            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>row</FilterOptions>
            </Flex>
            <FilterInput value={searchInputs.row || ''} onChange={(e) => handleSearchInputChange('row', e.target.value)} />

            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>shelf</FilterOptions>
            </Flex>
            <FilterInput value={searchInputs.shelf || ''} onChange={(e) => handleSearchInputChange('shelf', e.target.value)} />
            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>tier</FilterOptions>
            </Flex>
            <FilterInput value={searchInputs.tier || ''} onChange={(e) => handleSearchInputChange('tier', e.target.value)} />
            <Flex width="100%" marginTop="2em" marginBottom='0.5em'>
              <FilterOptions>name</FilterOptions>
            </Flex>
            <FilterInput value={searchInputs.name || ''} onChange={(e) => handleSearchInputChange('name', e.target.value)} />
            <FilterOptionMark>sort by</FilterOptionMark>
            <SortContainer>
              <Flex>id
                <Checkbox type="checkbox" checked={sortConditionsList.includes('id')} onChange={(e) => updateSortConditions('id', e.target.checked,  sortDirections.id)} />
                <Image src={`/${sortDirections.id}.svg`} alt="down" width="1.2em" onClick={() =>  updateSortDirection('id')}></Image>
              </Flex>
              <Flex>warehouse
                <Checkbox type="checkbox" checked={sortConditionsList.includes('warehouse')}  onChange={(e) => updateSortConditions('warehouse', e.target.checked,  sortDirections.warehouse)}/>
                <Image src={`/${sortDirections.warehouse}.svg`} alt="down" width="1.2em" onClick={() => updateSortDirection('warehouse')}></Image>
              </Flex>
              <Flex>row
                <Checkbox type="checkbox"  checked={sortConditionsList.includes('row')}  onChange={(e) => updateSortConditions('row', e.target.checked,  sortDirections.row)}/>
                <Image src={`/${sortDirections.row}.svg`} alt="down" width="1.2em" onClick={() => updateSortDirection('row')}></Image>
              </Flex>
              <Flex>shelf 
                <Checkbox type="checkbox"  checked={sortConditionsList.includes('shelf')}  onChange={(e) => updateSortConditions('shelf', e.target.checked, sortDirections.shelf)}/> 
                <Image src={`/${sortDirections.shelf}.svg`} alt="down" width="1.2em" onClick={() => updateSortDirection('shelf')}></Image> 
              </Flex>
              <Flex>tier 
                <Checkbox type="checkbox"  checked={sortConditionsList.includes('tier')}  onChange={(e) => updateSortConditions('tier', e.target.checked, sortDirections.tier)}/>  
                <Image src={`/${sortDirections.tier}.svg`} alt="down" width="1.2em" onClick={() => updateSortDirection('tier')}></Image>
              </Flex>
              <Flex>name 
                <Checkbox type="checkbox"  checked={sortConditionsList.includes('name')}  onChange={(e) => updateSortConditions('name', e.target.checked, sortDirections.name)}/> 
                <Image src={`/${sortDirections.name}.svg`} alt="down" width="1.2em" onClick={() => updateSortDirection('name')}></Image>
              </Flex>
              <Flex>amount 
                <Checkbox type="checkbox"  checked={sortConditionsList.includes('amount')}  onChange={(e) => updateSortConditions('amount', e.target.checked, sortDirections.amount)}/>  
                <Image src={`/${sortDirections.amount}.svg`} alt="down" width="1.2em" onClick={() => updateSortDirection('amount')}></Image>
              </Flex>
              <Flex>price 
                <Checkbox type="checkbox"  checked={sortConditionsList.includes('price')}  onChange={(e) => updateSortConditions('price', e.target.checked, sortDirections.price)}/>  
                <Image src={`/${sortDirections.price}.svg`} alt="down" width="1.2em" onClick={() => updateSortDirection('price')}></Image>
              </Flex>
            </SortContainer>
          </Flex>
          <Flex justify='center' gap="3em" width="70%" marginTop="2em" marginBottom="3em">
            <ClearButton>CLEAR FILTERS</ClearButton>
            <DoneButton onClick={() => setFilter()}>DONE</DoneButton>
          </Flex>
        </Modal>
      </ModalContainer>)}
  </Flex>
}
export default Filter;