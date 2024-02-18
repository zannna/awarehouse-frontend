import {
  AmountCell, Background, PhotoCell, ProductsTable, ProductTr, RowCell, IdCell, WarehouseCell, ShelfCell, TierCell, NameCell, PriceCell, FirstIdCell,
  FirstWarehouseCell, FirstBaseCell,  FirstNameCell, FirstAmountCell, FirstPhotoCell, FirstPriceCell, FirstRowCell, FirstShelfCell, FirstTierCell, MarkCell, AddWarehouseImage, BaseCell
} from './ProductsPage.styles';
import MainNavigation from '../Header/MainNavigation';
import ProductWarehouse from './ProductWarehouses/ProductWarehouses'
import Selection from './Selection/Selection';
import ProductCreator from './ProductCreator/ProductCreator';
import { Flex, Image, GreenText, SmallText, Line, SmallLine, Checkbox} from '../../styles/globalStyles.styles';
import Filter from './Filter/Filter';
import { useState, useEffect } from 'react';
import { Product } from '../../types/types';
import { useKeycloak } from '@react-keycloak/web';
function Products() {
  const [showProductCreator, setShowProductCreator] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const { keycloak, initialized } = useKeycloak();
  
  const handleCheckboxChange = (product: Product) => {
    const isProductSelected = selectedProducts.some(selectedProduct => selectedProduct.id === product.id)
    if (isProductSelected) {
      setSelectedProducts(selectedProducts.filter(selectedProduct => selectedProduct.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };


  return (<Background>
    <MainNavigation />
    <ProductWarehouse />
    <Filter/>
    <Flex justify="space-between" width="100%" marginTop='4em' marginBottom='1em'>
      <Flex align="center">
        <Image src="/add.svg" alt="add warehouse" width="1.2em"></Image>
        <GreenText> add new</GreenText>
        <Line />
        <Image src="/pointer.svg" alt="pointer" width="0.8em" opacity="0.8"></Image>
        <SmallText onClick={() => { setShowProductCreator(true) }}>manually</SmallText>
        <SmallLine />
        <Image src="/file.svg" alt="file" width="1em" opacity="0.4"></Image>
        <SmallText>from file</SmallText>
        <SmallLine />
        <Image src="/website.svg" alt="website" width="1em"></Image>
        <SmallText> from site</SmallText>
      </Flex>
      <Selection  products={selectedProducts} ></Selection>
    </Flex>
    <ProductsTable>
      <ProductTr>
        <FirstIdCell>id</FirstIdCell>
        <FirstWarehouseCell >warehouse</FirstWarehouseCell >
        <FirstRowCell>row</FirstRowCell>
        <FirstShelfCell>shelf</FirstShelfCell>
        <FirstTierCell>tier</FirstTierCell>
        <FirstPhotoCell>photo</FirstPhotoCell>
        <FirstNameCell>name</FirstNameCell>
        <FirstAmountCell>amount</FirstAmountCell>
        <FirstPriceCell>price</FirstPriceCell>
        <FirstBaseCell>size</FirstBaseCell>
        <MarkCell>mark</MarkCell>
      </ProductTr>

      <ProductTr>
        <IdCell>d69bcdec-ab14-11ee-a506-0242ac120002</IdCell>
        <WarehouseCell>Warehouse</WarehouseCell>
        <RowCell>Row</RowCell>
        <ShelfCell>Shelf</ShelfCell>
        <TierCell>Tier</TierCell>
        <PhotoCell>Photo</PhotoCell>
        <NameCell>Name</NameCell>
        <AmountCell>Amount</AmountCell>
        <PriceCell>Price</PriceCell>
        <BaseCell>5x6x7</BaseCell>
        <Checkbox type="checkbox" onChange={() => handleCheckboxChange({
          id: '1',
          name: 'Example Product',
          amount: '500',
          photo: 'example.jpg',
          warehouse: 'warehouse',
          row: 'row',
          shelf: 'shelf',
          tier: 'tier'
        })}></Checkbox>
      </ProductTr>
      <ProductTr>
        <IdCell>e7e9cd06-ab14-11ee-a506-0242ac120002</IdCell>
        <WarehouseCell>Warehouse</WarehouseCell>
        <RowCell>Row</RowCell>
        <ShelfCell>Shelf</ShelfCell>
        <TierCell>Tier</TierCell>
        <PhotoCell>Photo</PhotoCell>
        <NameCell>Name</NameCell>
        <AmountCell>Amount</AmountCell>
        <PriceCell>Price</PriceCell>
        <Checkbox type="checkbox" onChange={() => handleCheckboxChange({
          id: '1',
          name: 'Example Product',
          amount: '500',
          photo: 'example.jpg',
          warehouse: 'warehouse',
          row: 'row',
          shelf: 'shelf',
          tier: 'tier'
        })}></Checkbox>
      </ProductTr>
      {showProductCreator && <ProductCreator setShowProductCreator={setShowProductCreator}/> }
    </ProductsTable>
  </Background>)
}

export default Products;