import styled from 'styled-components';

export const CreationBox = styled.div`
width: 90%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-weight: 500;
text-align: center;
border-bottom: 1px solid #E0E0E0;
margin-bottom:3em;
`;

export const CreationText = styled.div`
color: #344351;
margin-top:4em;
`;

export const CreationInputContainer = styled.div`
margin-top:3em;
width:80%;
display: flex;
flex-direction: column;
align-items: center;
color: #6A6A6A;
text-align:left;
row-gap: 3em;
column-gap: 1.5em;
`;

export const CreationInput = styled.input`
margin-left:0.5em;
border: 1px solid #9D9CA1;
text-align:center;
height:2em;
max-width: 20em;
text-align: left;
&:focus {
  outline: none;
}
`
export const ShortCreationInput = styled.input`
margin-left:0.5em;
border: 1px solid #9D9CA1;
text-align:center;
height:2em;
max-width: 5em;
text-align: left;
&:focus {
  outline: none;
}
`

export const CreateButton = styled.button`
border:none;
background: #344351;
color:#fff;
padding: 0.5em;
padding-left: 1em;
padding-right: 1em;
font-size:1.1em;
`;

export const CancelButton = styled.button`
border: 1px solid #9D9CA1;
color: #9D9CA1;
padding: 0.5em;
padding-left: 1em;
padding-right: 1em;
font-size:1.1em;
`;
export const ProductGrid = styled.div`
  display: grid; 
  grid-template-columns: 1fr 0.7fr 1fr; 
  gap: 3em 5em; 
  width: 100%; 
  grid-template-areas: 
  ". . ."
  ". . ."
  "groups . ."
  "photo . ."
  "warehouse . .";
`;