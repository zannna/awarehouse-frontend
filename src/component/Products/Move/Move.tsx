import {
    ModalContainer, Modal, CancelImage , ProductsTable, ProductTr, BaseCell, LastBaseCell,  FirstBaseCell, AmountInput, WarehouseInput,  SmallInput, InputContainer
} from './Move.styles';
import {Product} from '../../../types/types';
import { Flex } from '../../../styles/globalStyles.styles';
import { useState, useEffect} from 'react';
import { Text } from '../../../styles/globalStyles.styles';

function Move({products} : {products :Product[]}) {
    const [isVisible, setIsVisible] = useState(true);
    const handleClose = () => {
        setIsVisible(false);
      };
      useEffect(() => {
        console.log(products)
      }, products) 
    return ( <div>
    {
        isVisible && (
            <ModalContainer>
            <Modal>
                <Flex justify='flex-end' marginTop='2em' marginRight='2em'>
                    <CancelImage onClick={()=>handleClose()} src="/cancel.svg" alt="add warehouse"></CancelImage>
                </Flex>
                <Flex padding='3em'>
            <Text family='Palanquin Dark' weight='400' color= '#344351' size='1.2em' marginBottom='3em'>move products</Text>
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
      </ProductTr>

                {
                    products.map(product => (
                        <ProductTr>
                            <BaseCell>{product.id}</BaseCell>
                            <BaseCell>{product.warehouse}</BaseCell>
                            <BaseCell>{product.row}</BaseCell>
                            <BaseCell>{product.shelf}</BaseCell>
                            <BaseCell>{product.tier}</BaseCell>
                            <BaseCell>{product.photo}</BaseCell>
                            <BaseCell>{product.name}</BaseCell>
                            < LastBaseCell >
                            <AmountInput placeholder={product.amount}></AmountInput>
                           </ LastBaseCell >
                        </ProductTr>
                    ))
                }
              
            </Flex>
            <Text family='Palanquin Dark' weight='400' color= '#344351' size='1.2em' marginTop='3em' width='100%'>to</Text>
            <InputContainer>
                warehouse
                <WarehouseInput></WarehouseInput>
                row
                   < SmallInput></SmallInput> 
                     shelf
                   < SmallInput></SmallInput> 
                   tier
                   < SmallInput></SmallInput> 
                </InputContainer>
                </Flex>
            </Modal>
        </ModalContainer>)
    
    }
    </div>
    )
}

export default Move;