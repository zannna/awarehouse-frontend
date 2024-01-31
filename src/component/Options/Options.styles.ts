import styled from 'styled-components';

export const LogoContainer = styled.div`
font-size: 3em;
color:#344351;
display:flex;
align-items:center;
justify-content:center;
`;

export const Background = styled.div`
background: #FFFFFF;
min-height: 100%;
max-width: 100%;
padding: 4em; 
display:flex;
justify-content:center;
`;

export const OptionsContainer = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
border: 1px solid ;
padding:3em;
padding-top: 5em;
padding-bottom: 7em;
gap: 4em;
width: 50%;
min-height: 50vh;
`;



export const OptionButton = styled.button`
border: 1px solid #9C9494;
font-family: 'Play';
color:#47474A;
flex: 1;
width: 70%;
padding:1.5em;
background-color: transparent;
&:hover {
  opacity: 0.8; 
}
`;

