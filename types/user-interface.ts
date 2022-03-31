import { NextPage } from 'next';
import { Layouts } from '../layouts';
import { CustomContract } from './contract';

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
