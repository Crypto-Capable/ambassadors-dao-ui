import { useMediaQuery, Button, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { Plus } from 'phosphor-react';

export type CreateNewButtonProps = {
  href: string;
};

export const CreateNewButton: React.FC<CreateNewButtonProps> = ({ href }) => {
  const [isLargerThan480] = useMediaQuery('(min-width: 520px)');

  return (
    <>
      <Link href={href} passHref>
        <Button
          size="sm"
          rightIcon={<Plus weight="bold" />}
          iconSpacing={!isLargerThan480 ? '0' : '2'}
          variant="outline"
          as={ChakraLink}
        >
          {isLargerThan480 ? 'Create New' : ''}
        </Button>
      </Link>
    </>
  );
};
