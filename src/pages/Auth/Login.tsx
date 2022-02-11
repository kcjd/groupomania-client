import { SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'

import { Button, Heading, Image, Input, Link, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import logoIcon from '../../assets/images/logo-icon.svg'
import FormControl from '../../components/FormControl'
import { LoginFields } from '../../types/types'
import { loginSchema } from '../../validation/validation'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFields>({ resolver: yupResolver(loginSchema) })

  const onSubmit: SubmitHandler<LoginFields> = (data) => console.log(data)

  return (
    <>
      <VStack spacing={4} mb={16}>
        <Image src={logoIcon} alt="" boxSize={8} />
        <Heading as="h1" variant="h1">
          Connexion
        </Heading>
      </VStack>

      <VStack as="form" spacing={6} align="stretch" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl id="email" label="Email" error={errors.email}>
          <Input id="email" type="email" size="lg" {...register('email')} />
        </FormControl>

        <FormControl id="password" label="Mot de passe" error={errors.password}>
          <Input id="password" type="password" size="lg" {...register('password')} />
        </FormControl>

        <Button type="submit" size="lg" colorScheme="brand" isLoading={isSubmitting} isFullWidth>
          Connexion
        </Button>
      </VStack>

      <Text align="center" mt={8}>
        Vous êtes nouveau ?{' '}
        <Link as={RouterLink} to="/signup" variant="primary">
          Créer un compte
        </Link>
      </Text>
    </>
  )
}

export default Login