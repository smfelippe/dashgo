import { Flex, Button, Stack, Box, Text } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from "../components/Form/Input"
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("Informe seu e-mail").email("Informe um e-mail válido"),
  password: yup.string().required("Senha obrigatória"),
  loginError: yup.string()
})

export default function SignIn() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loginError } = useContext(AuthContext)

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values);
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // const data = values
  }

  return (
    <Flex w='100vw' h='100vh' align='center' justify='center'>
      <Flex w="100vw"
        h="100vh"
        align="center"
        justify="center"
      >
        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDirection="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              type="email"
              label="E-mail"
              value={email}
              error={errors.email}
              {...register('email')}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              value={password}
              error={errors.password}
              {...register('password')}
              onChange={e => setPassword(e.target.value)}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={isSubmitting}
          >Entrar
          </Button>

          <Text
            mt="2"
            fontSize="12"
            fontWeight="light"
          >
            * E-mail: dashgo@teste.com - Senha: 123456
          </Text>

          <Box
            display="flex"
            mt="2"
            justifyContent="center"
            fontSize="14"
            fontWeight="light"
            color="red.500">
            <Text>{loginError}</Text>
          </Box>

        </Flex>
      </Flex>
    </Flex>
  )
}
