import { Box, Text, Center, LinkBox, LinkOverlay } from "@chakra-ui/react";

import { Header } from "../../components/Header";

export default function Automation() {
  return (
    <Box alignItems="center">
      <Header />
      <Center mt="200" color='white' flexDirection="column">
        <Text fontSize={40}>Página em construção</Text>
        <LinkBox display="flex" rounded="md" bg="pink.500" color="white" alignItems="center" px={6} h={10}>
          <LinkOverlay href="/dashboard">Voltar</LinkOverlay>
        </LinkBox>
      </Center>
    </Box >
  )
}