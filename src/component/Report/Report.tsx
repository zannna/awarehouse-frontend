import { Flex, Background, Text, Image } from '../../styles/globalStyles.styles';
import MainNavigation from "../Header/MainNavigation";
import { BlueText, CheckboxItem, GreyText, CheckboxContainer,  CheckboxGrid, Input, TableTr} from "./Report.styles";
import { useState } from 'react';
import { useEffect } from 'react';
import { getGroupsAndWarehouses, GroupsAndWarehouses } from './ReportApi';
import { useKeycloak } from '@react-keycloak/web';
import Selector from '../Selector/Selector';
import { ReportData,  createReport, getReports} from './ReportApi';
function Report() {
    const [showReportCreation, setShowReportCreation] = useState(false);
    const { keycloak, initialized } = useKeycloak();
    const [selectedGroup, setSelectedGroup] = useState<string[]>([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState<string[]>([]);
    const [groups, setGroups] = useState<Map<string, string>>(new Map());
    const [warehouses, setWarehouses] = useState<Map<string, string>>(new Map());
    const [selectedReport, setSelectedReport] = useState<string[]>(["0", "understock report"]);
    const [report, setReport] = useState<Map<string, string>>(new Map([["0", "understock report"]]));
    const [selectedScope, setSelectedScope] = useState<string>("group");
    const [selectedInterval, setSelectedInterval] = useState<string>("");
    const [email, setEmail] = useState("");
    const [reports, setReports] = useState<ReportData[]>([]);
    const handleScopeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedScope(event.target.value);
    };

    const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedInterval(event.target.value);
    }

    useEffect(() => {
        const fetchGroups = async () => {
            getReports(keycloak.token).then((fetchedReports) => {
                setReports(fetchedReports);
            });

            const fetchedGroupsAndWarehouses = await getGroupsAndWarehouses(keycloak.token);

            const newGroups = fetchedGroupsAndWarehouses.groupWithWarehouses.reduce((acc, groupWithWarehouse) => {
                acc.set(groupWithWarehouse.group.id, groupWithWarehouse.group.name);
                return acc;
            }, new Map());
            setGroups(newGroups);
            const newWarehouses = fetchedGroupsAndWarehouses.groupWithWarehouses.reduce((acc, groupWithWarehouse) => {
                groupWithWarehouse.warehouses.forEach(warehouse => {
                    acc.set(warehouse.id, warehouse.name);
                });
                return acc;
            }, new Map());
            setWarehouses(newWarehouses);
            if (fetchedGroupsAndWarehouses.warehousesWithoutGroup.length > 0) {
                const firstWarehouse = fetchedGroupsAndWarehouses.warehousesWithoutGroup[0];
                setSelectedWarehouse([firstWarehouse.id, firstWarehouse.name]);
            }
            if (fetchedGroupsAndWarehouses.groupWithWarehouses.length > 0) {
                const firstGroup = fetchedGroupsAndWarehouses.groupWithWarehouses[0].group;
                setSelectedGroup([firstGroup.id, firstGroup.name]);
            }
        };
        fetchGroups();
    }, []);

    const sendCreateReportRequest = () => {
        let id = '';
        if (selectedScope === 'group' && selectedGroup.length > 0) {
            id = selectedGroup[0]; 
        } else if (selectedScope === 'warehouse' && selectedWarehouse.length > 0) {
            id = selectedWarehouse[0]; 
        }
        const reportData: ReportData = {
            reportScopeId: id,
            reportScope: selectedScope.toUpperCase(),
            reportInterval: selectedInterval.toUpperCase(),
            email: email
        }
        createReport(keycloak.token,  reportData).then((response) => {
            setShowReportCreation(false);
        });
    }

    return (
        <Background>
            <MainNavigation />
            <Flex direction='column' marginTop='5em' width='auto' gap='3em'>
                <BlueText>
                    <Flex>
                        create new report
                        <Image src="/square-add.svg" alt="pointer" width="1.5em" marginLeft="1em" opacity='100%' onClick={()=>{setShowReportCreation(true)}}></Image>
                    </Flex>
                </BlueText>
                {showReportCreation && (
                <CheckboxContainer>
                    <Flex justify='flex-end'>
                        <Image src="/cancel.svg" alt="pointer" width="0.8em" marginLeft="0.5em" onClick={()=>{setShowReportCreation(false)}}></Image>
                    </Flex>
                    <CheckboxGrid>
                        <CheckboxItem>
                            <GreyText>type of report</ GreyText>
                            <Selector items={report} setSelected={setSelectedReport} selected={selectedReport}></Selector>
                        </CheckboxItem>
                        <CheckboxItem>
                            <GreyText>for </ GreyText>
                            <Flex direction='column' width='100%' gap='0.5em'>
                                <Flex gap='1em' align='center'>
                                    <input type='radio'
                                        value="group"
                                        checked={selectedScope === "group"}
                                        onChange={handleScopeChange}
                                    ></input> group
                                    {selectedScope === "group" &&
                                        <Selector items={groups} setSelected={setSelectedGroup} selected={selectedGroup}></Selector>
                                    }
                                </Flex>
                                <Flex gap='1em' align='center'>
                                    <input type='radio'
                                        value="warehouse"
                                        checked={selectedScope === "warehouse"}
                                        onChange={handleScopeChange}
                                    ></input> warehouse
                                    {selectedScope === "warehouse" &&
                                        <Selector items={warehouses} setSelected={setSelectedWarehouse} selected={selectedWarehouse}></Selector>
                                    }
                                </Flex>
                            </Flex>
                        </CheckboxItem>
                        <CheckboxItem>
                            <GreyText>interval</ GreyText>
                            <Flex direction='column' width='100%' gap='1em'>
                                <Flex gap='1em'>
                                    <input type='radio'
                                        value="daily"
                                        checked={selectedInterval === "daily"}
                                        onChange={handleIntervalChange}
                                    ></input>daily
                                </Flex>
                                <Flex gap='1em'>
                                    <input type='radio'
                                        value="monthly"
                                        checked={selectedInterval === "monthly"}
                                        onChange={handleIntervalChange}
                                    ></input>monthly
                                </Flex>
                                <Flex gap='1em'>
                                    <input type='radio'
                                        value="yearly"
                                        checked={selectedInterval === "yearly"}
                                        onChange={handleIntervalChange}
                                    ></input>yearly
                                </Flex>
                            </Flex>
                        </CheckboxItem>
                        <Flex gap='1em'>
                        <GreyText>email</ GreyText>
                            <Input type="text" onChange={event => setEmail(event.target.value)}></Input>
                        </Flex>
                    </CheckboxGrid>
                    <Flex justify='center' marginTop='2em'>
                        <Image src="/accept.svg" alt="pointer" width="2em" marginLeft="1em" opacity='100%' onClick={()=>sendCreateReportRequest()}></Image>
                    </Flex>
                </CheckboxContainer>)
                }
                <BlueText>your reports:
                </BlueText>
                {
                        reports.map((report) => {
                            return (
                                <TableTr>
                                      <Text>{report.entityName} </Text>
                                      <Text>{report.reportInterval.toLowerCase()}</Text>
                                      <Text>{report.email}</Text>
                                      <Flex justify='flex-end'>
                                        <Image src="/bin.svg" alt="pointer" width="1.8em" onClick={()=>{}}></Image>
                                      </Flex>
                                </TableTr>
                            );
                        })
                    }
            </Flex>
        </Background>
    )
}

export default Report;