import styled from 'styled-components';

export const Background = styled.div`
background: #FFFFFF;
height: 100vh;
max-width: 100%;
padding: 4em; 
display:flex;
justify-content:center;
align-items:center;
`;

export const MainContainer = styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
border: 1px solid ;
padding:1em;
gap: 4em;
width: 50%;
height: 50vh;
`;


export const Input = styled.input`
border: 1px solid #cfcfcf;
&:focus {
  outline: none;
}
height:1.5em;
width:15em;
padding: 0.2em;
padding-left: 0.5em;
padding-right: 0.5em;
align-self:center;
justify-content: center;
background:none
`;