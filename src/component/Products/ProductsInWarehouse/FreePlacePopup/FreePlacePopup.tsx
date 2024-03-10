import { Flex, Text, Image } from '../../../../styles/globalStyles.styles';
import { Input, PopupContainer } from './FreePlacePopup.styles';
import { FreePlaceDto, getFreePlaces } from '../../ProductsApi';
import { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useCookies } from 'react-cookie';
function FreePlacePopup({ setShowFreeProducts, setProducts }: { setShowFreeProducts: (showFreeProducts: boolean) => void, setProducts: (products: any) => void }) {
    const [cookies] = useCookies(["warehouseId", "warehouseName"]);
    const { keycloak, initialized } = useKeycloak();
    const [freePlace, setFreePlace] = useState<FreePlaceDto>({
        height: 0,
        width: 0,
        length: 0,
        amount: 0,
        warehouseIds: [cookies.warehouseId]
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, field: keyof FreePlaceDto) {
        e.stopPropagation();
        setFreePlace({ ...freePlace, [field]: parseFloat(e.target.value) || 0 });
    }
    function sendGetFreePlaceRequest() {
        getFreePlaces(keycloak.token, cookies.warehouseId, freePlace).then(response => {
            console.log(response);
            setProducts(response);
            setShowFreeProducts(false);
        });
    }

    return (
        <PopupContainer onClick={(e) => e.stopPropagation()}>
            <Flex direction='column' gap='2.5em' marginTop='0.5em' marginBottom='3em'>
                <Flex justify='flex-end' height='1em'>
                    <Image src='/cancel.svg' width='1.5em' onClick={() => { setShowFreeProducts(false) }}></Image>
                </Flex>
                <Text size='1.3em' color='#2D4561'>Find free place</Text>
                <Flex gap='2em' align='center'>
                    <Text color='#696868' weight='500'>size of product: </Text>
                    <Flex gap='0.5em' justify='center'>
                        <Text>length</Text>
                        <Input onChange={(e) => handleInputChange(e, 'length')} />
                    </Flex>
                    <Flex gap='0.5em'>
                        <Text>width</Text>
                        <Input onChange={(e) => handleInputChange(e, 'width')} />
                    </Flex>
                    <Flex gap='0.5em'>
                        <Text>height</Text>
                        <Input onChange={(e) => handleInputChange(e, 'height')} />
                    </Flex>

                </Flex>
                <Flex gap='0.5em'>
                    <Text color='#696868' weight='500'>amount: </Text>
                    <Input onChange={(e) => handleInputChange(e, 'amount')} />
                </Flex>
                <Flex justify='center' marginTop='1.5em'>
                    <Image src='/accept.svg' width='2em' opacity='100%' onClick={() => { sendGetFreePlaceRequest() }}></Image>
                </Flex>
            </Flex>
        </PopupContainer>
    );
}
export default FreePlacePopup;