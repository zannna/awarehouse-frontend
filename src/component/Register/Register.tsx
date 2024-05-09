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
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = pattern.test(email);
            setEmail(email);
            setTimeout(() => {
                setValidEmail(isValid);
            }, 2000); 

    }

    function changePassword(password: string) {
            const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
            const isValid = pattern.test(password);
            setPassword(password);
            
            setTimeout(() => {
                setValidPassword(isValid);
            }, 2000); 
    }

    function changeRepeatedPassword(repetedPassword: string) {
            const isValid = password === repetedPassword;
            setRepeatedPassword(repetedPassword);
            setTimeout(() => {
                setValidRepeatedPassword(isValid);
            }, 2000); 
    }

    async function sendRegisterRequest() {
        if(!validEmail){
            setError("Email is not proper");
            return;
        }
        if(!validPassword){
            setError("Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character.");
            return;
        }
        if(!validRepeatedPassword || repeatedPassword !== password){
            setError("Repeated password is not proper");
            return;
        }
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
            navigate('/option', { replace: true });
        }
    }

    return (<Background>
        <LoginContainer>
            <LogoContainer>
                A<Text size='0.5em'>warehouse</Text>
            </LogoContainer>
            <BlueText>register</BlueText>
            < InputWrapper>
                <InputText>email</InputText>
                <Input isValid={validEmail}
                    onChange={event => changeEmail(event.target.value)}
                ></Input>
            </ InputWrapper>
            {email!='' && validEmail!=undefined && !validEmail && (
                <Text size='0.8em' color='red'>
                   Email is not proper 
                 </Text>
            )}
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
                    type="password"
                    isValid={validPassword}
                    onChange={event => changePassword(event.target.value)}
                ></Input>
            </InputWrapper>
            {password!='' && validPassword!=undefined && !validPassword && (
                <Text size='0.8em' color='red'>
                    Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character.
                </Text>
            )}
            <InputWrapper>
                <InputText>repeat password</InputText>
                <Input
                    type="password"
                    isValid={validRepeatedPassword}
                    onChange={event => changeRepeatedPassword(event.target.value)}
                ></Input>
            </InputWrapper>
            {repeatedPassword!='' && validRepeatedPassword!=undefined && !validRepeatedPassword && (
                <Text size='0.8em' color='red'>
                    The repeated password does not match the original.
                </Text>
            )}
            <Text size='0.7em' color='red'>{error != undefined ? error : ''}</Text>
            <Flex justify='center' gap="3em" width="50%" marginTop="2em" marginBottom="3em">
                <GreyButton onClick={()=>{navigate("/")}}>CANCEL</GreyButton>
                <BlueButton onClick={() => sendRegisterRequest()}>REGISTER</BlueButton>
            </Flex>
        </LoginContainer>
    </Background>);
}

export default Register;