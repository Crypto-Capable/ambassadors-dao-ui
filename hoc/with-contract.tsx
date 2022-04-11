import { Center, Spinner } from '@chakra-ui/react';
import { useContractContext } from '../context/contract-context';
import { WithContractChildProps } from '../types';

const withContract = (Component: React.FC<WithContractChildProps>) => {
  const ContractWrapperComponent: React.FC = (props) => {
    const contract = useContractContext();

    if (!contract) {
      return (
        <Center width="full" height="full">
          <Spinner />
        </Center>
      );
    }

    return (
      <Component
        isCouncilMember={contract.isCouncilMember}
        contract={contract.contract}
        {...props}
      />
    );
  };

  return ContractWrapperComponent;
};

export default withContract;
