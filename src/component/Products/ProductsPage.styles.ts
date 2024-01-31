import styled from 'styled-components';
export const Background = styled.div`
  background: #FFFFFF;
  min-height: 100%;
  max-width: 100%;
  padding: 4em; 
 `;

 
// export const ProductsTable = styled.div`
// display: grid;
// grid-template-columns: 12% 10% 10% 10% 15% 13% 10% 10%; 
// gap: 1em;
// grid-template-areas: 
//    "warehouse row shelf tier photo name amount price"; 
// `;


export const BaseCell = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  text:center; 
  padding:1em;  
  border-right: 1px solid #E0E0E0;
  color: #334F5E;
`;

export const FirstBaseCell = styled(BaseCell)`
  font-weight: 500;
  text-align: center;
  background: #F2F2F2;
`;

export const IdCell = styled(BaseCell)`
`;

export const FirstIdCell = styled(FirstBaseCell)`

`;

export const WarehouseCell = styled(BaseCell)`
  grid-area: warehouse;
`;

export const FirstWarehouseCell = styled(FirstBaseCell)`

`;

export const RowCell = styled(BaseCell)`
  grid-area: row;
`;

export const FirstRowCell = styled(FirstBaseCell)`

`;

export const ShelfCell = styled(BaseCell)`
  grid-area: shelf;
`;

export const FirstShelfCell = styled(FirstBaseCell)`

`;

export const TierCell = styled(BaseCell)`
  grid-area: tier;
`;

export const FirstTierCell = styled(FirstBaseCell)`

`;

export const PhotoCell = styled(BaseCell)`
  grid-area: photo;
`;

export const FirstPhotoCell = styled(FirstBaseCell)`

`;

export const NameCell = styled(BaseCell)`
  grid-area: name;
`;

export const FirstNameCell = styled(FirstBaseCell)`

`;

export const AmountCell = styled(BaseCell)`
  grid-area: amount;
`;

export const FirstAmountCell = styled(FirstBaseCell)`

`;

export const PriceCell = styled(BaseCell)`
  grid-area: price;
`;

export const FirstPriceCell = styled(FirstBaseCell)`

`;

export const MarkCell = styled(FirstBaseCell)`

`;

export const ProductsTable = styled.div`
  width: 100%;
`;

export const ProductTr = styled.div`
width: 100%;
display: grid;
grid-template-columns: 15% 10% 10% 10% 10% 10% 10% 10% 10% 5%;
grid-template-areas: 
    "id warehouse row shelf tier photo name amount price checkbox"; 
border-bottom: 1px solid #E0E0E0;
`;


export const AddWarehouseImage = styled.img`
width:1.5em;
aspect-ratio: 1/1; 
opacity: 0.5;
`;


export const CreationBox = styled.div`
width: 100%;
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