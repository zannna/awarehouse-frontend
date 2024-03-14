import { Flex, Background, Text, Image, Line, SmallLine } from '../../styles/globalStyles.styles';
import { TextWithBorder, RedText, GroupText, GroupItem, GreyText, GroupContainer, GroupWithBorder, Input, GroupPopup, AddGroupContainer } from './Group.styles'
import MainNavigation from '../Header/MainNavigation';
import { useState, useEffect } from 'react';
import { getGroupsWithWarehouses, getWarehouses, Warehouse, GroupWithWarehouses, addWarehouseToGroup } from './GroupApi';
import { useKeycloak } from '@react-keycloak/web';
import { createGroup, removeWarehouseFromGroup, removeGroup } from './GroupApi';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
function Group() {
    const [content, setContent] = useState<string[]>([]);
    const { keycloak, initialized } = useKeycloak();
    const [groupsWithWarehouses, setGroupsWithWarehouses] = useState<GroupWithWarehouses[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [showGroupCreation, setShowGroupCreation] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [removeWarehouseDialog, setRemoveWarehouseDialog] = useState<{ warehouseId: string, groupId: string } | null>(null); 
    const dragStartHandler = (
        event: React.DragEvent<HTMLDivElement>,
        warehouseId: string
    ) => {
        event.dataTransfer.setData("warehouseId", warehouseId);
    };
    useEffect(() => {
        getGroupsWithWarehouses(keycloak.token).then((fetchedGroups) => {
            setGroupsWithWarehouses(fetchedGroups.groupWithWarehouses);
        });
        getWarehouses(keycloak.token).then((fetchedWarehouses) => {
            setWarehouses(fetchedWarehouses);
        });
    }, []);

    const toggleGroupSelection = (groupId: string) => {
        setSelectedGroups(currentSelected => {
            if (currentSelected.includes(groupId)) {
                return currentSelected.filter(id => id !== groupId);
            } else {
                return [...currentSelected, groupId];
            }
        });
    };


    const dropHandler = (event: React.DragEvent<HTMLDivElement>, groupId: string) => {
        event.preventDefault();
        const warehouseId = event.dataTransfer.getData("warehouseId");
        addWarehouseToGroup(keycloak.token, groupId, warehouseId).then((status) => {
            if (status === 200) {
                const warehouseToAdd = warehouses.find(warehouse => warehouse.id === warehouseId);
                setGroupsWithWarehouses(currentGroups => {
                    return currentGroups.map(groupWithWarehouses => {
                        if (groupWithWarehouses.group.id === groupId) {
                            return {
                                ...groupWithWarehouses,
                                warehouses: [...groupWithWarehouses.warehouses, warehouseToAdd].filter(Boolean) as Warehouse[]
                            };
                        }
                        return groupWithWarehouses;
                    });
                });
                setRemoveWarehouseDialog(null); 
            }
        });

    };

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const sendCreateGroupRequest = () => {
        createGroup(newGroupName, keycloak.token).then((response) => {
            if (response.status === 201) {
                setShowGroupCreation(!showGroupCreation);
                setGroupsWithWarehouses(prevGroups => [...prevGroups, {
                    group: {
                        id: response.data.id,
                        name: response.data.name
                    },
                    warehouses: []
                }

                ]);
            }
        });
    }

    const sendRemoveWarehouseFromGroupRequest = (groupId: string, warehouseId: string) => {
        removeWarehouseFromGroup(keycloak.token, groupId, warehouseId).then((status) => {
            if (status === 200) {
                setGroupsWithWarehouses(currentGroups => {
                    return currentGroups.map(groupWithWarehouses => {
                        if (groupWithWarehouses.group.id === groupId) {
                            return {
                                ...groupWithWarehouses,
                                warehouses: groupWithWarehouses.warehouses.filter(warehouse => warehouse.id !== warehouseId)
                            };
                        }
                        return groupWithWarehouses;
                    });
                });
            }
        });

    }

    const sendRemoveGroupRequest = () => {
        removeGroup(keycloak.token, selectedGroups).then((status) => {
            if (status === 200) {
                setGroupsWithWarehouses(currentGroups =>
                    currentGroups.filter(groupWithWarehouses =>
                        !selectedGroups.includes(groupWithWarehouses.group.id)));
            }
        });
    }


    return <Background>
        <MainNavigation />
        <Flex width='100%' marginTop='5em'>
            <Flex width='70%' direction='column'>
                <Flex gap='0.8em' height='fit-content' align='center'>
                    <GreyText>Group</GreyText>
                    < Line />
                    <AddGroupContainer >
                        <Text>
                            add new
                        </Text>
                        <Image src="/add.svg" alt="add" width='1.2em' onClick={() => setShowGroupCreation(!showGroupCreation)}></Image>
                        {showGroupCreation && (
                            <GroupPopup>
                                name: <Input isValid={true} onChange={event => setNewGroupName(event.target.value)}></Input>
                                <Image src="/cancel.svg" alt="down" width="0.9em" opacity='60%' onClick={() => setShowGroupCreation(!showGroupCreation)} />
                                <Image src="/accept.svg" alt="down" width="1.3em" opacity='100%' onClick={() => sendCreateGroupRequest()} />
                            </GroupPopup>
                        )}
                    </AddGroupContainer>
                    <SmallLine />
                    <Flex>
                        <Flex gap='0.5em' align='center'>
                            <Text>selected</Text>
                            <Image src="/done.svg" alt="selected" width="1.2em"></Image>
                        </Flex>
                        <SmallLine />
                        <Flex gap='0.2em' align='center'>
                            <Text size='0.8em'>remove </Text>
                            <Image src="/bin.svg" alt="add" width='1.7em' onClick={() => { sendRemoveGroupRequest() }}></Image>
                        </Flex>
                    </Flex>
                </Flex>
                <GroupContainer>
                    {groupsWithWarehouses.map((groupWithWarehouses) => (
                        <GroupItem onDragOver={allowDrop}
                            onDrop={(e) => dropHandler(e, groupWithWarehouses.group.id)}>
                            <GroupText>{groupWithWarehouses.group.name}
                                <input type="checkbox" onClick={() => toggleGroupSelection(groupWithWarehouses.group.id)} />
                            </GroupText>
                            {groupWithWarehouses.warehouses.map((warehouse) => (
                                <GroupWithBorder>
                                    {warehouse.name}
                                    <Image src="/cancel.svg" alt="remove filter" width='0.5em'
                                         onClick={() => setRemoveWarehouseDialog({ warehouseId: warehouse.id, groupId: groupWithWarehouses.group.id })} />
                                    { removeWarehouseDialog?.warehouseId === warehouse.id && removeWarehouseDialog?.groupId === groupWithWarehouses.group.id &&
                                        <ConfirmationDialog
                                        isOpen={!!removeWarehouseDialog}
                                        onClose={() => setRemoveWarehouseDialog(null)}
                                        onConfirm={() => { sendRemoveWarehouseFromGroupRequest(groupWithWarehouses.group.id, warehouse.id) }}
                                        message="Are you sure you want to remove this warehouse from the group?"
                                    />}
                                </GroupWithBorder>
                            ))}
                        </GroupItem>

                    ))}
                </GroupContainer>

            </Flex>
            <Flex width='30%' align='flex-end' direction='column' gap='2em'>
                <GreyText>your warehouses</GreyText>
                {warehouses.map((warehouse, index) => (
                    <TextWithBorder
                        key={index}
                        onDragStart={(event) => dragStartHandler(event, warehouse.id)}
                        draggable={true}>
                        {warehouse.name}
                    </TextWithBorder>
                ))}
            </Flex>
        </Flex>
    </Background>
}
export default Group;