import styled from 'styled-components';
export const TextWithBorder = styled.div `
padding: 1em;
border: 1px solid #cfcfcf;
border-radius: 20px;
min-width: 3em;
display: flex;
justify-content: center;
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

// export const GroupText = styled.div`

// color:  #6A6A6A;
//  font-size: 1.2em;
// `;

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
align-items: center;
min-height: 10em;
flex-direction:column;
gap:1em;
`;

export const GroupText = styled.div`
font-family: 'Palanquin Dark';
font-weight: 400;
color: #344351;
margin-bottom: 2em;
display: flex;
justify-content: center;
`;

export const GreyText = styled.div`
// font-family: 'Palanquin Dark';
// font-style: normal;
// font-weight: 400;
// color: #6A6A6A;
font-size: 1.2em;
`;

export const GroupWithBorder = styled.div`
padding: 1em;
border: 1px solid #cfcfcf;
border-radius: 20px;
min-width: 3em;
display: flex;
padding-left: 1.2em;
padding-bottom: 1em;
padding-right:0.7em;
padding-top:0.7em;
justify-content: space-between;
flex-direction: row;
gap:1em;
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
export const GroupPopup = styled.div`
position: absolute;
display: flex;
gap: 1em;
border: 1px solid #9D9CA1;
padding: 0.4em;
top: 190%;
left: 0;
font-size:0.9em;
`;

export const AddGroupContainer = styled.div`
display: flex;
gap:0.5em;
align-items:center;
position: relative;
`;