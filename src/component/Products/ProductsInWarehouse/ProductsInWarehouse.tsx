
import MainNavigation from '../../Header/MainNavigation';
import { Flex, Image } from '../../../styles/globalStyles.styles';
import { pageSize } from '../../../constants/Constants';
import { Background, RowText, ShelvesText, ShelfContainer, ShelfTable, FirstLineText, FreePlaceButton } from './ProductsInWarehouse.styles'
import { useState, useEffect } from 'react';
import ShelfAccordion from './ProductInShelfAccordion/ProductsInShelfAccordion';
import { getProductsByTier, ShelfWithProductsDto, TierWithProductsDto, RowWithProductsDto } from '../ProductsApi';
import { PageableResponse } from '../../../types/types';
import { useKeycloak } from '@react-keycloak/web';
import { useCookies } from "react-cookie";
import FreePlacePopup from './FreePlacePopup/FreePlacePopup';
import Pagination from '../../Pagination/Pagination';
function ProductsInWarehouse() {
  const [products, setProducts] = useState<PageableResponse<RowWithProductsDto>>();
  const { keycloak, initialized } = useKeycloak();
  const [cookies] = useCookies(["warehouseId", "warehouseName"]);
  const [showFreeProducts, setShowFreeProducts] = useState(false);
  const [actualPage, setActualPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [visiblePageRange, setVisiblePageRange] = useState({ start: 0, end: 0 });
  useEffect(() => {
    getProductsByTier(keycloak.token, cookies.warehouseId, actualPage, pageSize)
      .then(response => {
        setProducts(response);
        console.log(response.totalPages);
        setPages(response.totalPages);
        if (actualPage < visiblePageRange.start || actualPage > visiblePageRange.end || visiblePageRange.start === visiblePageRange.end) {
          let newStart = Math.max(0, actualPage - 2);
          let newEnd = 4;
          if (newEnd > response.totalPages - 1) {
            newEnd = response.totalPages - 1;
          }
          if (actualPage > 5) {
            newEnd = Math.min(response.totalPages - 1, actualPage + 2);
          }
          setVisiblePageRange({ start: newStart, end: newEnd });
        }
      });
  }, [actualPage]);

  return (
    <Background>
      <MainNavigation />

      <FreePlaceButton onClick={() => { setShowFreeProducts(prev => !prev) }}>
        <Image src={'/magnifying-glass.svg'} width="2em" opacity="60%"></Image>
        FREE PLACE
        {
          showFreeProducts && (
            <FreePlacePopup setShowFreeProducts={setShowFreeProducts} setProducts={setProducts} />
          )
        }
      </FreePlaceButton>
      <ShelfTable>
        {products && products.content.map((row: RowWithProductsDto) => (
          <div>
            <RowText>Row {row.row}</RowText>
            <ShelvesText>Shelves:</ShelvesText>
            {row.shelves.map((shelf: ShelfWithProductsDto) => (
              <div key={shelf.id}>
                <ShelfContainer background="#EBEBEB">
                  <FirstLineText>{`No.${shelf.number}`}</FirstLineText>
                  <FirstLineText>{shelf.name}</FirstLineText>
                  {shelf.hasFreeSpace !== null && (
                    <Flex gap='0.5em' align='center'>
                      <FirstLineText>Free space: </FirstLineText>
                      <Image src={shelf.hasFreeSpace ? "/ok.svg" : "/cancel.svg"} alt="space" width="0.8em" opacity="60%"></Image>
                    </Flex>
                  )}
                </ShelfContainer>
                {shelf.tiers.map((tier: TierWithProductsDto) => (
                  <ShelfAccordion key={tier.id} tier={tier} hasFreeSpace={shelf.hasFreeSpace} />
                ))}
              </div>
            ))}
          </div>
        ))}
        <Flex width='100%' justify='flex-end' marginTop='2em'>
          <Pagination actualPage={actualPage} setActualPage={setActualPage} startPage={visiblePageRange.start} endPage={visiblePageRange.end} setVisiblePageRange={setVisiblePageRange} pages={pages}></Pagination>
        </Flex>
      </ShelfTable>
    </Background>
  );
}

export default ProductsInWarehouse;