import { NextPage } from 'next';
import { Layouts } from '../layouts';
import { CustomContract, Payout } from './contract';

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

export type useEntityHookReturnType<T> = {
  data: T | undefined;
  loading: boolean;
  error: unknown;
};

export type usePayoutsHookArgs = {
  contract: CustomContract;
  from: number;
  limit: number;
};

export type usePayoutsHookReturnType<T> = useEntityHookReturnType<Payout<T>[]>;

export type usePayoutsHook<T> = (
  args: usePayoutsHookArgs
) => usePayoutsHookReturnType<T>;

export type usePayoutHookArgs = {
  contract: CustomContract;
  id: number;
};

export type usePayoutHookReturnType<T> = useEntityHookReturnType<Payout<T>>;

export type usePayoutHook<T> = (
  args: usePayoutHookArgs
) => usePayoutHookReturnType<T>;
