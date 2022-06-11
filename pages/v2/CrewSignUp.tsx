import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { FormValuesAtom } from '../../atoms/form';
import {
  AboutForm,
  DiscordForm,
  FinishForm,
  FormContainer,
  FormCreator,
  InsitutionForm,
  ReferralForm,
  SideNav,
} from '../../components/v2/sign-up';
import data from './data.json';
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

const CrewSignUp: NextPage = () => {
  const [formValues, setFormValues] = useAtom(FormValuesAtom);
  const ActiveForm = forms[formValues.current_form];

  const controlHandler = (action: number) =>
    setFormValues({
      ...formValues,
      current_form: formValues.current_form + action,
    });

  return (
    <Box minH="100vh" bgColor="black" color="white">
      <Box
        as="header"
        bgImage="url('/CrewSignUpBg.png')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        height="25vh"
      >
        {/* Box to apply gradient */}
        <Box
          h="100%"
          bgGradient="linear(357.84deg, #070606 -3.45%, rgba(217, 217, 217, 0) 98.29%)"
        >
          <Flex
            h="100%"
            flexDir="column"
            maxW="min(80vw, 768px)"
            justify="flex-end"
            margin="auto"
            pb="4"
          >
            <Heading as="h1">Crew Signup</Heading>
            <Text>Fill the form to join as a Member in the Community </Text>
          </Flex>
        </Box>
      </Box>

      <Container p="0" maxW="min(80vw, 768px)">
        <Flex
          gap={{ md: '90px' }}
          overflowY="auto"
          h="75vh"
          w="100%"
          flexDir={{ base: 'column', md: 'row' }}
        >
          <SideNav />
          <FormContainer>{ActiveForm}</FormContainer>
        </Flex>
      </Container>
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
            visibility={formValues.current_form === 0 ? 'hidden' : 'visible'}
          />
          <Button
            visibility={formValues.current_form === 4 ? 'visible' : 'hidden'}
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
            visibility={formValues.current_form === 4 ? 'hidden' : 'visible'}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default CrewSignUp;
