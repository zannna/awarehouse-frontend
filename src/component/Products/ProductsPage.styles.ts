import styled from 'styled-components';
export const Background = styled.div`
  background: #FFFFFF;
  min-height: 100%;
  max-width: 100%;
  padding: 4em; 

 `;
 export const AbsoluteContainer= styled.div`
 width: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
 `;

export const BaseCell = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align:center; 
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

export const ProductTr = styled.div<{ isSelected: boolean}>`
width: 100%;
display: grid;
grid-template-columns: 15% 10% 11% 7% 7% 10% 10% 11% 5% 5% 5%  5%;
grid-template-areas: 
    "id  photo name amount price size group warehouse row shelf tier checkbox"; 
border-bottom: 1px solid #E0E0E0;
background:  ${({ isSelected}) => isSelected ? '#52778b1f' :'transparent'};
`;


export const AddWarehouseImage = styled.img`
width:1.5em;
aspect-ratio: 1/1; 
opacity: 0.5;
`;
