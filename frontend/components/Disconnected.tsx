import { FC, MouseEventHandler, useCallback,useState } from "react"
import {
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"

const Disconnected: FC = () => {
    const modalState = useWalletModal()
    const { wallet, connect } = useWallet()
    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        if (event.defaultPrevented) {
          return
        }
        if (!wallet) {
          modalState.setVisible(true)
        } else {
          connect().catch(() => {})
        }
      },
      [wallet, connect, modalState]
    )

  return (
    <Container>
      <VStack spacing={10}>
        <Heading
          color="white"
          as="h1"
          size="3xl"
          noOfLines={3}
          textAlign="center"
        >
          CERTIGUARD      
        </Heading>
        <Heading
          color="white"
          as="h2"
          size="2xl"
          noOfLines={3}
          textAlign="center"
        >       
          Protect and Issue Certificates on Solana
        </Heading>
        
        <HStack spacing={20}>
        <Button
          bgColor="accent"
          color="white"
          maxW="380px"
          onClick={handleClick}
        >
          <HStack>
            <Text>Dive In</Text>
            <ArrowForwardIcon />
          </HStack>
        </Button>
        
        </HStack>
        </VStack>
      
    </Container>
  )
}

export default Disconnected