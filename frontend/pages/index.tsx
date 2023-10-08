import { Box, Center, Spacer, Stack } from "@chakra-ui/react"
import Disconnected from '../components/Disconnected'
import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import NavBar from "../components/NavBar"
import { useWallet } from "@solana/wallet-adapter-react"
import Verifying from "../components/Verifying"

const Home: NextPage = () => {
  const { connected } = useWallet()
  return (
    <div className={styles.container}>
      <Head>
        <title>Certiguard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        w="full"
        h="calc(100vh)"
        bgImage={"url(/home-background.svg)"}
        backgroundPosition="center"
      >
        <Stack w="full" h="calc(100vh)" justify="center">
          <NavBar />
          <Spacer />
          <Center>
          {connected ? <Verifying/> : <Disconnected />}
          </Center>
          <Spacer />

          <Center>
            <Box marginBottom={4} color="white">
                Built by Team Magnum
            </Box>
          </Center>
        </Stack>
      </Box>
    </div>
  )
}

export default Home