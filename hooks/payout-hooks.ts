import { captureException } from '@sentry/nextjs';
import { useImmerAtom } from 'jotai/immer';
import { useState, useEffect, useMemo } from 'react';
import { proposalsAtom } from '../atoms';
import { usePayoutsHook, ProposalType, usePayoutHook } from '../types';
import getSeconds from '../util/get-seconds';

/**
 * It extracts objects from the cache based on their keys
 *
 * If the key is in the range (from, from + limit) inclusive
 * the returning array will containt that value
 *
 */
function extractRangeOfItems<T>(
  cache: Record<number, T>,
  from: number,
  limit: number
) {
  const result: T[] = [];
  for (let i = from; i <= limit; i += 1) {
    const o = cache[i];
    if (o !== undefined) result.push(o);
    else if (i > from) break;
  }
  return result;
}

export const useProposals: usePayoutsHook<ProposalType> = ({
  contract,
  from,
  limit,
}) => {
  const [proposals, setProposals] = useImmerAtom(proposalsAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const loadProposals = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const res = await contract.get_all_proposals({
          from_index: from,
          limit,
        });
        setProposals((draft) => {
          res.forEach((payout) => {
            draft[payout.id] = {
              data: payout,
              updatedAt: getSeconds(),
            };
          });
        });
      } catch (error) {
        captureException(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadProposals();
  }, [contract, setProposals, from, limit]);

  const data = useMemo(() => {
    const slice = extractRangeOfItems(proposals, from, limit);
    if (slice.length === 0) {
      return undefined;
    } else {
      return slice.map(({ data }) => data);
    }
  }, [proposals, from, limit]);

  return {
    data,
    loading,
    error,
  } as const;
};

export const useProposal: usePayoutHook<ProposalType> = ({ contract, id }) => {
  const [proposals, setProposals] = useImmerAtom(proposalsAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const loadProposals = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const res = await contract.get_proposal({
          id,
        });
        setProposals((draft) => {
          draft[res.id] = {
            data: res,
            updatedAt: getSeconds(),
          };
        });
      } catch (error) {
        captureException(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadProposals();
  }, [contract, setProposals, id]);

  const data = useMemo(() => {
    if (proposals[id]) {
      return proposals[id].data;
    }
    return undefined;
  }, [proposals, id]);

  return {
    data,
    loading,
    error,
  } as const;
};
