import styled from 'styled-components';
interface ShelfProps {
    background?: string;
    } 
export const ShelfContainer = styled.div<ShelfProps>`
 display: grid; 
 grid-auto-columns: 1fr; 
 grid-template-columns: 0.4fr 0.5fr 0.5fr 1.6fr;
 grid-template-rows: 1fr; 
 gap: 0px 0px; 
 grid-template-areas: 
   "number name usage options"; 
   border: 1px solid #cfcfcf;
   border-top: 0.5px solid #cfcfcf;
 padding: 1em;
 background: ${({  background }) =>  background ?? ''};
 justify-content: center; 
 `;

 export const ShelfText = styled.div`
 color: #696868;;
 font-weight: 500;
 `;

 
 export const ProductText = styled.div`
 color: #616161;
 `;

 export const ProductContainer = styled.div`
display:flex; 
border: 1px solid #cfcfcf;
padding: 1em;
justify-content: space-between;
 `;