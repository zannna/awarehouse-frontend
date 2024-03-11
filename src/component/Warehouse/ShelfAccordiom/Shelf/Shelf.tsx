import { TierRow, TierRowContainer, FirstTierText, TierText } from "./Shelf.styles";
import { ShelfText } from "../ShelfAccordion.styles";
import { Flex, Image, Text } from "../../../../styles/globalStyles.styles";
import { ShelfDto } from "../../WarehouseApi";
import { useState } from "react";
import { removeTier, removeShelf } from "../../WarehouseApi";
import { useCookies } from "react-cookie";
import { useKeycloak } from '@react-keycloak/web';
import { ShelfRow } from "../ShelfAccordion.styles";
import ConfirmationDialog from "../../../ConfirmationDialog/ConfirmationDialog";
function Shelf({shelf,  updateShelfStateAfterTierRemoval,  handleModifyShelf, updateShelvesAfterShelfRemoval }:{shelf: ShelfDto, updateShelfStateAfterTierRemoval: (shelfId: string, tierId: string) => void,
    handleModifyShelf: (shelf: ShelfDto) => void, updateShelvesAfterShelfRemoval: (shelfId: string) => void}){
const [showTiers, setShowTiers] = useState(false);
const [cookies, setCookie] = useCookies(["warehouseId"]);
const { keycloak, initialized } = useKeycloak();
const [removeDialog, setRemoveDialog] = useState<string | null>(null);

const handleRemoveTier = async (shelfId: string, tierId: string|undefined) => {
    if(tierId === undefined){
        return;
    }
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
                            <Image src="/bin.svg" alt="add" width='2em' onClick={() => { setRemoveDialog(shelf.id) }}></Image>
                                <ConfirmationDialog
                                isOpen={!!removeDialog}
                                onClose={() => setRemoveDialog(null)}
                                onConfirm={() => {
                                    if (removeDialog) {
                                        handleRemoveShelf(shelf.id);
                                    }
                                }}
                                message="Are you sure you want to remove this shelf?"
                            />
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
                    <TierText>{tier.number}</TierText>
                    <TierText>{tier.name}</TierText>
                    <FirstTierText>
                        <input type="checkbox" checked={tier.size} disabled />
                    </FirstTierText>
                    <Flex justify='center' gap='0.6em'>
                        <TierText>{tier.dimensions.height}</TierText>
                    </Flex>
                    <Flex justify='center' gap='0.6em'>
                        <TierText>{tier.dimensions.length}</TierText>
                    </Flex>
                    <Flex justify='center' gap='0.6em'>
                        <TierText>{tier.dimensions.width}</TierText>
                    </Flex>
                    <Flex justify='flex-end' gap='0.6em'>
                        <Image src="/gear.svg" alt="add" width='1.6em' onClick={() => { handleModifyShelf(shelf) }}></Image>
                        <Image src="/bin.svg" alt="add" width='2em' onClick={() => setRemoveDialog(tier.id)}  ></Image>
                    </Flex>
                    <ConfirmationDialog
                                isOpen={!!removeDialog}
                                onClose={() => setRemoveDialog(null)}
                                onConfirm={() => {
                                    if (removeDialog) {
                                        handleRemoveTier(shelf.id, tier.id);
                                    }
                                }}
                                message="Are you sure you want to remove this shelf?"
                            />
                </TierRow>
            ))}

        </TierRowContainer>
    }
     </>
)
}
export default Shelf;