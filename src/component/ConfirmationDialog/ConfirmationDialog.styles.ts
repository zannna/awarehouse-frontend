import styled from 'styled-components';

export const DialogContainer= styled.div `
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
z-index: 1; 
`;

export const Dialog = styled.div `
padding: 5em;
background: #fff;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
overflow-y: auto;
overflow-x: hidden;
`;

export const ClearButton = styled.button`
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

export const DoneButton=  styled.button`
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