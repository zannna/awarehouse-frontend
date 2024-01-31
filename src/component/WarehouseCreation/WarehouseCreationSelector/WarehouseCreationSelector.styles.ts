import styled from 'styled-components';
export const SelectContainer = styled.div`
  position: relative;
  border: 1px solid #9D9CA1;
  padding: 0.2em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  cursor: pointer;
`;

export const SelectHeader = styled.div`
  text-align: center;
  min-width: 3em; 
`;

export const SelectList = styled.div`
  position: absolute;
  z-index: 2;
  border: 1px solid #9D9CA1;
  margin-top: 0.2em;
  left: 0;
  list-style: none; 
  background: white;
  min-width: max-content; 
`;

export const ListItem = styled.div`
  text-align: left;
  padding: 0.3em;
  min-width: 100%; 
`;

export const GroupContainer = styled.div`
position: absolute;
display: flex;
gap: 1em;
border: 1px solid #9D9CA1;
padding: 0.4em;
bottom:0; 
left: 100%; 
font-size:0.9em;
`;

export const Input = styled.input<{ isValid: boolean| undefined }>`
border: 1px solid ${({ isValid}) => (isValid== true || isValid ==undefined ? '#9D9CA1' : 'red')};
text-align:center;
width: 5em;
text-align: left;
&:focus {
  outline: none;
}
`;

