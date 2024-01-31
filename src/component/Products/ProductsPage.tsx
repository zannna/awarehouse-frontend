import {
  AmountCell, Background, PhotoCell, ProductsTable, ProductTr, RowCell, IdCell, WarehouseCell, ShelfCell, TierCell, NameCell, PriceCell, FirstIdCell,
  FirstWarehouseCell, FirstNameCell, FirstAmountCell, FirstPhotoCell, FirstPriceCell, FirstRowCell, FirstShelfCell, FirstTierCell, MarkCell, AddWarehouseImage, CreationBox, CreationText, CreationInputContainer, CreationInput, ShortCreationInput, CreateButton, CancelButton
} from './ProductsPage.styles';
import MainNavigation from '../Header/MainNavigation';
import ProductWarehouse from './ProductWarehouses/ProductWarehouses'
import Selection from './Selection/Selection';
import { Flex, Image, GreenText, SmallText, Line, SmallLine, Checkbox } from '../../styles/globalStyles.styles';
import Filter from './Filter/Filter';
import { useState, useEffect } from 'react';
import { Product } from '../../types/types';
function Products() {
  const [showCreationBox, setShowCreationBox] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
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
        <SmallText onClick={() => { setShowCreationBox(true) }}>manually</SmallText>
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
      {showCreationBox &&
        <CreationBox>
          <CreationText> create product </CreationText>
          <CreationInputContainer>
            <Flex gap="5em">
              <Flex gap="1em">
                name
                <CreationInput></CreationInput>
              </Flex>
              <Flex>
                price
                <ShortCreationInput></ShortCreationInput>
              </Flex>
              <Flex>
                amount
                <ShortCreationInput></ShortCreationInput>
              </Flex>
            </Flex>
            <Flex gap="5em" width='100%' align='center' justify='center'>
              <Flex gap="1em"> warehouse
                <CreationInput></CreationInput></Flex>
              <Flex gap="1em">no. row
                <ShortCreationInput></ShortCreationInput></Flex>
              <Flex >no. shelf
                <ShortCreationInput></ShortCreationInput></Flex>
              <Flex>no. tier
                <ShortCreationInput></ShortCreationInput></Flex>
            </Flex>
            <Flex gap="5em" width='100%' align='center' justify='center'>
              <Flex gap="1em"> width
                <CreationInput></CreationInput></Flex>
              <Flex gap="1em"> height
                <ShortCreationInput></ShortCreationInput></Flex>
              <Flex > length
                <ShortCreationInput></ShortCreationInput></Flex>
            </Flex>
            <Flex gap="4em" marginBottom='4em' marginTop='2em'>
              <CancelButton onClick={() => { setShowCreationBox(false) }}>
                cancel
              </CancelButton>
              <CreateButton>
                create
              </CreateButton>
            </Flex>
          </CreationInputContainer>
        </CreationBox>

      }
    </ProductsTable>
  </Background>)
}

export default Products;