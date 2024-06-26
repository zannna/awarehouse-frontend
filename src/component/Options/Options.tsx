import { Background,OptionsContainer, LogoContainer, OptionButton } from "./Options.styles";
import { Flex, Text } from "../../styles/globalStyles.styles";
import { useNavigate } from "react-router-dom";
function Options(){
    const navigate = useNavigate();
    return(<Background>
        <OptionsContainer>
          <LogoContainer> 
                A<Text size='0.5em'>warehouse</Text>
            </LogoContainer>   
          <OptionButton onClick={()=>navigate('/warehouse/selection')}>YOUR WAREHOUSES</OptionButton>
          <OptionButton onClick={()=>navigate('/warehouse/creation')}>CREATE NEW WAREHOUSE</OptionButton>
          <OptionButton onClick={()=>navigate('/join')}>JOIN WAREHOUSE OR GROUP</OptionButton>
        </OptionsContainer>
        </Background>);
}

export default Options;