import { NextPage } from 'next';
import { Layouts } from '../layouts';

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
