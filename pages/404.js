import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";

export default function Custom404() {
    return(
        <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
           Page Not Found <br />
            <Text as={'span'} color={'green.400'}>
              404 error
            </Text>
          </Heading>
          </Stack>
          </Container>
    )
  }