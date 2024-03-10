import { Background, MainContainer, Input} from "./Join.styles";
import { Text, Image  } from "../../styles/globalStyles.styles";
import {axiosCoreService} from '../../api/axiosConfig';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Join(){
    const { keycloak, initialized } = useKeycloak();
    const TOKEN_PATH = '/sharing-token';
    const [token, setToken] = useState<string>('');
    const navigate = useNavigate();
    const handleJoin = async () => {
        console.log(token);
        const response = await axiosCoreService.post(
            `${TOKEN_PATH}`,
            {sharingToken :token},
            {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`
                  }
            }
        );
        if(response.status==200){
            
            navigate('/p');
        }
    }
    return(
        <Background>
            <MainContainer>
                <Text family='Play' color='#47474A' size='1.5em'>join warehouse</Text>
                <Text family='Play' color='#47474A'  size='1em'>paste token:</Text>
                <Input onChange={event => setToken(event.target.value)}></Input>
                <Image src="/accept.svg" opacity='100%' width='2.5em' height='2.5em' alt="accept" onClick={()=>{handleJoin()}}></Image>
            </MainContainer>
        </Background>
    );

}
export default Join;
