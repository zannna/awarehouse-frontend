import styled from 'styled-components';
export const FilterButton = styled.button`
color: #344351;
border: 1px solid #9D9CA1;
background: #FFFFFF;
font-size:1em;
padding: 0.5em;
display:flex;
justify-content:center;
`;

export const SelectedFilterText = styled.div`
color: #47474A;
`;

export const ChoosenFilter = styled.div`
border: 1px solid #9D9CA1;
font-size:0.8em;
padding: 0.4em;
display:flex;
align-items:center;
`;

export const CancelImage = styled.img`
aspect-ratio: 1/1; 
height:1em;
 margin-left:1.2em;
 opacity:0.5;

 &:hover {
  opacity: 0.8; 
}
`;

export const ModalContainer = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1; 
`;

export const Modal = styled.div`
height: 100%;
background: #fff;
width: 40%;
height:100%;
position: fixed;
top: 0;
right:0;
display:flex;
flex-direction:column;
align-items:center;
justify:center;
overflow-y:auto;
overflow-x: hidden; 
`; 

export const FilterText =styled.div`
color: #344351;
font-weight: 600;
margin-top:3em;
`;

export const FilterOptionMark =styled.div`
font-family: 'Palanquin Dark';
font-style: normal;
font-weight: 400;
color: #6A6A6A;
font-size:1em;
width:100%;
text-align:left;
border-top: 1px solid #ccc;
margin-top:5em;
`;

export const FilterOptions = styled.div`
color: #47474A;
font-family: 'Play';
font-style: normal;
font-weight: 400;
text-align: left;
`;

export const FilterInput = styled.input`
border: 1px solid #9D9CA1;
text-align:center;
height:2em;
width: 100%;
text-align: left;
&:focus {
  outline: none;
}
`;

export const ClearButton = styled.button`
border: 2px solid #9D9CA1;
font-family: 'Palanquin Dark';
font-weight: 500;
color:#9D9CA1;
flex: 1;
  width: 100%;
padding:1em;
&:hover {
  opacity: 0.8; 
}
`;

export const DoneButton=  styled.button`
font-family: 'Palanquin Dark';
background: #344351;
border: none;
color: #fff;
flex: 1;
width: 100%;
padding:1em;
&:hover {
  opacity: 0.8; 
}
`;

export const Checkbox = styled.input`
  width: 1em;
  aspect-ratio: 1/1; 
  grid-area: checkbox;
  place-self: center;
`;

export const SortContainer = styled.div`
margin-top:2em;
margin-bottom:4em;
display: flex;
flex-wrap: wrap;
width:100%;
gap:0.8em;
font-family: 'Play';
color: #47474A;
`;
