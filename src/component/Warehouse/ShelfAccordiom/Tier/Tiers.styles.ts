import styled from 'styled-components';
export const TierRowContainer = styled.div`
border-left: 1px solid #cfcfcf;
border-right: 1px solid #cfcfcf;
background: #F5F5F5;
width:100%;
display:flex;
justify-content:center;
flex-direction:column;
`;
export const FirstTierText = styled.div`
font-family: 'Palanquin Dark';
font-weight: 100;
color: #6A6A6A;
text-align:center;
`;

export const TierRow = styled.div`
max-width:100%;
display: grid; 
grid-auto-columns: 1fr; 
grid-template-columns:14% 14% 14% 14% 14% 14%;
grid-template-rows: 1fr; 
grid-template-areas: 
  "number name size height length width buttons"; 
 padding: 1em;
 border-bottom: 1px solid #cfcfcf;
`;
