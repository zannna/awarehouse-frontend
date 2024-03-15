import styled from 'styled-components';

export const PopupContainer= styled.div `
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 1; 
`;

export const Popup = styled.div `
padding: 5em;
background: #fff;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
overflow-y: auto;
overflow-x: hidden;
display:flex;
flex-direction:column;
gap:4em;
padding:1em;
border: 1px solid #9D9CA1;
`;