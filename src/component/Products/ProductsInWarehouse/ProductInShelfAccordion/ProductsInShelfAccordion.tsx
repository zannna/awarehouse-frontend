import { ShelfContainer, ShelfText, ProductData, ProductContainer, ProductGrid  } from "./ProductsInShelfAccordion.styles";
import { Flex, Image,GridItem } from '../../../../styles/globalStyles.styles';
import { useState, useEffect } from 'react';
import { TierWithProductsDto, ProductInTierDto} from '../../ProductsApi';
import Products from "../../ProductsPage";

function ShelfAccordion({ tier, hasFreeSpace }: { tier: TierWithProductsDto, hasFreeSpace: boolean }) {
    const [showProducts, setShowProducts] = useState(false);

    return (
        <>
            <ShelfContainer background="#F9F9F9">
                <ShelfText>{`tier ${tier.number}`}</ShelfText>
                <ShelfText>{tier.name}</ShelfText>
                {hasFreeSpace !== null && (
                    <ShelfText>usage: {tier.occupiedVolume}%</ShelfText>
                )}
                <GridItem gridArea="options">
                    <Flex justify='flex-end' gap="1em">
                        {tier.products.length > 0 && (
                        <Image src="/arrow-down.svg" alt="arrow down" width="1.5em" opacity="80%" onClick={() => setShowProducts(!showProducts)}></Image>
                        )}
                    </Flex>
                </GridItem>
            </ShelfContainer>
            {showProducts && tier.products.map((product: ProductInTierDto) => (
                <ProductContainer key={product.id}>
                    <ProductGrid>
                        <ProductData gridArea="photo">
                       { product.image ? <Image src={`data:image/jpeg;base64,${product.image}`} alt="Product" height='80px' width='80px' opacity='100%' /> : ''}
                        </ProductData>
                        <ProductData gridArea="id">{product.id}</ProductData>
                        <ProductData gridArea="title">{product.title}</ProductData>
                        <ProductData gridArea="amount">amount: {product.amount}</ProductData>
                    </ProductGrid>
                </ProductContainer>
            ))}
        </>
    );
}


export default ShelfAccordion;