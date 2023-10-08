import { FC, useState ,ChangeEvent} from 'react';
import { Box, Button, Center, Container, FormControl, FormLabel, Heading, Input, Text, VStack , HStack} from '@chakra-ui/react';
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { publicKey } from '@project-serum/anchor/dist/cjs/utils';
import request from 'request'


const Uploading: FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  function upload(id: string, certificate: File): void {
    const formData = new FormData();
    formData.append('files', certificate);
    formData.append('name', id);
    formData.append('isDirectory', 'false');

    const options: request.OptionsWithUri = {
      method: 'POST',
      uri: 'https://app.zeeve.io/zdfs-api/api/v1/file/upload',
      headers: {
        'Authorization': 'Bearer your_access_token_here',
      },
      formData: formData,
    };

    console.log("uploading");

    request(options, function (error, response) {
        if (error) {
            console.log(error)
        } else {
            const result = response.body;
            const final = JSON.parse(result);
            console.log(final);
        }
    });
}

  async function metadataprep(id: string, certificate: File, issuerAddress: string): Promise<string> {
    const filecid = await upload(id, certificate);
    const imageurl = "https://app.zeeve.io/zdfs-gateway/ipfs/" + filecid;
    const metadata = `{
        "id": "${id}",
        "image": "${imageurl}",
        "creators": [{
            "address": "${issuerAddress}",
            "verified": true
        }]
    }`;
    
    return metadata;
    }


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedImage(file || null);
  };

  const handleSendClick = () => {
    if (!selectedImage) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        const base64Image = reader.result.split(',')[1];
        setImageUrl(base64Image);
      }
    };
    reader.readAsDataURL(selectedImage);

    if(imageUrl!= null && selectedImage!=null){
      const final_metadata = metadataprep('1',selectedImage,'1231')

    }
    else{
      console.log("metadataprep not called")
    }
  };

    return (
        <Container>
            <Heading
            color="white"
            as="h1"
            size="3xl"
            noOfLines={2}
            textAlign="center"
        >
            CERTIFICATE UPLOAD     
        </Heading>
            <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleSendClick}>Upload</button>
           </div>
        </Container>
    )
}

export default Uploading