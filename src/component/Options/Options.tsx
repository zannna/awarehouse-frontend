import { Background,OptionsContainer, LogoContainer, OptionButton } from "./Options.styles";
import { Flex, Text } from "../../styles/globalStyles.styles";
function Option(){
    return(<Background>
        <OptionsContainer>
          <LogoContainer> 
                A<Text size='0.5em'>warehouse</Text>
            </LogoContainer>   
          <OptionButton>YOUR WAREHOUSES</OptionButton>
          <OptionButton>CREATE NEW WAREHOUSE</OptionButton>
          <OptionButton>JOIN NEW WAREHOUSE</OptionButton>
        </OptionsContainer>
        </Background>);
}

export default Option;