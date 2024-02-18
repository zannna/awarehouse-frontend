    import { ShelfRow, ShelfText, RowContainer, BlueMarkText } from "./ShelfAccordion.styles";
    import { Flex, Image, Text } from "../../../styles/globalStyles.styles";
    import { ShelfTableHeaderText } from '../Warehouse.styles';
    import { useState, useRef, } from "react";
    import { Shelf } from "../WarehouseApi";
    import { useCookies } from "react-cookie";
    import { useKeycloak } from '@react-keycloak/web';
    import ShelfCreator from "../ShelfCreator/ShelfCreator";
    import Tiers from "./Tier/Tiers";
    function ShelfAccordion({ shelves, row, updateShelfStateAfterTierRemoval, updateShelvesAfterShelfRemoval }: {
        shelves: Shelf[], row: number,
        updateShelfStateAfterTierRemoval: (shelfId: string, tierId: string) => void, updateShelvesAfterShelfRemoval: (shelfId: string) => void
    }) {
        const [showTiers, setShowTiers] = useState(false);
        const [cookies, setCookie] = useCookies(["warehouseId"]);
        const { keycloak, initialized } = useKeycloak();
        const [newShelf, setNewShelf] = useState(false);
        const [modifyShelf, setModifyShelf] = useState<Shelf | null>(null);
        const myRef = useRef<null | HTMLDivElement>(null);


        function addNewShelf() {
            setNewShelf(true);
            myRef.current?.scrollIntoView({ behavior: 'smooth', block: "center" });
        }

        function handleModifyShelf(shelf: Shelf) {
            console.log("modify shelf");
            setModifyShelf(shelf);
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
                    <Tiers shelf={shelf}  updateShelfStateAfterTierRemoval={ updateShelfStateAfterTierRemoval} handleModifyShelf={handleModifyShelf}
                    updateShelvesAfterShelfRemoval ={updateShelvesAfterShelfRemoval }
                    ></Tiers>
                </div>
            ))}
            <div ref={myRef}>
                {newShelf &&
                    <ShelfCreator setNewShelf={setNewShelf} addShelf={addNewShelf} row={row} editShelf={modifyShelf} setEditShelf={setModifyShelf}/>}
            </div>
        </>
        )
    }
    export default ShelfAccordion;