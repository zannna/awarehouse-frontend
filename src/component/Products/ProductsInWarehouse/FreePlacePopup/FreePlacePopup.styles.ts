import styled from 'styled-components';
export const Input = styled.input`
border: 1px solid #cfcfcf;
width: 5em;
&:focus {
 outline: none;
}
`;

export const PopupContainer = styled.div`
position:absolute;
background: #FFFFFF;
border: 1px solid #cfcfcf;
padding: 2em;
top:0;
left: 110%;
white-space: nowrap;
z-index:3;
`