
import MainNavigation from '../../Header/MainNavigation';
//   import ProductWarehouse from './ProductWarehouses/ProductWarehouses'
import { Flex, Image, Checkbox } from '../../../styles/globalStyles.styles';
import Selection from '../Selection/Selection';
import Filter from '../Filter/Filter';
import { Background, RowText, ShelvesText, ShelfContainer, ShelfTable, FirstLineText, ShelfText} from './ProductsInWarehouse.styles'
import { useState, useEffect} from 'react';
import ShelfAccordion from './ProductInShelfAccordion/ProductsInShelfAccordion';
import { Product } from '../../../types/types';
function ProductsInWarehouse() {
  const [showCreationBox, setShowCreationBox] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const handleCheckboxChange = (product: Product) => {
    console.log(product)
    const isProductSelected = selectedProducts.some(selectedProduct => selectedProduct.id === product.id)
    if (isProductSelected) {
      setSelectedProducts(selectedProducts.filter(selectedProduct => selectedProduct.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };
  useEffect(() => {
    console.log(selectedProducts)
  }, selectedProducts) 
  return (
    <ShelfTable>
      <Background>
        <MainNavigation />
        <Filter />
        <Flex justify="space-between" width="100%" marginTop='4em' marginBottom='1em'>
          <Selection products={selectedProducts} ></Selection>
        </Flex>
        <RowText>Row I</RowText>
        <ShelvesText>shelves:</ShelvesText>
        <ShelfTable>
        <ShelfContainer background="#EBEBEB">
          <FirstLineText>No.1</FirstLineText>
          <FirstLineText>underwear</FirstLineText>
          <FirstLineText>free place: <Image src="/ok.svg" alt="move" width="1em" opacity="100%"></Image></FirstLineText>
          <Checkbox type="checkbox" place="end" gridArea='options' onChange={() => handleCheckboxChange({
          id: '1',
          name: 'Example Product',
          amount: '500',
          photo: 'example.jpg',
          warehouse: 'warehouse',
          row: 'row',
          shelf: 'shelf',
          tier: 'tier'
        })}></Checkbox>
        </ShelfContainer>
        <ShelfAccordion selectedProducts={selectedProducts}  setSelectedProducts={ setSelectedProducts}></ShelfAccordion>
        <ShelfContainer background="#b0bfc942">
          <FirstLineText>No.1</FirstLineText>
          <FirstLineText>underwear</FirstLineText>
          <FirstLineText>free place: <Image src="/ok.svg" alt="move" width="1em" opacity="100%"></Image></FirstLineText>
          <Checkbox type="checkbox" place="end" gridArea='options' onChange={() => handleCheckboxChange({
          id: '1',
          name: 'Example Product',
          amount: '500',
          photo: 'example.jpg',
          warehouse: 'warehouse',
          row: 'row',
          shelf: 'shelf',
          tier: 'tier'
        })}></Checkbox>
        </ShelfContainer>
        <ShelfAccordion selectedProducts={selectedProducts}  setSelectedProducts={ setSelectedProducts}></ShelfAccordion>
        <ShelfAccordion selectedProducts={selectedProducts}  setSelectedProducts={ setSelectedProducts}></ShelfAccordion>
        </ShelfTable>
      </Background>
    </ShelfTable>
  )
}

export default ProductsInWarehouse;