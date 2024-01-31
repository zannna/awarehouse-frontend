import styled from 'styled-components';

export const UnitSelect = styled.select`
border: 1px solid #cfcfcf;
outline: none; 
`;
export const UnitOption= styled.option`

width:2em!important;
`;

export const RowNumberContainer = styled.div`
    border: 1px solid #cfcfcf;
    padding:0.2em;
    padding-left:0.5em;
    padding-right:0.5em;
`;

export const RowNumberButton = styled.button`
height:100%;
background:none;
border: 1px solid #cfcfcf;
border-left:none;
padding-left:0.5em;
padding-right:0.5em;
font-size:1.2em;
color:#696d70;
`;
export const WarehouseTable = styled.div`
display:flex;
flex-direction:column;
width:100%;
margin-top:3em;
border-left: 1px solid #cfcfcf;
border-right: 1px solid #cfcfcf;
border-bottom: 1px solid #cfcfcf;
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

export const ShelfRow = styled.div`
max-width:100%;
display: grid; 
grid-auto-columns: 1fr; 
grid-template-columns:10% 13% 10% 10% 10% 10% 10% 15%;
grid-template-rows: 1fr; 
grid-template-areas: 
  "number name size height length width numberOfTiers sameSizeTiers buttons"; 
 border-bottom: 1px solid #cfcfcf;
padding: 1em;
place-items: center;
`;

export const  ShelfText = styled.div`
font-family: 'Play';
font-weight: 400;
text-align:center;
`;
export const TierRowContainer = styled.div`
border-left: 1px solid #cfcfcf;
border-right: 1px solid #cfcfcf;
background: #F5F5F5;
width:100%;
display:flex;
justify-content:center;
flex-direction:column;
`;

export const TierRow = styled.div`
max-width:100%;
display: grid; 
grid-auto-columns: 1fr; 
grid-template-columns:13% 14% 13% 13% 13% 13%;
grid-template-rows: 1fr; 
grid-template-areas: 
  "number name size height length width unit buttons"; 
 padding: 1em;
 place-items: center;
`;

export const FirstTierText = styled.div`
font-family: 'Palanquin Dark';
font-weight: 100;
color: #6A6A6A;
text-align:center;
`;

export const ShelfTableHeaderText = styled.div`
font-family: 'Palanquin Dark';
font-weight: 400;
color: #344351;
text-align:center;
`;


export const GreyMarkText = styled.div`
font-size:1.2em;
font-weight:300;
font-family:'Palanquin Dark';
text-align:center;
color:#6A6A6A;;
`;
