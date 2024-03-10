import { Flex, Background, Text, GreenText, Line, SmallLine, Image, Box } from '../../styles/globalStyles.styles';
import { TableTr, BaseCell, CheckboxCell, RoleCell, RolePopup, RoleTr } from './Token.styles';
import MainNavigation from '../Header/MainNavigation';
import { getAdminWarehousesAndGroup, AdminWorkers, getSharingToken, changeRole, removeWorker} from './TokenApi';
import { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Selector from '../Selector/Selector';
import { useCookies } from "react-cookie";
// import Filter from '../Filter/Filter';
interface Role {
    id: string;
    role: string;
}
function Token() {
    const { keycloak, initialized } = useKeycloak();
    const [cookies] = useCookies(["warehouseId", "warehouseName"]);
    const [selectionAdminData, setSelectionAdminData] = useState<Map<string, string>>(new Map());
    const [adminWorkers, setAdminWorkers] = useState<AdminWorkers[]>([]);
    const [selectedForToken, setSelectedForToken] = useState<string[] | null>([cookies.warehouseId, cookies.warehouseName]);
    const [token, setToken] = useState<string>('');
    const [showToken, setShowToken] = useState<boolean>(false);
    const [activePopup, setActivePopup] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<Role>({ id: '', role: '' });
    const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
    useEffect(() => {
        getAdminWarehousesAndGroup(keycloak.token).then((fetchedAdminData) => {
            fetchedAdminData.forEach((element: AdminWorkers) => {
                selectionAdminData.set(element.id, element.name);
                setAdminWorkers(fetchedAdminData);
            });
            console.log(selectionAdminData);
        })
    }, []);

    useEffect(() => {
        if (selectedForToken?.at(0) != null) {
            getSharingToken(keycloak.token, selectedForToken.at(0) as string).then((token) => {
                setToken(token);
            }
            );
            setShowToken(true);
        }
    }, [selectedForToken]);

    const copyToken = async () => {
        await navigator.clipboard.writeText(token);
    };

    const togglePopup = (workerKey: string) => {
        setSelectedRole({ id: workerKey, role: '' });
        setActivePopup(activePopup === workerKey ? null : workerKey);

    };

    const sendChangeRoleRequest = (id: string) => {
        changeRole(keycloak.token, id, selectedRole.role).then((status) => {
            if(status==200){
                setAdminWorkers(adminWorkers.map((adminWorker) => {
                    adminWorker.workers.forEach((worker) => {
                        if (worker.workerEntityId === id) {
                            worker.role = selectedRole.role;
                        }
                    });
                    return adminWorker;
                }));
            }
        });
    }

    const addSelectedWorker = (workerEntityId: string) => {
        if (selectedWorkers.includes(workerEntityId)) {
            setSelectedWorkers(selectedWorkers.filter((worker) => worker !== workerEntityId));
        } else {
            setSelectedWorkers([...selectedWorkers, workerEntityId]);
        }
    }

    useEffect(() => {
        console.log(adminWorkers);
    },[adminWorkers]);

    const sendRemoveWorkerRequest = () => {
        console.log(selectedWorkers);
       removeWorker(keycloak.token, selectedWorkers).then((status) => {
        console.log(status)
        if(status === 200){
            console.log("DSDdsdsdfs")
            setAdminWorkers(adminWorkers.map((adminWorker) => {
                adminWorker.workers = adminWorker.workers.filter((worker) => !selectedWorkers.includes(worker.workerEntityId));
                return adminWorker;
            }));
        }
       });

    }

    return <Background>
        <MainNavigation />
        <Flex width='100%' direction='column' padding='3.5em'></Flex>
        <Flex gap='1em'>
            <Text color="#2D4561" size="1.3em" weight="300">copy token from</Text>
            <Selector items={selectionAdminData} selected={selectedForToken} setSelected={setSelectedForToken}></Selector>
        </Flex>
        {showToken &&
            <Flex gap='1em' marginTop='2em'>
                <Box border='true' padding='0.2em' paddingLeft='0.5em' paddingRight='0.5em'>{token}</Box>
                <Image src="/copy.svg" alt="copy" width='1.2em' onClick={() => { copyToken() }} opacity='40%' ></Image>
            </Flex>
        }
        <Flex width='100%' direction='column'>
            <Flex gap='1em' marginTop='4em' align='center' justify='space-between' width='100%'>
                <Text color='#344351' size="1.2em" weight="400" family='Palanquin Dark'>users</Text>
                <Flex gap="3em">
                    <Flex>
                        <Flex gap='0.5em' align='center'>
                            <Image src="/done.svg" alt="add" width='1.2em' ></Image>
                            <GreenText>
                                selected
                            </GreenText>
                        </Flex>
                        <SmallLine />
                        <Flex gap='0.5em' align='center' onClick={()=>{sendRemoveWorkerRequest()}} pointer='pointer'>
                            <Image src="/bin.svg" alt="add" width='1.6em' hoverOpacity='0.4'></Image>
                            <Text color='#771035'>remove </Text>
                        </Flex>

                    </Flex>
                    <Flex gap='0.5em' align='center'>
                        select all
                        <input type='checkbox'></input>
                    </Flex>
                </Flex>
            </Flex>
            <Flex marginTop='3em' direction='column'>
                {adminWorkers.map((adminWorker) => (
                    <Flex marginTop='4em' direction='column'>
                        <TableTr isSelected={false}>
                            <BaseCell>
                                <Text size='1.2em' color="#344351"> {adminWorker.name}</Text>
                            </BaseCell>
                        </TableTr>
                        {adminWorker.workers.map((worker, workerIndex) => (
                            <TableTr key={workerIndex} isSelected={false}>
                                <BaseCell>{worker.name + " " + worker.surname}</BaseCell>
                                <RoleCell>
                                    {worker.role}
                                    <Image src="/pen.svg" alt="edit" width='1.5em' onClick={() => togglePopup(worker.workerEntityId)}></Image>
                                    {workerIndex != undefined && activePopup === worker.workerEntityId && (
                                        <RolePopup>
                                            <RoleTr onClick={() => setSelectedRole({ id: worker.id, role: 'admin' })}
                                                isSelected={selectedRole.role === 'admin'}>admin</RoleTr>
                                            <RoleTr onClick={() => setSelectedRole({ id: worker.id, role: 'worker' })}
                                                isSelected={selectedRole.role === 'worker'}>worker</RoleTr>
                                            <Flex align='center' gap='0.5em' justify='center'>
                                                <Image src="/cancel.svg" alt="down" width="0.8em" opacity='60%' onClick={() => togglePopup(worker.workerEntityId)} />
                                                <Image src="/accept.svg" alt="down" width="1.2em" opacity='100%' onClick={() => sendChangeRoleRequest(worker.workerEntityId)} />
                                            </Flex>
                                        </RolePopup>
                                    )}
                                </RoleCell>
                                <CheckboxCell><input type="checkbox" onClick={() => { addSelectedWorker(worker.workerEntityId) }}></input></CheckboxCell>
                            </TableTr>
                        ))}
                    </Flex>

                ))}
            </Flex>
        </Flex>


    </Background>
}

export default Token;