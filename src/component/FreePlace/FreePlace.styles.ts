import styled from 'styled-components';

export const Input = styled.input`
border: 1px solid #cfcfcf;
&:focus {
  outline: none;
}
height:1.5em;
width:2em;
padding: 0.2em;
padding-left: 0.5em;
padding-right: 0.5em;
align-self:center;
justify-content: center;
background:none
`;

interface ShelfProps {
    background?: string;
}

export const ShelfContainer = styled.div<ShelfProps>`
  border: 1px solid #cfcfcf;
  border-bottom: none;
  background: #F9F9F9;
  width:100%;
  margin-top:3em;
 `;

 export const Row = styled.div`
 display: flex;
 gap:5em;
 padding: 1em;
 border-bottom: 0.5px solid #cfcfcf;
 place-items: center;
 color: #696868;
 font-weight: 500;
`;

export const BlueRow = styled(Row)`
background: #b0bfc942;
color: #334F5E;
`;