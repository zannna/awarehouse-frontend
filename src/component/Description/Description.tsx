import { Background, TextContainer, Header, LogoContainer, DescriptionGreetingText, Logo, LoginButton, RegisterButton, Body, DescriptionText, DescriptionHeader } from './Description.styles';
import { Flex, Image } from '../../styles/globalStyles.styles';
import { useNavigate } from 'react-router-dom';
function Description() {
    const navigate = useNavigate();
    return (<Background direction="column">
        <Header>
            <LogoContainer direction='row' align="center">
                A<Logo>warehouse</Logo>
            </LogoContainer>
            <Flex justify='flex-end' gap='2em'>
                <LoginButton onClick={()=>navigate("/option")}>LOGIN</LoginButton>
                <RegisterButton onClick={()=>navigate("/register")}>REGISTER</RegisterButton>
            </Flex>
        </Header>
        <Body>
            <DescriptionGreetingText>Welcome to Awarehouse</DescriptionGreetingText>
            <TextContainer>
                <Image src="/warehouse4.webp" alt="warehouse" opacity='100%' height='20em' />
                <DescriptionText>
                    Awarehouse is a <b>sophisticated intuitive warehouse management tool</b> designed to provide comprehensive
                    support in organizing and optimizing warehouse processes. Awarehouse is your trusted partner in methodically <b>organizing and significantly optimizing</b>
                    the entirety of your warehouse operations. Our dynamic platform is equipped with an extensive suite of features that not only assist in the
                    <b> efficient management</b> of your inventory but also streamline resource allocation, order processing, and logistics coordination.
                </DescriptionText>
            </TextContainer>
            <DescriptionHeader>Explore the Benefits of Awarehouse</DescriptionHeader>
            <Flex gap='2em'>
                <Image src="/productivity.svg" alt="warehouse" opacity='100%' height='5em' />
                <DescriptionText>
                    Awarehouse gives you a clear and easy way to keep track of your items, so you can find what you need fast. Less time searching means more time getting things done, which makes your whole warehouse work better. Everything has its place, making your space neat and your work smooth. With Awarehouse, you spend less time looking and more time doing.
                </DescriptionText>
            </Flex>
            <Flex gap='2em'>
                <DescriptionText>
                    Awarehouse helps you make smart choices with simple reports and clear data. You get all the facts you need to decide what’s best for your warehouse. With better information, you can choose better and plan smarter. Our tools turn numbers into easy-to-understand info that guides your decisions.</DescriptionText>
                <Image src="/report.svg" alt="warehouse" opacity='100%' height='5em' />
            </Flex>
            <Flex gap='2em'>
                <Image src="/efficient.svg" alt="warehouse" opacity='100%' height='5em' />
                <DescriptionText>Awarehouse makes your work smoother, saving you money and time. With our system, you do more in less time, and that means your warehouse runs better. Say goodbye to wasted time and hello to a workflow that just flows. Awarehouse is all about doing things quicker and smarter.</DescriptionText>
            </Flex>

        </Body>
    </Background>);

}
export default Description;
