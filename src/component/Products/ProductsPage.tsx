import {
  AmountCell, Background, PhotoCell, ProductsTable, ProductTr, RowCell, IdCell, WarehouseCell, ShelfCell, TierCell, NameCell, PriceCell, FirstIdCell,
  FirstWarehouseCell, FirstBaseCell, FirstNameCell, FirstAmountCell, FirstPhotoCell, FirstPriceCell, FirstRowCell, FirstShelfCell, FirstTierCell, MarkCell, AddWarehouseImage, BaseCell
} from './ProductsPage.styles';
import MainNavigation from '../Header/MainNavigation';
import ProductWarehouse from './ProductWarehouses/ProductWarehouses'
import Selection from './Selection/Selection';
import ProductCreator from './ProductCreator/ProductCreator';
import { Flex, Image, GreenText, SmallText, Line, SmallLine, Checkbox } from '../../styles/globalStyles.styles';
import Filter from './Filter/Filter';
import { useState, useEffect } from 'react';
import { Product, Warehouse, Group } from './ProductsApi';
import { useKeycloak } from '@react-keycloak/web';
import { getProducts, getProductsByGroup } from './ProductsApi';
import { useCookies } from "react-cookie";
import Pagination from '../Pagination/Pagination';
import { pageSize } from '../../constants/Constants';
function Products() {
  const [showProductCreator, setShowProductCreator] = useState(false);
  const [selectedProductsMap, setSelectedProductsMap] = useState<Map<number, Product>>(new Map());
  const { keycloak, initialized } = useKeycloak();
  const [cookies] = useCookies(["warehouseId", "warehouseName"]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedWarehouses, setSelectedWarehouses] = useState<Warehouse[]>([{ id: cookies.warehouseId, name: cookies.warehouseName }]);
  const [actualPage, setActualPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [visiblePageRange, setVisiblePageRange] = useState({ start: 0, end: 0 });
  const [searchConditions, setSearchConditions] = useState<{ [key: string]: string }>({});
  const [sortConditions, setSortConditions] = useState({});
  const [selectedGroup, setSelectedGroup] = useState<Group[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const updateSearchConditions = (key: string, value: string) => {
    setSearchConditions(prevConditions => {
      if (prevConditions.hasOwnProperty(key)) {
        const { [key]: removed, ...newConditions } = prevConditions;
        return newConditions;
      } else {
        return {
          ...prevConditions,
          [key]: value,
        };
      }
    });
  };

  useEffect(() => {
    if (selectedWarehouses && selectedWarehouses.length > 0) {
      const warehouseIds = selectedWarehouses.map(warehouse => warehouse.id);
      setSelectedGroup([]);
      getProducts(keycloak.token, warehouseIds, sortConditions, searchConditions, actualPage, pageSize).then((products) => {
        setProducts(products.content);
        console.log(products.totalPages);
        setPages(products.totalPages);  
        if(visiblePageRange.end > products.totalPages-1)
          {setVisiblePageRange({ start: visiblePageRange.start, end: products.totalPages-1 });
      }
        if (actualPage < visiblePageRange.start || actualPage > visiblePageRange.end || visiblePageRange.start === visiblePageRange.end) {
          let newStart = Math.max(0, actualPage - 2);
          let newEnd = 4;
          if(newEnd>products.totalPages-1){
            newEnd=products.totalPages-1;
          }
          if (actualPage > 2){
            newEnd = Math.min(products.totalPages - 1, actualPage + 2);
          }
          console.log(newStart, newEnd);
          setVisiblePageRange({ start: newStart, end: newEnd });
        }
      }).catch(error => {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      });
    }
  }, [selectedWarehouses, actualPage, searchConditions, sortConditions]);

  useEffect(() => {
    const groupIds = selectedGroup.map(group => group.id);
    if(groupIds.length === 0) return;
    setSelectedWarehouses([]);
    getProductsByGroup(keycloak.token, sortConditions, searchConditions, groupIds, actualPage, pageSize).then((products) => {
      setProducts(products.content);
      setPages(products.totalPages);
      if(visiblePageRange.end > products.totalPages-1)
      {setVisiblePageRange({ start: visiblePageRange.start, end: products.totalPages-1 });
  }
      if (actualPage < visiblePageRange.start || actualPage > visiblePageRange.end || visiblePageRange.start === visiblePageRange.end) {
        let newStart = Math.max(0, actualPage - 2);
        let newEnd = 4;
        if(newEnd>products.totalPages-1){
          newEnd=products.totalPages-1;
        }
        if (actualPage > 2)
          newEnd = Math.min(products.totalPages - 1, actualPage + 2);
        setVisiblePageRange({ start: newStart, end: newEnd });
      }
    }).catch(error => {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    });

  },[selectedGroup,  actualPage]);

  const handleCheckboxChange = (uniqueId :number, product :Product, isChecked :boolean) => {
    setSelectedProductsMap(prevMap => {
      const newMap = new Map(prevMap);
  
      if (isChecked) {
        newMap.set(uniqueId, product);
      } else {
        newMap.delete(uniqueId);
      }
  
      return newMap;
    });
  };

useEffect(() => {
setShowProductCreator(!!editProduct);
},[editProduct]);

  return (<Background>
    <MainNavigation />
    <ProductWarehouse selectedWarehouses={selectedWarehouses} setSelectedWarehouses={setSelectedWarehouses}
      selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} setActualPage={setActualPage}/>
    <Filter updateSearch={searchConditions} updateSearchConditions={updateSearchConditions} sortConditions={sortConditions} setSortConditions={setSortConditions} />
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
      <Selection selectedProducts={Array.from(selectedProductsMap.values())} setSelectedProductsMap={setSelectedProductsMap} products={products} 
      setProducts={setProducts} setEditProduct={setEditProduct}  setShowProductCreator={setShowProductCreator} ></Selection>
    </Flex>
    <ProductsTable>
      <ProductTr isSelected={false}>
        <FirstIdCell>id</FirstIdCell>
        <FirstPhotoCell>photo</FirstPhotoCell>
        <FirstNameCell>name</FirstNameCell>
        <FirstAmountCell>amount</FirstAmountCell>
        <FirstPriceCell>price</FirstPriceCell>
        <FirstBaseCell>size</FirstBaseCell>
        <FirstBaseCell>group</FirstBaseCell>
        <FirstWarehouseCell >warehouse</FirstWarehouseCell >
        <FirstRowCell>row</FirstRowCell>
        <FirstShelfCell>shelf</FirstShelfCell>
        <FirstTierCell>tier</FirstTierCell>
        <MarkCell>mark</MarkCell>
      </ProductTr>
      {products.map((product, index) => (
        <ProductTr key={index} isSelected={product.productWarehouses?.at(0) ? false : true}>
          <IdCell>{product.id}</IdCell>
          <PhotoCell>
            <Flex width='100%' justify='center'>
              {product.image ? <Image src={`data:image/jpeg;base64,${product.image}`} alt="Product" height='80px' width='80px' opacity='100%' /> : ''}
            </Flex>
          </PhotoCell>
          <NameCell>{product.title}</NameCell>
          <AmountCell>{product.productWarehouses?.at(0) ? product.productWarehouses?.at(0)?.amount : product.amountGroup}</AmountCell>
          <PriceCell>{`${product.price?.amount} ${product.price?.currency}`}</PriceCell>
          <BaseCell>
            {`${product?.dimensions?.width ?? 0}x${product?.dimensions?.height ?? 0}x${product?.dimensions?.length ?? 0}`}
          </BaseCell>
          <BaseCell>{product.group?.name}</BaseCell>
          <WarehouseCell>
            {product.productWarehouses?.at(0)?.warehouseName}
          </WarehouseCell>
          <RowCell>
            {product.productWarehouses?.at(0)?.row}
          </RowCell>
          <ShelfCell>
            {product.productWarehouses?.at(0)?.shelfNumber}
          </ShelfCell>
          <TierCell>
            {product.productWarehouses?.at(0)?.tierNumber}
          </TierCell>
          <MarkCell>
            <Checkbox
              type="checkbox"
              checked={selectedProductsMap.has(index)}
              onChange={(e) => handleCheckboxChange(index, product,  e.target.checked)}
            />
          </MarkCell>
        </ProductTr>
      ))}

      {showProductCreator && <ProductCreator setShowProductCreator={setShowProductCreator} products={products} setProducts={setProducts} editProduct={editProduct} setEditProduct={setEditProduct}/>}
      <Flex width='100%' justify='flex-end' marginTop='2em'>
        <Pagination actualPage={actualPage} setActualPage={setActualPage} startPage={visiblePageRange.start} endPage={visiblePageRange.end} setVisiblePageRange={setVisiblePageRange} pages={pages}></Pagination>
      </Flex>
    </ProductsTable>
  </Background>)
}

export default Products;