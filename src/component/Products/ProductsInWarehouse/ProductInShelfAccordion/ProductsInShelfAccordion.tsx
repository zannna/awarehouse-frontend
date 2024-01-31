import { ShelfContainer, ShelfText, ProductText, ProductContainer } from "./ProductsInShelfAccordion.styles";
import { Flex, Image, Checkbox } from '../../../../styles/globalStyles.styles';
import { useState, useEffect } from 'react';
import { Product } from '../../../../types/types';

function ShelfAccordion({selectedProducts, setSelectedProducts}: { selectedProducts :Product[], setSelectedProducts: (data: any) => void}) {
    const [showProducts, setShowProducts] = useState(false);
    useEffect(() => {
        console.log(selectedProducts);
      }, [selectedProducts]);
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
  }, [selectedProducts]) 
  // bylo #F5F5F5
    return <>    <ShelfContainer background="#F9F9F9">
        <ShelfText>tier 1</ ShelfText>
        <ShelfText>socks</ ShelfText>
        <ShelfText>usage: 80%</ ShelfText>
        <Flex justify='flex-end' gap="1em"><Image src="/add.svg" alt="add warehouse" width="1.5em" opacity="80%"></Image>
            <Image src="/arrow-down.svg" alt="arrow down" width="1.5em" opacity="80%" onClick={() => { setShowProducts(!showProducts) }}></Image>
            <Checkbox type="checkbox"></Checkbox>
        </Flex>
    </ShelfContainer>
        {showProducts && <>
            <ProductContainer>
                <Flex gap="6em">
                    <ProductText>photo</ ProductText>
                    <ProductText>skarpetki słodkie kotek</ ProductText>
                    <ProductText>amount: 20</ProductText>
                </Flex>
                <Checkbox type="checkbox" place="end" onChange={() => handleCheckboxChange({
          id: '1',
          name: 'Example Product',
          amount: '500',
          photo: 'example.jpg',
          warehouse: 'warehouse',
          row: 'row',
          shelf: 'shelf',
          tier: 'tier'
        })}></Checkbox>
            </ProductContainer>
                        <ProductContainer>
                        <Flex gap="6em">
                            <ProductText>photo</ ProductText>
                            <ProductText>skarpetki słodkie kotek</ ProductText>
                            <ProductText>amount: 20</ProductText>
                        </Flex>
                        <Checkbox type="checkbox" place="end" onChange={() => handleCheckboxChange({
          id: '2',
          name: 'Example Product',
          amount: '500',
          photo: 'example.jpg',
          warehouse: 'warehouse',
          row: 'row',
          shelf: 'shelf',
          tier: 'tier'
        })}></Checkbox>
                    </ProductContainer>
                                <ProductContainer>
                                <Flex gap="6em">
                                    <ProductText>photo</ ProductText>
                                    <ProductText>skarpetki słodkie kotek</ ProductText>
                                    <ProductText>amount: 20</ProductText>
                                </Flex>
                                <Checkbox type="checkbox" place="end" onChange={() => handleCheckboxChange({
          id: '3',
          name: 'Example Product',
          amount: '500',
          photo: 'example.jpg',
          warehouse: 'warehouse',
          row: 'row',
          shelf: 'shelf',
          tier: 'tier'
        })}></Checkbox>
                            </ProductContainer>
                            </>
        }
    </>
}

export default ShelfAccordion;