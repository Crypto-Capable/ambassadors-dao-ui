import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useAtom, useAtomValue } from 'jotai';
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

const forms = [
  <AboutForm key="1" />,
  <InsitutionForm key="2" />,
  <ReferralForm key="3" />,
  <DiscordForm key="4" />,
  <FinishForm key="5" />,
];

const CrewSignUp: NextPage = () => {
  const [formValues, setFormValues] = useAtom(FormValuesAtom);
  const [formNumber, setFormNumber] = useState(formValues.currentForm);

  const ActiveForm = forms[formNumber];
  console.log(formNumber);
  useEffect(() => {
    formValues.currentForm = formNumber;
    setFormValues({ ...formValues });
  }, [formNumber]);
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
      <GridItem
        bgImage="url('/CrewSignUpBg.png')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        area="header"
      >
        <Flex
          pl="100px"
          pb="20px"
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

      <GridItem area="nav">
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
        {ActiveForm}
      </GridItem>
      <GridItem w="100%" area="control" pb="4">
        <Flex
          w="80%"
          bgColor="black"
          //opacity="0.2"
          // backdropBlur="20px"
          // backdropSaturate="160%"
          justifyContent="space-evenly"
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
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default CrewSignUp;
