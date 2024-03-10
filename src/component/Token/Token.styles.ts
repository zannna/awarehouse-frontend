import styled from 'styled-components';

export const Input = styled.input`
border: 1px solid #cfcfcf;
&:focus {
  outline: none;
}
height:1.5em;
width:2.5em;
padding: 0.2em;
padding-left: 0.5em;
padding-right: 0.5em;
align-self:center;
justify-content: center;
background:none
`;

export const TableTr = styled.div<{ isSelected: boolean}>`
width: 100%;
display: grid;
grid-template-columns: 25% 25% 25% 25%;
grid-template-areas: 
    "name role . checkbox"; 
border-bottom: 1px solid #E0E0E0;
background:  ${({ isSelected}) => isSelected ? '#F2F2F2' :'transparent'};
`;



export const BaseCell = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align:left; 
  padding:1em;  
  color: #334F5E;
`;

export const CheckboxCell = styled(BaseCell)`
grid-area: checkbox;
text-align:right; 
padding-right:3em;
`;

export const RoleCell = styled(BaseCell)`
display: flex;
gap: 1em;
position: relative;
`;

export const RolePopup = styled.div`
position: absolute;
display:flex;
flex-direction: column;
top: 100%;
left:20%;
background: #FFFFFF;
border: 1px solid #cfcfcf;
padding: 0.5em;
gap:1em;
cursor: pointer;
`;

export const RoleTr = styled.div<{ isSelected: boolean }>`
  text-align: center;
  text-decoration: ${({ isSelected }) => (isSelected ? 'underline' : 'none')};
`;
