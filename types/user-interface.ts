import { NextPage } from 'next';
import { Layouts } from '../layouts';
import { CustomContract, Payout, TypesOfPayouts, PayoutType } from './contract';

export type LayoutPage<T = {}> = NextPage<T> & {
  layout: Layouts;
};

export enum Tabs {
  PROPOSALS = 'proposals',
  BOUNTIES = 'bounties',
  REFERRALS = 'referrals',
  MISCELLANEOUS = 'miscellaneous',
  PROFILE = 'profile',
}

export type WithContractChildProps = {
  contract: CustomContract;
  isCouncilMember: boolean;
};

export type CacheEntry<T> = {
  updatedAt: number;
  data: T;
};

export type useEntityHookReturnType<T, K> = {
  data: T | undefined;
  loading: boolean;
  error: unknown;
  refetch: (args: K) => Promise<void>;
};

export type usePayoutsHookArgs = {
  contract: CustomContract;
  from: number;
  limit: number;
};

export type usePayoutsHookReturnType<T, K> = useEntityHookReturnType<
  Payout<T>[],
  K
>;

export type usePayoutsHook<T extends TypesOfPayouts, K> = (
  args: usePayoutsHookArgs
) => usePayoutsHookReturnType<T, K>;

export type usePayoutHookArgs = {
  contract: CustomContract;
  id: number;
};

export type usePayoutHookReturnType<T, K> = useEntityHookReturnType<
  Payout<T>,
  K
>;

export type usePayoutHook<T, K> = (
  args: usePayoutHookArgs
) => usePayoutHookReturnType<T, K>;

export type PayoutsListProps<T extends TypesOfPayouts> = {
  contract: CustomContract;
  usePayoutData: usePayoutsHook<T, unknown>;
  tab: Tabs;
  label: PayoutType;
};
