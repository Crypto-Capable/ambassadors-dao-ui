import { captureException } from '@sentry/nextjs';
import { PrimitiveAtom } from 'jotai';
import { useImmerAtom } from 'jotai/immer';
import { useState, useEffect, useMemo } from 'react';
import {
  bountiesAtom,
  miscellaneousAtom,
  proposalsAtom,
  referralsAtom,
} from '../atoms';
import {
  usePayoutsHook,
  usePayoutHook,
  CacheEntry,
  Payout,
  TypesOfPayouts,
} from '../types';
import getSeconds from '../util/get-seconds';

/**
 * It extracts objects from the cache based on their keys
 *
 * If the key is in the range (from, from + limit) inclusive
 * the returning array will contain that value
 *
 */
function extractRangeOfItems<T>(
  cache: Record<number, T>,
  from: number,
  limit: number
) {
  const result: T[] = [];
  for (let i = from; i < from + limit; i += 1) {
    const o = cache[i];
    if (o !== undefined) result.push(o);
    else if (i > from) break;
  }
  return result;
}

function createUsePayoutsHook<T extends TypesOfPayouts>(
  atom: PrimitiveAtom<Record<number, CacheEntry<Payout<T>>>>,
  fnName:
    | 'get_all_proposals'
    | 'get_all_referrals'
    | 'get_all_bounties'
    | 'get_all_miscellaneous'
): usePayoutsHook<T> {
  const usePayouts: usePayoutsHook<T> = ({ contract, from, limit }) => {
    const [payouts, setPayouts] = useImmerAtom(atom);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>();

    useEffect(() => {
      const loadProposals = async () => {
        setLoading(true);
        setError(undefined);
        try {
          const res = await contract[fnName]({
            from_index: from,
            limit,
          });
          setPayouts((draft) => {
            res.forEach((payout) => {
              draft[payout.id] = {
                data: payout as any,
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
    }, [contract, setPayouts, from, limit]);

    const data = useMemo(() => {
      const slice = extractRangeOfItems(payouts, from, limit);
      if (slice.length === 0) {
        if (loading) {
          return undefined;
        }
        return [];
      } else {
        return slice.map(({ data }) => data);
      }
    }, [payouts, from, limit, loading]);

    return {
      data,
      loading,
      error,
    } as const;
  };

  return usePayouts;
}

export const useProposals = createUsePayoutsHook(
  proposalsAtom,
  'get_all_proposals'
);

export const useBounties = createUsePayoutsHook(
  bountiesAtom,
  'get_all_bounties'
);

export const useReferrals = createUsePayoutsHook(
  referralsAtom,
  'get_all_referrals'
);

export const useMiscellanea = createUsePayoutsHook(
  miscellaneousAtom,
  'get_all_miscellaneous'
);

function createUsePayoutHook<T extends TypesOfPayouts>(
  atom: PrimitiveAtom<Record<number, CacheEntry<Payout<T>>>>,
  fnName: 'get_proposal' | 'get_referral' | 'get_bounty' | 'get_miscellaneous'
): usePayoutHook<T> {
  const usePayout: usePayoutHook<T> = ({ contract, id }) => {
    const [payouts, setPayouts] = useImmerAtom(atom);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>();

    useEffect(() => {
      const loadProposals = async () => {
        setLoading(true);
        setError(undefined);
        try {
          const res = await contract[fnName]({
            id,
          });
          setPayouts((draft) => {
            draft[res.id] = {
              data: res as any,
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
    }, [contract, setPayouts, id]);

    const data = useMemo(() => {
      if (payouts[id]) {
        return payouts[id].data;
      }
      return undefined;
    }, [payouts, id]);

    return {
      data,
      loading,
      error,
    } as const;
  };

  return usePayout;
}

export const useProposal = createUsePayoutHook(proposalsAtom, 'get_proposal');

export const useBounty = createUsePayoutHook(bountiesAtom, 'get_bounty');

export const useReferral = createUsePayoutHook(referralsAtom, 'get_referral');

export const useMiscellaneous = createUsePayoutHook(
  miscellaneousAtom,
  'get_miscellaneous'
);
