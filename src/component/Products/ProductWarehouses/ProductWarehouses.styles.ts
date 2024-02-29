import styled from 'styled-components';
import { Flex } from '../../../styles/globalStyles.styles';
export const  ShowProductFromContainer =styled(Flex)`
margin-top:2em;
`;

export const ShowProductFromText = styled.div`
font-family: 'Palanquin Dark';
font-style: normal;
font-weight: 400;
color: #344351;
margin-right:3em;
`;

export const ProductsFromWarehouse = styled.div`
 color: #47474A;
 font-family: 'Play';
 font-style: normal;
 font-weight: 400;
 border: 1px solid #9C9494;
 border-radius: 20px;
 padding:0.5em;
 margin-right:1.5em;
 min-width:4em;
`;

export const  AddWarehouseContainer = styled.div`
position: relative;
`;

export const AddWarehouseImage = styled.img`
width:1.5em;
aspect-ratio: 1/1; 
opacity: 0.5;
`;

export const ProductWarehouseList = styled.div`
position: absolute;
z-index: 2;
background: #FFFFFF;
border-style: solid;
border-width: 1px;
width:min-content;
padding:1em;
width:10em
`;

export const Checkbox = styled.input`
  width: 1em;
  aspect-ratio: 1/1; 
  grid-area: checkbox;
  place-self: center;
  background-color:green;
`;

export const GroupText = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-family: 'Play';
    font-weight: 400;
    color: rgba(52, 51, 51, 0.8);
    font-size: 1em;
    margin-top:1em;
    margin-bottom:1em;
    text-decoration: underline;
    text-underline-offset: 6px;
`;

export const WarehouseText = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
font-size: 0.9em;
font-family: 'Play';
    font-weight: 400;
    color: rgba(52, 51, 51, 0.7);
`;