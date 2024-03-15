import styled from 'styled-components';
export const ProductCreatorFileContainer = styled.div`
position: absolute;
background: #FFFFFF;
border: 1px solid #E5E5E5;
padding: 1em;
padding-bottom: 1.5em;
top:200%;
display: flex;
flex-direction: column;
gap: 2em;
min-width:5em;
white-space: nowrap;
justify-content: center;
align-items: center;
`;

export const Input = styled.input`
border: 1px solid #E0E0E0;
&:focus {
    outline: none;
 
  }
`;