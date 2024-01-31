import styled from 'styled-components';
export const Warehouse = styled.div `
padding: 0.8em;
border: 1px solid #cfcfcf;
border-radius: 20px;
`;


export const Line = styled.div`
margin-top: 8em;
  height: 1px;
  background-color: black;
  width:100%;
`

export const RedText = styled.div`
color: #771035;
`;

export const GroupText = styled.div`

color:  #6A6A6A;
 font-size: 1.2em;
`;

export const GroupContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap:1em;
margin-top: 5em;
`;

export const GroupItem = styled.div`
width: 30%;
border-right: 1px solid #f1eeee;
display: flex;

min-height: 10em;
flex-direction:column;
gap:1em;
`;

export const GroupName = styled.div`
font-family: 'Palanquin Dark';
font-weight: 400;
color: #344351;
`;

export const GreyText = styled.div`
// font-family: 'Palanquin Dark';
// font-style: normal;
// font-weight: 400;
// color: #6A6A6A;
font-size: 1.2em;
`;