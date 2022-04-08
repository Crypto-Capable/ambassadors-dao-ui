import { captureException } from '@sentry/nextjs';
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
  ProposalType,
  usePayoutHook,
  BountyType,
  MiscellaneousType,
  ReferralType,
  usePayoutHookArgs,
  usePayoutsHookArgs,
  getAllPayoutsFn,
} from '../types';
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

export const useBounties: usePayoutsHook<BountyType> = ({
  contract,
  from,
  limit,
}) => {
  const [bounties, setBounties] = useImmerAtom(bountiesAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const loadBounties = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const res = await contract.get_all_bounties({
          from_index: from,
          limit,
        });
        setBounties((draft) => {
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

    loadBounties();
  }, [contract, setBounties, from, limit]);

  const data = useMemo(() => {
    const slice = extractRangeOfItems(bounties, from, limit);
    if (slice.length === 0) {
      return undefined;
    } else {
      return slice.map(({ data }) => data);
    }
  }, [bounties, from, limit]);

  return {
    data,
    loading,
    error,
  } as const;
};

export const useBounty: usePayoutHook<BountyType> = ({ contract, id }) => {
  const [bounty, setBounty] = useImmerAtom(bountiesAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const loadBounty = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const res = await contract.get_bounty({
          id,
        });
        setBounty((draft) => {
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

    loadBounty();
  }, [setBounty, contract, id]);

  const data = useMemo(() => {
    if (bounty[id]) {
      return bounty[id].data;
    }
    return undefined;
  }, [bounty, id]);

  return {
    data,
    loading,
    error,
  } as const;
};

export const useMiscellanea: usePayoutsHook<MiscellaneousType> = ({
  contract,
  from,
  limit,
}) => {
  const [miscellaneous, setMiscellaneous] = useImmerAtom(miscellaneousAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const loadMiscellaneous = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const res = await contract.get_all_miscellaneous({
          from_index: from,
          limit,
        });
        setMiscellaneous((draft) => {
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

    loadMiscellaneous();
  }, [contract, setMiscellaneous, from, limit]);

  const data = useMemo(() => {
    const slice = extractRangeOfItems(miscellaneous, from, limit);
    if (slice.length === 0) {
      return undefined;
    } else {
      return slice.map(({ data }) => data);
    }
  }, [miscellaneous, from, limit]);

  return {
    data,
    loading,
    error,
  } as const;
};

export const useMiscellaneous: usePayoutHook<MiscellaneousType> = ({
  contract,
  id,
}) => {
  const [miscellaneous, setMiscellaneous] = useImmerAtom(miscellaneousAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const loadMiscellaneous = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const res = await contract.get_miscellaneous({
          id,
        });
        setMiscellaneous((draft) => {
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

    loadMiscellaneous();
  }, [setMiscellaneous, contract, id]);

  const data = useMemo(() => {
    if (miscellaneous[id]) {
      return miscellaneous[id].data;
    }
    return undefined;
  }, [miscellaneous, id]);

  return {
    data,
    loading,
    error,
  } as const;
};

export const useReferrals: usePayoutsHook<ReferralType> = ({
  contract,
  from,
  limit,
}) => {
  const [referrals, setReferrals] = useImmerAtom(referralsAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const loadReferrals = async () => {
      setLoading(false);
      setError(undefined);
      try {
        const res = await contract.get_all_referrals({
          from_index: from,
          limit,
        });
        setReferrals((draft) => {
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

    loadReferrals();
  }, [contract, setReferrals, from, limit]);

  const data = useMemo(() => {
    const slice = extractRangeOfItems(referrals, from, limit);
    if (slice.length === 0) {
      return undefined;
    } else {
      return slice.map(({ data }) => data);
    }
  }, [referrals, from, limit]);

  return {
    data,
    loading,
    error,
  } as const;
};

export const useReferral: usePayoutHook<ReferralType> = ({ contract, id }) => {
  const [referral, setReferral] = useImmerAtom(referralsAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const loadReferral = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const res = await contract.get_referral({ id });
        setReferral((draft) => {
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
    loadReferral();
  }, [contract, setReferral, id]);

  const data = useMemo(() => {
    if (referral[id]) return referral[id].data;
    return undefined;
  }, [referral, id]);

  return {
    data,
    loading,
    error,
  } as const;
};
