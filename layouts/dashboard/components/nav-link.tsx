import { Link as ChakraLink } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';
import React from 'react';

type NavLinkProps = {
  active?: boolean;
} & LinkProps;

const NavLink: React.FC<NavLinkProps> = ({
  active,
  href,
  children,
  ...props
}) => {
  return (
    <Link href={href} passHref {...props}>
      <ChakraLink
        rounded="md"
        textDecoration="none"
        padding="4px 8px"
        fontSize="1.1rem"
        color="white"
        _hover={{
          backgroundColor: 'rgba(55, 55, 55, 0.2)',
        }}
        _focus={{
          backgroundColor: 'rgba(55, 55, 55, 0.2)',
        }}
        {...(active
          ? {
              backgroundColor: 'rgba(55, 55, 55, 0.2)',
              fontWeight: 'bold',
            }
          : {})}
      >
        {children}
      </ChakraLink>
    </Link>
  );
};

NavLink.defaultProps = {
  active: false,
};

export default NavLink;
