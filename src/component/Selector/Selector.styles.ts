import styled from 'styled-components';
export const SelectContainer = styled.div`
  position: relative;
  border: 1px solid #cfcfcf;
  padding: 0.2em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  cursor: pointer;
  width: fit-content;
`;

export const SelectHeader = styled.div`
  text-align: center;
`;

export const SelectList = styled.div`
width: 100%;
  position: absolute;
  z-index: 2;
  border: 1px solid #cfcfcf;
  margin-top: 0.2em;
  left:0;
  list-style: none; 
`;


export const ListItem = styled.div`
text-align: left;
max-width: 100%;
padding:0.3em;
`;
