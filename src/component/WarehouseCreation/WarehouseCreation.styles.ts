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

export const MainContainer = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
border: 1px solid ;
padding: 3em;
gap: 4em;
width: 50%;
`;

export const Input = styled.input<{ isValid: boolean | undefined; width?: string }>`
  border: 1px solid ${({ isValid }) => (isValid === true || isValid === undefined ? '#9D9CA1' : 'red')};
  text-align: center;
  height: 2em;
  text-align: left;
  width: ${({ width }) => width || '80%'}; // Użyj przekazanej szerokości lub domyślnej wartości 80%
  &:focus {
    outline: none;
  }
`;

export const GreyButton = styled.button`
border: 2px solid #9D9CA1;
font-family: 'Palanquin Dark';
font-weight: 500;
color:#9D9CA1;
flex: 1;
  width: 100%;
padding:1em;
&:hover {
  opacity: 0.8; 
}
`;

export const BlueButton=  styled.button`
font-family: 'Palanquin Dark';
background: #344351;
border: none;
color: #fff;
flex: 1;
width: 100%;
padding:1em;
&:hover {
  opacity: 0.8; 
}
`;

export const InputWrapper = styled.div`
display:flex;
gap:2em;
align-items:center;
`;

export const  InputText = styled.div`
width: 20%;
`;

export const SelectorWrapper = styled.div`
display: grid;
  grid-template-columns: 0.8fr 1.6fr 1fr;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-template-areas:
  "name selector button";
  gap:0.5em;
justify-content:center;
align-items:center;
`;
// .container {  display: grid;
//   grid-template-columns: 0.8fr 1.6fr 1fr;
//   grid-template-rows: 1fr;
//   grid-auto-columns: 1fr;
//   gap: 0px 0px;
//   grid-auto-flow: row;
//   grid-template-areas:
//     "name selector button";
// }

// .name { grid-area: name; }

// .selector { grid-area: selector; }

// .button { grid-area: button; }
