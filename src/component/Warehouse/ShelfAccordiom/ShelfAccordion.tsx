import { ShelfRow, ShelfText, TierRow, TierRowContainer, FirstTierText, RowContainer, BlueMarkText } from "./ShelfAccordion.styles";
import { Flex, Image, Text } from "../../../styles/globalStyles.styles";
import { ShelfTableHeaderText } from '../Warehouse.styles';
import Selector from "../../Selector/Selector";
import { metreMap } from '../../../constants/MapConstants'
import { useState, useRef, } from "react";
import { Shelf } from "../WarehouseApi";
import { removeTier, removeShelf } from "../WarehouseApi";
import { useCookies } from "react-cookie";
import { useKeycloak } from '@react-keycloak/web';
import ShelfCreator from "../ShelfCreator/ShelfCreator";
function ShelfAccordion({ shelves, row, updateShelfStateAfterTierRemoval, updateShelvesAfterShelfRemoval }: {
    shelves: Shelf[], row: number,
    updateShelfStateAfterTierRemoval: (shelfId: string, tierId: string) => void, updateShelvesAfterShelfRemoval: (shelfId: string) => void
}) {
    const [showTiers, setShowTiers] = useState(false);
    const [cookies, setCookie] = useCookies(["warehouseId"]);
    const { keycloak, initialized } = useKeycloak();
    const [newShelf, setNewShelf] = useState(false);
    const myRef = useRef<null | HTMLDivElement>(null);
    const handleRemoveTier = async (shelfId: string, tierId: string) => {
        await removeTier(keycloak.token, cookies.warehouseId, shelfId, tierId);
        updateShelfStateAfterTierRemoval(shelfId, tierId);
    }

    const handleRemoveShelf = async (shelfId: string) => {
        console.log(shelfId);
        await removeShelf(keycloak.token, cookies.warehouseId, shelfId);
        updateShelvesAfterShelfRemoval(shelfId);
    }

    function addNewShelf() {
        setNewShelf(true);
        myRef.current?.scrollIntoView({ behavior: 'smooth', block: "center" });
    }

    return (<>
        <RowContainer>Row {row}
            <Flex align='center' gap='0.5em' cursor='pointer' onClick={addNewShelf}>
                <Image src="/add.svg" alt="add" width='1.2em'></Image>
                <Text family='Play' weight='400' size='0.8em'>add shelf</Text>
            </Flex>
        </RowContainer>
        <BlueMarkText>shelves:</BlueMarkText>
        <ShelfRow>
                    <ShelfTableHeaderText>number</ShelfTableHeaderText>
                    <ShelfTableHeaderText>name</ShelfTableHeaderText>
                    <ShelfTableHeaderText>size</ShelfTableHeaderText>
                    <ShelfTableHeaderText>height</ShelfTableHeaderText>
                    <ShelfTableHeaderText>length</ShelfTableHeaderText>
                    <ShelfTableHeaderText>width</ShelfTableHeaderText>
                    <ShelfTableHeaderText >no. Tiers</ShelfTableHeaderText>
                    <ShelfTableHeaderText>same size of tiers</ShelfTableHeaderText>
        </ShelfRow>
        {shelves.map((shelf) => (
            <div>
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
                    <ShelfText>3</ShelfText>
                    <input type="checkbox" checked={shelf.sameSizeTiers} disabled />
                    <Flex justify='flex-end' gap='0.6em'>
                        <Image src="/blue-arrow-down.svg" alt="add" width='1.6em' opacity='90%' onClick={() => { setShowTiers(!showTiers) }}></Image>
                        <Image src="/gear.svg" alt="add" width='1.6em' ></Image>
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
                            <Image src="/gear.svg" alt="add" width='1.6em' ></Image>
                            <Image src="/bin.svg" alt="add" width='2em' onClick={() => handleRemoveTier(shelf.id, tier.id)}  ></Image>
                        </Flex>
                    </TierRow>
                ))}

            </TierRowContainer>
            }
            </div>
        ))}
        <div ref={myRef}>
            {newShelf &&
                <ShelfCreator setNewShelf={setNewShelf} addShelf={addNewShelf} row={row} />}
        </div>
    </>
    )
}
export default ShelfAccordion;