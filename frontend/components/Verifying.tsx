import { FC, useState } from 'react';
import { Box, Button, Center, Container, FormControl, FormLabel, Heading, Input, Text, VStack , HStack} from '@chakra-ui/react';
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { publicKey } from '@project-serum/anchor/dist/cjs/utils';


const Verifying: FC = () => {
    const[verified,setVerified] = useState(false)
    const[authority,setAuthority] = useState(false)
    const[cid,setCid] = useState()

    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (cid != ""){
            setVerified(true)
        }
        
        console.log('Certificate ID:', cid);
        
      };

  return (
    <Container>
        {!verified && (
        <VStack spacing={10}>
        <Heading
            color="white"
            as="h1"
            size="3xl"
            noOfLines={2}
            textAlign="center"
        >
            CERTIFICATE LOOKUP      
        </Heading>
        <form>
            <FormControl id="certificateId">
            <FormLabel>
                <Heading
                    color="white"
                    as="h2"
                    size="xl"
                    noOfLines={1}
                    textAlign="center"
                    >
                        Enter Certificate ID     
                    </Heading>
            </FormLabel>
            <VStack spacing={10}>
            <Input
            marginTop={3}
            type="text"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            />
            </VStack>
            </FormControl>
            <VStack spacing={20}>
                <Button
                    marginTop={5}
                    bgColor="accent"
                    color="white"
                    maxW="380px"
                    onClick={handleSubmit}
                    >
                    <HStack>
                        <Text>Verify a Certificate</Text>
                        <ArrowForwardIcon />
                    </HStack>
                    </Button>
                    </VStack>
            </form>
            </VStack>
        )}
        {verified && (
            <Box>
            <Heading as="h2" size="md">
                        Certificate Image:
                    </Heading>
            <img src={image_url} alt="Token Image" width="200" />
            {creator_address === '2RtGg6fsFiiF1EQzHqbd66AhW7R5bWeQGpTbv2UMkCdW' ? (
                <Text color="green" fontSize="xl">
                    The Certificate is Valid
                </Text>
            ) : (
                <Text color="red" fontSize="xl">
                    The Certificate is Invalid or Fake
                </Text>
            )}
            <Heading as="h2" size="md">
                Creator's Address:
            </Heading>
            <Text>
                {authority? (
                    <span style={{ color: 'green' }}>Verified issuing authority</span>
                ) : (
                    <span style={{ color: 'red' }}>Unverified issuing authority</span>
                )}
            </Text>
        </Box>
        )}
        </Container>      
            
    );
}
export default Verifying