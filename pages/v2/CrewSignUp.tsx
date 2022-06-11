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
import { useEffect, useState } from 'react';
import { FormValuesAtom } from '../../atoms/form';
import {
  AboutForm,
  DiscordForm,
  FinishForm,
  InsitutionForm,
  ReferralForm,
  SideNav,
} from '../../components/v2/sign-up';
import FormContainer from '../../components/v2/sign-up/form-container';

const forms = [
  <AboutForm key="1" />,
  <InsitutionForm key="2" />,
  <ReferralForm key="3" />,
  <DiscordForm key="4" />,
  <FinishForm key="5" />,
];

/*
Responsive Grid 

const ResponsiveGrid: React.FC = ({ children }) => {
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  if (isMobile)
    return (
      <Grid
        templateAreas={`"header"
								"nav"
								"main"
								"control"`}
        bg="black"
        gridTemplateRows="1fr auto 3fr auto"
        gridTemplateColumns="1fr"
        maxH="100vh"
        minH="100vh"
        overflowY="scroll"
      >
        {children}
      </Grid>
    );
  else
    return (
      <Grid
        templateAreas={`"header header"
                  "nav main"
									"nav control"`}
        bg="black"
        gridTemplateRows={'minmax(175px,1fr)  4fr '}
        gridTemplateColumns={'minmax(400px, 1fr) 2fr'}
        maxH="100vh"
        overflowY="scroll"
      >
        {children}
      </Grid>
    );
};
*/

const CrewSignUp: NextPage = () => {
  const [formNumber, setFormNumber] = useState(0);
  const ActiveForm = forms[formNumber];
  const [formValues, setFormValues] = useAtom(FormValuesAtom);

  useEffect(() => {
    formValues.currentForm = formNumber;
    setFormValues({ ...formValues });
  }, [formNumber]);
  /*
  return (
    <ResponsiveGrid>
      <GridItem
        bgImage="url('/CrewSignUpBg.png')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        area="header"
      >
        <Flex
          // pl="100px"
          pb="20px"
          px="20px"
          w="100%"
          h="100%"
          // bgGradient="linear(357.84deg, #070606 -3.45%, rgba(217, 217, 217, 0) 98.29%)"
          background={
            'linear-gradient(357.84deg, #070606 -3.45%, rgba(217, 217, 217, 0) 98.29%)'
          }
          flexDir="column"
          justifyContent="flex-end"
        >
          <Heading
            as="h2"
            fontFamily="Space Grotesk"
            fontSize="4xl"
            color="white"
          >
            Crew Signup
          </Heading>
          <Text size="sm" fontWeight="300" color="white">
            Fill the form to join as a Member in the Community
          </Text>
        </Flex>
      </GridItem>

      <GridItem display="flex" area="nav">
        <SideNav />
      </GridItem>
      <GridItem
        fontWeight="300"
        fontFamily="Work Sans"
        overflowY="scroll"
        mt="4"
        mb="4"
        bg="black"
        area="main"
      >
        <FormContainer>{ActiveForm}</FormContainer>
      </GridItem>
      <GridItem
        display="flex"
        w={isMobile ? '100%' : '80%'}
        justifyContent="space-evenly"
        area="control"
        pb="4"
      >
        {formNumber === 0 ? (
          <Box
            bgColor="white"
            borderRadius="20px"
            p="5px"
            onClick={() => setFormNumber((e) => e - 1)}
            _hover={{
              cursor: 'pointer',
            }}
            visibility="hidden"
          >
            <CaretLeft color="black" size="32" />
          </Box>
        ) : (
          <Box
            bgColor="white"
            borderRadius="20px"
            p="5px"
            onClick={() => setFormNumber((e) => e - 1)}
            _hover={{
              cursor: 'pointer',
            }}
          >
            <CaretLeft color="black" size="32" />
          </Box>
        )}

        <Box
          bgColor="white"
          borderRadius="20px"
          p="5px"
          onClick={() => setFormNumber((e) => e + 1)}
          _hover={{
            cursor: 'pointer',
          }}
        >
          <CaretRight color="black" size="32" />
        </Box>
      </GridItem>
    </ResponsiveGrid>
  );
	*/

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

      <Container p="0" bg="black" maxW="min(80vw, 768px)">
        <Flex
          gap={{ md: '90px' }}
          overflowY="auto"
          h="75vh"
          w={'100%'}
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
            onClick={() => setFormNumber((e) => e - 1)}
            aria-label="previous-form"
            icon={<CaretLeft size="20" />}
            visibility={formNumber === 0 ? 'hidden' : 'visible'}
          />
          <Button
            visibility={formNumber === 4 ? 'visible' : 'hidden'}
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
            onClick={() => setFormNumber((e) => e + 1)}
            aria-label="next-form"
            icon={<CaretRight size="20" />}
            visibility={formNumber === 4 ? 'hidden' : 'visible'}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default CrewSignUp;
