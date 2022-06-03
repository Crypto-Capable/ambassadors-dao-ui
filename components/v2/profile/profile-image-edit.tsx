import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import { Camera } from 'phosphor-react';
import { useEffect, useState } from 'react';

const ImageEdit: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (image !== null) {
      const interval = setInterval(onOpen, 1000);
      return () => clearInterval(interval);
    }
  }, [image, onOpen]);

  const closeHandler = () => {
    setImage(null);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview Image!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {(() => {
              if (image) {
                return (
                  <Flex m="auto" justify="center" bgColor="black">
                    <Image
                      src={URL.createObjectURL(image)}
                      height="300px"
                      width="300px"
                      alt="preview image"
                    />
                  </Flex>
                );
              }
            })()}
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme="gray" mr={3} onClick={closeHandler}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        h="200px"
        w="200px"
        m="auto"
        backgroundImage="url('https://picsum.photos/200/200/?blur')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        align="center"
        justify="center"
      >
        <Input
          id="image-input"
          accept="image/*"
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
            }
          }}
        />
        <FormLabel m="0" htmlFor="image-input">
          <Tooltip label="Add image">
            <Box
              borderRadius="100px"
              _hover={{
                cursor: 'pointer',
                padding: '12px',
                bgColor: 'blackAlpha.600',
              }}
              bgColor="blackAlpha.800"
              opacity="0.5"
              padding="10px"
            >
              <Camera z="5" color="white" size={32}>
                <Input type="file" />
              </Camera>
            </Box>
          </Tooltip>
        </FormLabel>
      </Flex>
    </>
  );
};
export default ImageEdit;
