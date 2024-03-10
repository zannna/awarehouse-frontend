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

 type ProductTextProps = {
  gridArea?: string;
};

export const ProductData = styled.div<ProductTextProps>`
  color: #616161;
  grid-area: ${({ gridArea }) => gridArea ?? ''};
`;

 export const ProductContainer = styled.div`
display:flex; 
border: 1px solid #cfcfcf;
padding: 1em;
justify-content: space-between;
 `;

 export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 20% 20%;
  gap: 5em; 
  grid-template-areas: 
  "photo id title amount"; 
  `;