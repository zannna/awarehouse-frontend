import styled from 'styled-components';
export const Background = styled.div`
  background: #FFFFFF;
  min-height: 100%;
  max-width: 100%;
  padding: 4em; 
 `;

export const RowText = styled.div`
 margin-top:2em;
 color: #2D4561;
 font-size:1.2em;
font-family: 'Palanquin Dark';
font-style: normal;
font-weight: 100;
 `;

export const ShelvesText = styled.div`
 margin-top:1.5em;
 color: #696868;
 font-family: 'Palanquin Dark';
 font-style: normal;
 font-weight: 400;
 `;

export const ShelfTable = styled.div`
 margin-top:2em;
 `;

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
  border-bottom: 0.5px solid #cfcfcf;
 padding: 1em;
 background: ${({ background }) => background ?? ''};
 align-items: center; 
 `;

export const FirstLineText = styled.div`
 color: #334F5E;
 font-weight: 500;
 font-style: normal;
 `;
export const ShelfText = styled.div`
 color: #929291;
 font-family: 'Palanquin Dark';
 font-weight: 400;
 `;

export const FreePlaceButton = styled.button`
 margin-top:2em;
  height:3em;
font-size:0.9em;
display: flex;
justify-content: center;
align-items: center;
position: relative;
background: none;
border: 1px solid #9D9CA1;
padding:0.5em;
padding-right:0.8em;
color:#2D4561;
&:hover {
  background-color: none;
}
 `;
