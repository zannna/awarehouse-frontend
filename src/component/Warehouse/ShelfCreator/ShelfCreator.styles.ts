import styled from 'styled-components';

export const Input = styled.input`
border: 1px solid #cfcfcf;
&:focus {
  outline: none;
}
height:1.5em;
width:2.5em;
padding: 0.2em;
padding-left: 0.5em;
padding-right: 0.5em;
align-self:center;
justify-content: center;
background:none
`;

export const NameInput = styled(Input)`
width:7em;
`;


export const ShelfCreationRow = styled.div`
max-width:100%;
display: grid; 
grid-auto-columns: 1fr; 
grid-template-columns:10% 13% 10% 10% 10% 10% 10% 15%;
grid-template-rows: 1fr; 
grid-template-areas: 
  "number name size height length width numberOfTiers sameSizeTiers buttons"; 
padding: 0.5em;
height: 2em;
place-items: center;
`;


export const CreateShelfContainer = styled.div`
background: #F2F2F2;
flex-direction:column;
display:flex;
max-width:100%;
justify-content:center;
padding:0.5em;
padding-bottom:3em;
`;