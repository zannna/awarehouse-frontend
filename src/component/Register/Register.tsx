import { Flex, Text, BlueText } from "../../styles/globalStyles.styles";
import { LogoContainer, Background, LoginContainer, Input, GreyButton, BlueButton, InputWrapper, InputText } from "./Register.styles";
import { useEffect, useState } from "react";
import { createRegistration, CreateRegistrationData } from "./RegisterApi";
import { useNavigate } from 'react-router-dom';
function Register() {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState<boolean | undefined>(undefined);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState<boolean | undefined>(undefined);
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [validRepeatedPassword, setValidRepeatedPassword] = useState<boolean | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    function changeEmail(email: string) {
        setTimeout(() => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = pattern.test(email);
            setValidEmail(isValid);
            if (isValid) {
                setEmail(email);
            }
        }, 3000);

    }


    function changePassword(password: string) {
        setTimeout(() => {
            const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
            const isValid = pattern.test(password);
            setValidPassword(isValid);
            if (isValid) {
                setPassword(password);
            }
        }, 4000);
    }

    useEffect(() => {
        console.log(validPassword);
    }, [validPassword])


    function changeRepeatedPassword(repetedPassword: string) {
        setTimeout(() => {
            const isValid = password === repetedPassword;
            setValidRepeatedPassword(isValid);
            if (isValid) {
                setRepeatedPassword(repetedPassword);
            }
        }, 1000);
    }

    async function sendRegisterRequest() {
        if (email === "" || name === "" || surname === "" || password === "" || repeatedPassword === "") {
            setError("All fields are required");
            return;
        }
        else if (validEmail || validPassword || validRepeatedPassword) {
            const registrationData: CreateRegistrationData = {
                email: email,
                firstName: name,
                surname: surname,
                password: password
            }
            const resp = await createRegistration(registrationData);
            navigate('/', { replace: true });
        }
    }
    useEffect(() => {
        console.log(validRepeatedPassword);
    }, [validRepeatedPassword])
    return (<Background>
        <LoginContainer>
            <LogoContainer>
                A<Text size='0.5em'>warehouse</Text>
            </LogoContainer>
            <BlueText>login</BlueText>
            < InputWrapper>
                <InputText>email</InputText>
                <Input isValid={validEmail}
                    onChange={event => changeEmail(event.target.value)}
                ></Input>
            </ InputWrapper>
            <InputWrapper>
                <InputText>name</InputText>
                <Input isValid={true}
                    onChange={event => setName(event.target.value)}
                ></Input>
            </InputWrapper>
            <InputWrapper>
                <InputText>surname</InputText>
                <Input
                    isValid={true}
                    onChange={event => setSurname(event.target.value)}
                ></Input>
            </InputWrapper>
            <InputWrapper>
                <InputText>password</InputText>
                <Input
                    isValid={validPassword}
                    onChange={event => changePassword(event.target.value)}
                ></Input>
            </InputWrapper>
            {!validPassword && (
                <Text size='0.8em' color='red'>
                    Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character.
                </Text>
            )}
            <InputWrapper>
                <InputText>repeat password</InputText>
                <Input
                    isValid={validRepeatedPassword}
                    onChange={event => changeRepeatedPassword(event.target.value)}
                ></Input>
            </InputWrapper>
            {!validRepeatedPassword && (
                <Text size='0.8em' color='red'>
                    The repeated password does not match the original.
                </Text>
            )}
            <Text size='0.7em' color='red'>{error != undefined ? error : ''}</Text>
            <Flex justify='center' gap="3em" width="50%" marginTop="2em" marginBottom="3em">
                <GreyButton>CANCEL</GreyButton>
                <BlueButton onClick={() => sendRegisterRequest()}>LOGIN</BlueButton>
            </Flex>
        </LoginContainer>
    </Background>);
}

export default Register;