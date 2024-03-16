import { axiosCoreService } from "../../api/axiosConfig";
import { useEffect, useState } from "react";
import { useKeycloak } from '@react-keycloak/web';
import { Text} from "../../styles/globalStyles.styles";
import { Background, MainContainer, Button } from "./WarehouseSelection.styles";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
function WarehouseSelection() {
    const WAREHOUSE_PATH = '/warehouse';
    const [warehouses, setWarehouses] = useState([]);
    const { keycloak, initialized } = useKeycloak();
    const [cookies, setCookie] = useCookies(["warehouseId", "warehouseName"]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosCoreService.get(
                `${WAREHOUSE_PATH}`,
                {
                    headers: {
                        'Authorization': `Bearer ${keycloak.token}`
                      }
                }
            );
            if(response.status==200){
                setWarehouses(response.data);
            }
        };
        fetchData();
    }, []);
    const handleWarehouseSelection = (warehouseId: string, name :string) => {
        setCookie("warehouseId", warehouseId);
        setCookie("warehouseName", name);
        navigate("/product");
    }
    return (
    <Background>
        <MainContainer>
            <Text family='Play' color='#47474A' size='1.6em'>select warehouse:</Text>
            {warehouses.map((warehouse: { id: string; name: string; }) => (
                <Button key={warehouse.id} onClick={()=>handleWarehouseSelection(warehouse.id, warehouse.name)}>{warehouse.name}</Button>
            ))}
        </MainContainer>
    </Background>
  );
}
export default WarehouseSelection;