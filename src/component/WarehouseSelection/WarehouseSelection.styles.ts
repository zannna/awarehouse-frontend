import styled from 'styled-components';

export const Background = styled.div`
background: #FFFFFF;
height: 80vh;
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
padding:3em;
gap: 4em;
width: 38%;
height: 50vh;
`;

export const Button = styled.button`
color: #47474A;
background: #FFFFFF;
font-family: 'Play';
font-style: normal;
font-weight: 400;
font-size: 1em;
border: 1px solid #9C9494;
border-radius: 30px;
padding: 0.7em;
margin-right: 1.5em;
min-width: 5em;
height: 3em;
&:hover {
    opacity: 0.8; 
  }
`;