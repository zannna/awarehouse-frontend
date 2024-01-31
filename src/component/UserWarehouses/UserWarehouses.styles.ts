import styled from 'styled-components';
import { Flex } from '../../styles/globalStyles.styles';
export const Background = styled(Flex)`
  background: #FFFFFF;
  min-height: 100%;
  max-width: 100%;
`;

export const Header =styled(Flex)`
font-family: 'Markazi Text';
font-style: normal;
font-weight: 500;
color: #344351;
width:100%;
`;

export const LogoContainer = styled(Flex)`
font-size: 7em;
`;

export const LineWithText = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: black;
  width:100%;
`;
export const Logo = styled.div`

background: #FFFFFF;
color:#344351;
font-size: 0.5em;
`;

export const ButtonContainer = styled.div`
margin-top: 5em;
color: #344351;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 5em;
  justify-content: center;
  align-items: center;
`

export const Button = styled.button`
padding: 10px;
border: 1px solid #cfcfcf;
border-radius: 20px;
font-size:1.3em;
height:3em;
font-family: 'Play';
font-style: normal;
font-weight: 400;
&:hover {
  background-color: #e0e0e0; /* Kolor podświetlenia po najechaniu */
}
`

export const NewButtonContainer = styled(ButtonContainer)`
place-items: center;
`;

export const NewWarehouseButton = styled(Button)`
width:13em;
color: rgb(51 66 109);
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`

export const JoinWarehouseButton = styled(Button)`
width:13em;
color: rgb(42 109 105);
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`

export const Line = styled.div`
margin-top: 8em;
  height: 1px;
  background-color: black;
  width:100%;
`

export const Text = styled.div`
margin-top: 4em;
font-size:1.3em;
font-family: 'Play';
`;

export const NewWarehouseImage = styled.img`
width: 1.5em;
height: 1.5em;
margin-left:1em;
opacity: 0.7;
`;
