import styled from 'styled-components';

export const BlueText = styled.div`
font-family: 'Palanquin Dark';
font-style: normal;
font-weight: 300;
color: #344351;
font-size: 1.1em;
`;

export const CheckboxItem = styled.div`
display: flex;
flex-direction: column;
margin-top: 2em;
`;

export const  GreyText= styled.div`
color: #6A6A6A;
font-weight: 600;
margin-bottom: 0.8em;
`;


export const CheckboxContainer =styled.div`
gap: 3em;
display: flex;
flex-direction: column;
width: fit-content;
border: 1px solid #E5E5E5;
padding: 3em;
`;

export const CheckboxGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
column-gap: 10em;
row-gap: 3em;
`;

export const Input = styled.input`
border: 1px solid #E0E0E0;
&:focus {
    outline: none;
 
  }
`;

export const TableTr = styled.div`
display: grid;
grid-template-columns: 25% 25% 25% 25%;
grid-template-areas: 
    "entityName interval email buttons"; 
border-bottom: 1px solid #E0E0E0;
color: #47474A;
`;
