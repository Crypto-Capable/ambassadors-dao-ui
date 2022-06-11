import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { currentFormAtom } from '../../../atoms/form';
import data from '../../../pages/v2/data.json';
import { FormCreator } from './form-creator';
import { InsitutionForm } from './institution-form';
import { SideNav } from './side-nav';

const forms = [
  <FormCreator
    key="1"
    heading={data.About.heading}
    helperText={data.About.helperText}
    inputs={data.About.inputs}
  />,
  <InsitutionForm key="2" />,
  <FormCreator
    key="3"
    heading={data.Refferal.heading}
    helperText={data.Refferal.helperText}
    inputs={data.Refferal.inputs}
  />,
  <FormCreator
    key="4"
    heading={data.Discord.heading}
    helperText={data.Discord.helperText}
    inputs={data.Discord.inputs}
  />,
  <FormCreator
    key="5"
    heading={data.Finish.heading}
    helperText={data.Finish.helperText}
    inputs={data.Finish.inputs}
  />,
];

export const DisplayForm: React.FC = () => {
  const controlHandler = (action: number) => {
    setCurrentForm((e) => e + action);
  };
  const [currentForm, setCurrentForm] = useAtom(currentFormAtom);
  const ActiveForm = forms[currentForm];
  return (
    <Container p="0" maxW="min(80vw, 768px)">
      <Flex
        gap={{ md: '90px' }}
        overflowY="auto"
        h="75vh"
        w="100%"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <SideNav current_form={currentForm} />
        <VStack
          as="form"
          pt="50px"
          pb="100px"
          overflowY="auto"
          width={{ md: 'max(50%, 300px)', base: '100%' }}
          align="start"
          gap="6"
          color="#ffffff"
        >
          {ActiveForm}
        </VStack>
      </Flex>
      <Box
        pos="absolute"
        w={{ base: '80vw', md: 'calc(min(384px, min(80vw, 768px)/ 2))' }}
        bottom="0"
        m="auto"
        left={{
          base: '10vw',
          md: 'calc((100vw - min(80vw, 768px))/2 + 226px + 90px)',
        }}
        zIndex="500"
      >
        <Flex
          w="100%"
          backdropFilter="blur(2px)"
          justify="space-between"
          pb="3"
        >
          <IconButton
            variant="unstyled"
            color="black"
            bgColor="white"
            display="flex"
            _focus={{}}
            isRound
            onClick={() => controlHandler(-1)}
            aria-label="previous-form"
            icon={<CaretLeft size="20" />}
            visibility={currentForm === 0 ? 'hidden' : 'visible'}
          />
          <Button
            visibility={currentForm === 4 ? 'visible' : 'hidden'}
            variant="unstyled"
            color="black"
            bgColor="white"
            _focus={{}}
          >
            <Text px="15px">Submit</Text>
          </Button>
          <IconButton
            variant="unstyled"
            color="black"
            bgColor="white"
            display="flex"
            isRound
            onClick={() => controlHandler(+1)}
            aria-label="next-form"
            icon={<CaretRight size="20" />}
            visibility={currentForm === 4 ? 'hidden' : 'visible'}
          />
        </Flex>
      </Box>
    </Container>
  );
};
