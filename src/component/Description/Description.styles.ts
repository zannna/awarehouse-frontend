import styled from 'styled-components';
import { Flex } from '../../styles/globalStyles.styles';

export const Background = styled(Flex)`
  background: #FFFFFF;
  min-height: 100vh;
  padding: 4em;
  display: flex;
align-items: center;
flex-direction: column;
`;

export const Body = styled.div`
font-size: 1.2em;
margin-top: 4.5em;
display: flex;
flex-direction: column;
align-items: center;
gap:7em;
width:60%;
`;

export const Header = styled.div`
display: grid;
width: 90%;
grid-template-columns: 30% 70%; 
gap: 1em;
grid-template-areas: 
    "logo options "; 
`;

export const LogoContainer = styled(Flex)`
font-size: 4em;
color:#344351;
grid-area: logo;
`;

export const Line = styled.div`
  width: 1px; 
  height: 3em; 
  background-color: black;
`;

export const Logo = styled.div`
font-size: 0.7em;
`;

export const Button = styled.button`

padding-left: 3em;
padding-right:3em;
height: 3em;
`;

export const LoginButton = styled(Button)`
font-family: 'Palanquin Dark';
background: #344351;
border: none;
color: #fff;
&:hover {
  opacity: 0.8; 
}

`;

export const RegisterButton = styled(Button)`
border: 2px solid #9D9CA1;
font-family: 'Palanquin Dark';
font-weight: 500;
color:#9D9CA1;
&:hover {
  opacity: 0.8; 
}
`;
export const  TextContainer = styled.div`
display: flex;
gap: 3em;
justify-content: center;
align-items: center;
margin-top: 1em;
`;
export const  DescriptionGreetingText = styled.div`
line-height: 1.5;
letter-spacing: 0.05em;
font-size: 1.8em;
font-family: 'Palanquin Dark';
font-style: normal;
font-weight: 400;
color: #344351;
`;

export const DescriptionText = styled.div`
line-height: 2;
font-size: 1.1em;
letter-spacing: 0.02em;
color:#47474A;
`;

export const DescriptionHeader =styled(DescriptionGreetingText)`
font-size: 1.3em;
`;