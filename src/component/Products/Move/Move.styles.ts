import styled from 'styled-components';

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
  background: #fff;
  width: 80%;
  max-height: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  overflow-x: hidden;
`;

export const CancelImage = styled.img`
aspect-ratio: 1/1; 
height:1em;
 margin-left:1.2em;
 opacity:0.5;
z-index:2;
 &:hover {
  opacity: 0.8; 
}
`;

export const ProductsTable = styled.div`
  width: 90%;
`;

export const ProductTr = styled.div`
width: 100%;
display: grid;
grid-template-columns: 20% 10% 10% 10% 10% 15% 15% 10%;
grid-template-areas: 
    "id warehouse row shelf tier photo name amount"; 
border-bottom: 1px solid #E0E0E0;
`;

export const BaseCell = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  text:center; 
  padding:1em;  
  border-right: 1px solid #E0E0E0;
  color: #334F5E;
`;

export const LastBaseCell = styled(BaseCell)`
  border-right: none;
`;

export const FirstBaseCell = styled(BaseCell)`
  font-weight: 500;
  text-align: center;
  background: #F2F2F2;
`;

export const AmountInput = styled.input`
    border: 1px solid #EAEAE7;
    width: 2.5em;
    aspect-ratio: 1/1;
    &:focus {
      outline: none;
    }
`;
export const Input = styled.input`
border: 1px solid #E0E0E0;
&:focus {
  outline: none;
}
`;

export const WarehouseInput = styled(Input)`
width: 15em;
`;

export const SmallInput = styled(Input)`
width:2em;
aspect-ratio: 1/1;
`;

export const InputContainer = styled.div`
font-family: Palanquin Dark;
font-weight: 400;
gap:2em;
margin-top:3em;
width:100%;
display:flex;
color:  #696868;
margin-bottom: 5em;
`;
