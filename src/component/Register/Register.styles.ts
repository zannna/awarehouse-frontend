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

export const LoginContainer = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
border: 1px solid ;
padding: 3em;
gap: 4em;
width: 50%;
`;

export const Input = styled.input<{ isValid: boolean| undefined }>`
border: 1px solid ${({ isValid}) => (isValid== true || isValid ==undefined ? '#9D9CA1' : 'red')};
text-align:center;
width: 80%;
height:2em;
text-align: left;
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
width:60%;
gap:2em;
align-items:center;
`;

export const  InputText = styled.div`
width: 20%;
`;