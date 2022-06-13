import React from 'react';
import { Box, Flex, Input, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextImage from 'next/image'
// import { useSWRConfig } from 'swr'

import { auth } from '../../lib/mutations'

const AuthForm: React.FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password });
    setIsLoading(false);
    router.push('/');
  }

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
      >
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box
          w={{base: '100%', md: '380px'}}
          marginX={{base: "4", md: "0"}}
          padding={{base: "4", md: "10"}}
          bg="gray.900"
          borderRadius="6px"
        >
          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <FormControl marginBottom="6">
              <FormLabel htmlFor='email'>Email address</FormLabel>
              <Input
                placeholder="Enter email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                id='email'
              />
            </FormControl>

            {/* PASSWORD */}
            <FormControl marginBottom="6">
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                placeholder="Enter password"
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                id='password'
              />
            </FormControl>

            {/* SUBMIT */}
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                '&:hover': {
                  bg: 'green.300',
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
