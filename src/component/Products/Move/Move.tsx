import {
    ModalContainer, Modal, CancelImage, ProductsTable, ProductTr, BaseCell, LastBaseCell, FirstBaseCell, AmountInput, WarehouseInput, SmallInput, InputContainer
} from './Move.styles';
import { Product } from '../ProductsApi';
import { Flex, Text, Image } from '../../../styles/globalStyles.styles';
import { useState, useEffect } from 'react';
import {moveProducts, MoveProductsDto,  ProductWarehouseMoveInfo, getWarehouses} from '../ProductsApi';
import { useKeycloak } from '@react-keycloak/web';
import Selector from '../../Selector/Selector';
import ErrorPopup from '../../ErrorPopup/ErrorPopup';
function Move({ products, setShowMoveModal, reset }: { products: Product[], setShowMoveModal: (show: boolean) => void,
    reset: () => void
 }) {
    const [shelfNumber, setShelfNumber] = useState<number>();
    const [tierNumber, setTierNumber] = useState<number>();
    const { keycloak, initialized } = useKeycloak();
    const [warehouses, setWarehouses] = useState<Map<string, string>>(new Map());
    const [selectedWarehouse, setSelectedWarehouse] = useState<string[]>();
    const [productNumber, setProductNumber] = useState<number>(0);
    const [errorPopup, setErrorPopup] = useState<string | null>(null);
    useEffect(() => {
        const fetchWarehouses = async () => {
          const fetchedWarehouses = await getWarehouses(keycloak.token);
          const warehousesMap = new Map();
          fetchedWarehouses.forEach(warehouse => {
            warehousesMap.set(warehouse.id, warehouse.name);
          });
          setWarehouses(warehousesMap);
        };
        fetchWarehouses();
      }, []);

    const handleClose = () => {
        setShowMoveModal(false);
    };

    const handleMove=()=>{
        const productsToMove : ProductWarehouseMoveInfo[]= products.map(product => {
            return {
                productWarehouseId: product.productWarehouses?.at(0)?.productWarehouseId as string,
                amount: productNumber ? productNumber : (product.productWarehouses?.at(0)?.amount || 0.0) 
            }
        });
        const moveProduct : MoveProductsDto={
            productWarehouseMoveInfos: productsToMove,
            warehouseId: selectedWarehouse?.at(0) as string,
            shelfNumber: shelfNumber as number ,
            tierNumber: tierNumber as number 
        }
        console.log(moveProduct)
        moveProducts( keycloak.token, moveProduct).then((status)=>{
            setShowMoveModal(false)
            reset();
        }).catch((error)=>{setErrorPopup(error.message)})
    
    }


    return (
                <ModalContainer>
                     {errorPopup && <ErrorPopup message={errorPopup} onClose={() => setErrorPopup(null)} />}
                    <Modal>
                        <Flex justify='flex-end' marginTop='2em' marginRight='2em'>
                            <CancelImage onClick={() => handleClose()} src="/cancel.svg" alt="add warehouse"></CancelImage>
                        </Flex>
                        <Flex padding='3em' direction='column'>
                            <Text family='Palanquin Dark' weight='400' color='#344351' size='1.2em' marginBottom='2em'>move products</Text>
                            <Flex width='100%' justify='center'>

                                <ProductTr>
                                    < FirstBaseCell >id</FirstBaseCell>
                                    < FirstBaseCell >warehouse</FirstBaseCell>
                                    < FirstBaseCell >row</FirstBaseCell>
                                    < FirstBaseCell >shelf</FirstBaseCell>
                                    < FirstBaseCell >tier</FirstBaseCell>
                                    < FirstBaseCell >photo</FirstBaseCell>
                                    < FirstBaseCell >name</FirstBaseCell>
                                    < FirstBaseCell >amount</FirstBaseCell>
                                    {
                                    products.map(product => (
                                     <>
                                                                                 <BaseCell>{product.id}</BaseCell>
                                            <BaseCell>{product.productWarehouses?.at(0)?.warehouseName}</BaseCell>
                                            <BaseCell>{product.productWarehouses?.at(0)?.row}</BaseCell>
                                            <BaseCell>{product.productWarehouses?.at(0)?.shelfNumber}</BaseCell>
                                            <BaseCell>{product.productWarehouses?.at(0)?.tierNumber}</BaseCell>
                                            <BaseCell>  {product.image ? <Image src={`data:image/jpeg;base64,${product.image}`} alt="Product" height='80px' width='80px' opacity='100%' /> : ''}</BaseCell>
                                            <BaseCell>{product.title}</BaseCell>
                                            <LastBaseCell>
                                                <AmountInput placeholder={product.productWarehouses?.at(0)?.amount?.toString()} onChange={((e)=>{setProductNumber(Number(e.target.value))})}></AmountInput>
                                            </LastBaseCell></>
                                      
                                    ))
                                }
                                </ProductTr>

                            </Flex>
                            <Text family='Palanquin Dark' weight='400' color='#344351' size='1.2em' marginTop='3em' width='100%'>to</Text>
                            <InputContainer>
                                warehouse
                                <Selector items={warehouses} selected={null} setSelected={(selectedItem: string[]) => { setSelectedWarehouse(selectedItem) }} ></Selector>
                                shelf
                                < SmallInput onChange={(e) => setShelfNumber(Number(e.target.value))}></SmallInput>
                                tier
                                < SmallInput onChange={(e)=> setTierNumber(Number(e.target.value))}></SmallInput>
                            </InputContainer>
                            <Flex width='100%' justify='center'>
                                <Image src="/accept.svg" opacity='100%' width='2.5em' height='2.5em' alt="accept" onClick={()=>{handleMove()}}></Image>
                            </Flex>
                        </Flex>
                    </Modal>
                </ModalContainer>)

       
    
}

export default Move;