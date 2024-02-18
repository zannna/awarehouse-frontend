import { TierRow, TierRowContainer, FirstTierText } from "./Tiers.styles";
import { ShelfText } from "../ShelfAccordion.styles";
import { Flex, Image, Text } from "../../../../styles/globalStyles.styles";
import { Shelf } from "../../WarehouseApi";
import { useState } from "react";
import { removeTier, removeShelf } from "../../WarehouseApi";
import { useCookies } from "react-cookie";
import { useKeycloak } from '@react-keycloak/web';
import { ShelfRow } from "../ShelfAccordion.styles";
function Tiers({shelf,  updateShelfStateAfterTierRemoval,  handleModifyShelf, updateShelvesAfterShelfRemoval }:{shelf: Shelf, updateShelfStateAfterTierRemoval: (shelfId: string, tierId: string) => void,
    handleModifyShelf: (shelf: Shelf) => void, updateShelvesAfterShelfRemoval: (shelfId: string) => void}){
const [showTiers, setShowTiers] = useState(false);
const [cookies, setCookie] = useCookies(["warehouseId"]);
const { keycloak, initialized } = useKeycloak();

const handleRemoveTier = async (shelfId: string, tierId: string) => {
    await removeTier(keycloak.token, cookies.warehouseId, shelfId, tierId);
    updateShelfStateAfterTierRemoval(shelfId, tierId);
}

const handleRemoveShelf = async (shelfId: string) => {
    console.log(shelfId);
    await removeShelf(keycloak.token, cookies.warehouseId, shelfId);
    updateShelvesAfterShelfRemoval(shelfId);
}

return (<>
<ShelfRow>
                        <ShelfText>{shelf.number}</ShelfText>
                        <ShelfText>{shelf.name}</ShelfText>
                        <input type="checkbox" checked={shelf.size} disabled />
                        <Flex gap='0.5em' justify='center'>
                            <ShelfText>{shelf.dimensions.height}</ShelfText>
                        </Flex>
                        <Flex gap='0.5em' justify='center'>
                            <ShelfText>{shelf.dimensions.length}</ShelfText>
                        </Flex>
                        <Flex gap='0.5em' justify='center'>
                            <ShelfText>{shelf.dimensions.width}</ShelfText>
                        </Flex>
                        <ShelfText>{shelf.tiers.length}</ShelfText>
                        <input type="checkbox" checked={shelf.sameSizeTiers} disabled />
                        <Flex justify='flex-end' gap='0.6em'>
                            <Image src="/blue-arrow-down.svg" alt="add" width='1.6em' opacity='90%' onClick={() => { setShowTiers(!showTiers) }}></Image>
                            <Image src="/gear.svg" alt="add" width='1.6em' onClick={() => { handleModifyShelf(shelf) }} ></Image>
                            <Image src="/bin.svg" alt="add" width='2em' onClick={() => { handleRemoveShelf(shelf.id) }}></Image>
                        </Flex>
                    </ShelfRow>
    {showTiers &&
        <TierRowContainer>
            <Text color="#6A6A6A" size='1.2em' weight="300" family='Palanquin Dark' align='center' margin='1.5em'> tiers:</Text>
            <TierRow>
                <FirstTierText>number</FirstTierText>
                <FirstTierText>name</FirstTierText>
                <FirstTierText>size</FirstTierText>
                <FirstTierText>height</FirstTierText>
                <FirstTierText>length</FirstTierText>
                <FirstTierText>width</FirstTierText>

            </TierRow>
            {shelf.tiers.map((tier, index) => (
                <TierRow key={index}>
                    <FirstTierText>{tier.number}</FirstTierText>
                    <FirstTierText>{tier.name}</FirstTierText>
                    <FirstTierText>
                        <input type="checkbox" checked={tier.size} disabled />
                    </FirstTierText>
                    <Flex justify='center' gap='0.6em'>
                        <ShelfText>{tier.dimensions.height}</ShelfText>
                    </Flex>
                    <Flex justify='center' gap='0.6em'>
                        <ShelfText>{tier.dimensions.length}</ShelfText>
                    </Flex>
                    <Flex justify='center' gap='0.6em'>
                        <ShelfText>{tier.dimensions.width}</ShelfText>
                    </Flex>
                    <Flex justify='flex-end' gap='0.6em'>
                        <Image src="/gear.svg" alt="add" width='1.6em' onClick={() => { handleModifyShelf(shelf) }}></Image>
                        <Image src="/bin.svg" alt="add" width='2em' onClick={() => handleRemoveTier(shelf.id, tier.id)}  ></Image>
                    </Flex>
                </TierRow>
            ))}

        </TierRowContainer>
    }
     </>
)
}
export default Tiers;