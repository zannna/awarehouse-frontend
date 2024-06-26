import styled from 'styled-components';
import { Flex } from '../../styles/globalStyles.styles';
export const Background = styled(Flex)`
  background: #FFFFFF;
  min-height: 100%;
  max-width: 100%;
  width:100%;
`;


export const Header = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
grid-template-rows: 1fr; 
gap: 1em;
grid-template-areas: 
    "logo options  options . actualWarehouse"; 
`;

export const LogoContainer = styled(Flex)`
font-size: 3em;
color:#344351;
grid-area: logo;
`;

export const Line = styled.div`
  width: 1px; 
  height: 3em; 
  background-color: black;
`;

export const Logo = styled.div`
font-size: 0.5em;
`;

export const Options = styled.div`
grid-area: options;
display:flex;
justify-content:space-between;
`;

export const ViewOption = styled.button`
border: none;
  outline: none;
  background-color: transparent;
  display:flex;
  justify-content:center;
  align-items:center;
  font-family: 'Palanquin Dark';
font-style: normal;
font-weight: 400;
color: #6A6A6A;
margin-left:1em;
font-size: 1em;
`;

export const ArrowDownImage = styled.img`
margin-left: 0.5em;
width: 0.8em;
aspect-ratio: 1/1; 
`;

export const ActualWarehouse = styled(Flex)`
border-left-style: solid;
    border-left-width: 1px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    padding: 0.7em;
    grid-area: actualWarehouse; 

`;

export const ActualText = styled.div`
color:#245653;
`;

export const WarehouseSelector = styled.div`
margin-top: 1em;
border:none;
outline: none; 
background-position-y: 35px;

 select:active, select:hover {
  outline-color: red
}
`;

export const WarehouseList = styled.div`
position: absolute;
z-index: 2;
background: #FFFFFF;
border-style: solid;
border-width: 1px;
margin-top: 0.7em;
padding:1em;
margin-left: -0.7em;
`;

export const WarehouseText = styled.div`
padding: 0.3em;
cursor: pointer; 
`;

export const Popup = styled.div`
position: absolute;
background: #FFFFFF;
border: 1px solid  #8c8c8c;
padding: 1em;
padding-bottom: 1.5em;
top:95%;
left:0;
display: flex;
flex-direction: column;
gap: 1em;
min-width:5em;
white-space: nowrap;
justify-content: center;
align-items: center;
width: 80%;
z-index: 2;
`;

export const PopupItem =styled.div`
color: #6A6A6A;
font-size: 0.9em;
font-weight: 600;
cursor: pointer;
&:hover {
  opacity: 0.8;
}
`;

export const SelectionContainer = styled.div`
position:relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Separator = styled.div`
  height: 1px;
  width: 80%;
  background-color: #8c8c8c;

`;