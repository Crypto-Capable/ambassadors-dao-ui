import {
  ButtonSpinner,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { start } from 'repl';
export type college = {
  id: number;
  name: string;
};
const colleges: college[] = [
  { id: 1, name: 'University of Illinois at Urbana-Champaign' },
  { id: 2, name: 'University of Illinois at Chicago' },
  { id: 3, name: 'University of Illinois at Springfield' },
  { id: 4, name: 'St. Louis University' },
  { id: 5, name: 'Massachusetts Institute of Technology' },
];
async function delay(ms: number) {
  // return await for better async stack trace support in case of errors.
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

const startAsync = async () => {
  await delay(500);
  return colleges;
};

const SearchList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [apiColleges, setApiColleges] = useState<college[] | null>([]);
  useEffect(() => {
    if (inputText != '') {
      const timer = setTimeout(async () => {
        setLoading(true);
        const data = await startAsync();
        setApiColleges(data);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else setApiColleges(null);
  }, [inputText]);
  // componentDidMount
  // componentDidUnmount
  return (
    <>
      <FormControl isRequired>
        <FormLabel htmlFor="college">College</FormLabel>
        <InputGroup>
          <Input
            type="text"
            id="college"
            placeholder="Select your college..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <InputRightElement>{loading && <ButtonSpinner />}</InputRightElement>
        </InputGroup>

        {apiColleges !== null &&
          apiColleges.map((college) => (
            <Text
              marginTop="0px"
              bgColor={'gray.100'}
              _hover={{
                bgColor: 'gray.300',
                cursor: 'pointer',
              }}
              key={college.name}
            >
              {college.name}
            </Text>
          ))}
      </FormControl>
    </>
  );
};

export default SearchList;
