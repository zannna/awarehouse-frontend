import styled from 'styled-components';


export const ShelfRow = styled.div`
max-width:100%;
display: grid; 
grid-auto-columns: 1fr; 
grid-template-columns:10% 13% 10% 10% 10% 10% 10% 15%;
grid-template-rows: 1fr; 
grid-template-areas: 
  "number name size height length width numberOfTiers sameSizeTiers buttons"; 
 border-bottom: 1px solid #cfcfcf;
padding: 1.5em;
align-items: center; 
`;


export const  ShelfText = styled.div`
font-family: 'Play';
font-weight: 400;
text-align:center;
`;

export const GreyMarkText = styled.div`
font-size:1.2em;
font-weight:300;
font-family:'Palanquin Dark';
text-align:center;
margin:1.5em;
color:#6A6A6A;;
`;
export const RowContainer =styled.div`
max-width:100%;
border: 1px solid #cfcfcf;
display:flex;
justify-content:space-between;
padding:1em;
color: #334F5E;
font-weight: 500;
font-style: normal;
font-size:1.2em;
border-bottom: 0.5px solid #cfcfcf;
background: #b0bfc942;
`;

export const BlueMarkText = styled.div`
color:#344351;
font-size:1.2em;
font-weight:300;
font-family:'Palanquin Dark';
text-align:center;
margin:1.5em;
`


