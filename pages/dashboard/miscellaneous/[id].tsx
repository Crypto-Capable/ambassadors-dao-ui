import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useContractContext } from '../../../context/contract-context';
import {
  LayoutPage,
  MiscellaneousType,
  Payout,
  Tabs,
  TypesOfMiscellaneous,
} from '../../../types';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link as ChakraLink,
  Spinner,
} from '@chakra-ui/react';
import StatusBadge from '../../../components/status-badge';
import { Plus } from 'phosphor-react';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import { PayoutItemDescription } from '../../../components/dashboard/payout-item-description';
import { CABonusItem } from '../../../components/dashboard/miscellaneous/ca-bonus-item';
import { CampusSigningMOUItem } from '../../../components/dashboard/miscellaneous/campus-signing-mou-item';
import { ContentCreationMiscellaneousItem } from '../../../components/dashboard/miscellaneous/content-creation-bounty-item';

const MiscellaneousItem: NextPage = () => {
  const { id } = useRouter().query as { id: string };
  const { contract } = useContractContext()!;
  const [misc, setMisc] = useState<Payout<MiscellaneousType> | null>(null);

  useEffect(() => {
    contract.get_miscellaneous({ id: Number(id) }).then(setMisc);

    return () => {
      setMisc(null);
    };
  }, [contract, id, setMisc]);

  const isLoading = misc === null;
  return (
    <>
      <Head>
        <title>All Proposals</title>
      </Head>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Heading mr={2} as="h2" fontSize="1.75rem">
            Viewing proposal {id}
          </Heading>
          {misc && <StatusBadge status={misc.status} />}
        </Flex>
        <Link href={`/dashboard/${Tabs.MISCELLANEOUS}/new`} passHref>
          <Button
            size="sm"
            rightIcon={<Plus weight="bold" />}
            variant="outline"
            as={ChakraLink}
          >
            Create New
          </Button>
        </Link>
      </Flex>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Box mt="8">
          <PayoutItemDescription
            proposer={misc.proposer}
            description={misc.description}
          />
          {(() => {
            if (TypesOfMiscellaneous.CAMPUS_AMBASSADOR_BONUS in misc.info) {
              return (
                <CABonusItem
                  item={misc.info[TypesOfMiscellaneous.CAMPUS_AMBASSADOR_BONUS]}
                />
              );
            } else if (TypesOfMiscellaneous.CAMPUS_SIGNING_MOU in misc.info) {
              return (
                <CampusSigningMOUItem
                  item={misc.info[TypesOfMiscellaneous.CAMPUS_SIGNING_MOU]}
                />
              );
            } else if (
              TypesOfMiscellaneous.CONTENT_CREATION_BOUNTY in misc.info
            ) {
              return (
                <ContentCreationMiscellaneousItem
                  item={misc.info[TypesOfMiscellaneous.CONTENT_CREATION_BOUNTY]}
                />
              );
            }
          })()}
        </Box>
      )}
    </>
  );
};

const MiscellaneousItemPage = withContract(MiscellaneousItem) as LayoutPage;
MiscellaneousItemPage.layout = Layouts.DASHBOARD;

export default MiscellaneousItemPage;
