import { Center, Spinner } from '@chakra-ui/react';
import { useContractContext } from '../context/contract-context';
import { CustomContract } from '../types';

type AcceptsContractProps = {
  contract: CustomContract;
};

const withContract = (Component: React.FC<AcceptsContractProps>) => {
  const ContractWrapperComponent: React.FC = (props) => {
    const contract = useContractContext();

    if (!contract) {
      return (
        <Center width="full" height="full">
          <Spinner />
        </Center>
      );
    }

    return <Component contract={contract.contract} {...props} />;
  };

  return ContractWrapperComponent;
};

export default withContract;
