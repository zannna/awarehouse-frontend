import { Flex, Image, GreenText, SmallText, Line, SmallLine, Checkbox} from '../../../styles/globalStyles.styles';
import {
    RemoveText, SelectAllText, Warning
} from './Selection.styles'
import Move from '../Move/Move';
import { useState} from 'react';
import { Product } from '../ProductsApi';
import {removeProducts} from '../ProductsApi';
import { useKeycloak } from '@react-keycloak/web';
function Selection({ selectedProducts, setSelectedProductsMap, products, setProducts, setEditProduct, setShowProductCreator} : 
 {selectedProducts :Product[],
 setSelectedProductsMap: (selectedProducts: Map<number, Product>) => void,
 products: Product[], setProducts: (products: Product[]) => void,
 setEditProduct: (product: Product | null) => void,
 setShowProductCreator: (show :boolean) =>void}){

    const [showMoveModal, setShowMoveModal] = useState(false);
    const [showNoSelectionWarning, setShowNoSelectionWarning] = useState(false);
    const { keycloak, initialized } = useKeycloak();
    const handleShowMoveModal = () => {
         console.log(showMoveModal);
          setShowMoveModal(!showMoveModal)
      }
    
      const handleMouseOver = () => {
        if(selectedProducts.length <= 0){
            setShowNoSelectionWarning(true);
        }
      };
    
      const handleMouseOut = () => {
        setShowNoSelectionWarning(false);
      };

      const handleRemoveProducts = () => {
        const productIds = selectedProducts.map(product => product.id) .filter((id): id is string => !!id);
        const productWarehouseIds = selectedProducts
        .map(product => product.productWarehouses?.at(0)?.productWarehouseId)
        .filter((id): id is string => !!id);
      
        removeProducts(keycloak.token, {
          productIds: productIds.length > 0 ? productIds : [],
          productWarehouseIds: productWarehouseIds.length > 0 ? productWarehouseIds : []
        }).then((status) => {
          if(status==200){
            setProducts(products.filter(product => !selectedProducts.includes(product) ));
          }
        });
      };
      const addAllSelectedProduct = (isSet: boolean) => {
        console.log(isSet);
        if (isSet) {
          const newSelectedProductsMap = new Map<number, Product>();
          products.forEach((product, index) => {
                  newSelectedProductsMap.set(index, product);
          });
          setSelectedProductsMap(newSelectedProductsMap);
      } else {
          setSelectedProductsMap(new Map<number, Product>());
      }
      }

    return (
        <Flex align="center">
            <Image src="/done.svg" alt="selected" width="1.2em"></Image>
            <GreenText>selected</GreenText>
            <Line />
            <Image src="/arrow.svg" alt="move" width="1em"></Image>
            <SmallText onClick={()=>handleShowMoveModal()} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>move 
            {showNoSelectionWarning && <Warning>Please select at least one product.</Warning>}
            </SmallText>
            {showMoveModal&& !showNoSelectionWarning  && <Move products={selectedProducts} setShowMoveModal={setShowMoveModal}/>}
            <SmallLine />
            <Image src="/pen.svg" alt="modify" width="1.5em" height="1.5em"></Image>
            <SmallText onClick={()=> { setEditProduct(selectedProducts[0]);  setShowProductCreator(true)}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              modify
            </SmallText>
            <SmallLine />
            <Image src="/bin.svg" alt="remove" width="1.5em"></Image>
            <RemoveText onClick={()=>{handleRemoveProducts()}}>remove</RemoveText>
            <Line />
            <SelectAllText >select all</SelectAllText>
            <Checkbox type="checkbox"   onChange={(e) => addAllSelectedProduct ( e.target.checked)}></Checkbox>
        </Flex>);
}

export default Selection;