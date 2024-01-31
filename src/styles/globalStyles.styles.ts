import styled from 'styled-components';
interface BoxProps {
  width?: string;
  height?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
  padding?: string;
  cursor?: string;
  fontSize?: string;
}
export const Box = styled.div<BoxProps>`
  width: ${({ width }) => width ?? ''};
  height: ${({ height }) => height ?? ''};
  margin: ${({ margin }) => margin ?? ''};
  margin-top: ${({ marginTop }) => marginTop ?? ''};
  margin-bottom: ${({ marginBottom}) => marginBottom ?? ''};
  margin-left: ${({ marginLeft}) => marginLeft ?? ''};
  margin-right: ${({ marginRight}) => marginRight ?? ''};
  padding: ${({ padding }) => padding ?? ''};
  cursor: ${({ cursor }) => cursor ?? ''};
  font-size: ${({ fontSize }) => fontSize ?? ''};
`;
interface FlexProps {
    direction?: string;
    justify?: string;
    align?: string;
    gap?: string;
    wrap?: string;
}

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? 'row'};
  justify-content: ${({ justify }) => justify ?? ''};
  align-items: ${({ align }) => align ?? ''};
  gap :${({gap}) => gap ?? ''};
  flex-wrap: ${({ wrap }) => wrap ?? 'nowrap'};
`;

interface ImageProps{
    width?: string;
    height?: string;
    margin?: string;
    marginTop?: string;
    marginBottom?: string;
    marginRigth?: string;
    marginLeft?: string;
    padding?: string;
    opacity?: string;

}
export const Image = styled.img<ImageProps>`
aspect-ratio: 1/1; 
width: ${({ width }) => width ?? ''};
height: ${({ height }) => height ?? ''};
margin: ${({ margin }) => margin ?? ''};
margin-top: ${({ marginTop }) => marginTop ?? ''};
margin-bottom: ${({ marginBottom}) => marginBottom ?? ''};
margin-right: ${({ marginRigth}) => marginRigth ?? '0.3em'};
margin-left: ${({ marginLeft}) => marginLeft ?? ''};
padding: ${({ padding }) => padding ?? ''};
opacity :${({opacity}) => opacity ?? '0.5'};
`;

interface GridItemProps {
gridArea?: string;
}
export const GridItem = styled.div<GridItemProps>`
grid-area: ${({ gridArea }) => gridArea ?? ''};
`;

export const Background = styled(Flex)`
  background: #FFFFFF;
  min-height: 100%;
  max-width: 100%;
  padding: 4em; 
`;


export const GreenText = styled.div`
color: #245653;
font-size: 1em;
`;

export const SmallText = styled.div`
color: #47474A;
font-size: 0.8em;
cursor: pointer;
`;

export const Line = styled.div`
  width: 1px; 
  height: 2em; 
  background-color: #A19C9C;
  margin-left: 0.8em;
  margin-right: 0.8em;
`;

export const SmallLine = styled.div`
  width: 0.8px; 
  height: 1.5em; 
  background-color: #A19C9C;
  margin-left: 0.5em;
  margin-right: 0.5em;
`;
interface CheckboxProps {
 place?: string;
 gridArea? :string;
  }

export const Checkbox = styled.input<CheckboxProps>`
  width: 1em;
  aspect-ratio: 1/1; 
  grid-area: ${({ gridArea}) =>   gridArea ?? 'checkbox'};
  place-self: ${({place}) =>  place ?? 'center'};
`;

interface TextProps {
family?: string;
weight?: string;
color?: string;
size?: string;
align?: string;
}

export const Text =styled(Box)<TextProps>`
font-family: ${({family}) => family ?? ''};
font-weight: ${({weight}) => weight ?? 'normal'};
color: ${({color}) => color ?? '#000'};
font-size: ${({size}) => size ?? '1em'};
text-align: ${({align}) => align ?? 'left'};
`;

export const BlueText = styled(Text)`
color :#344351;
font-weight: 500;
`;