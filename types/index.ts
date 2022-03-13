import { Contract } from 'near-api-js';
import { NextPage } from 'next';
import { Layouts } from '../layouts';

export type LayoutPage<T> = NextPage<T> & {
  layout: Layouts;
};

export type Payout = {
  id: string;
};

export type viewAllFnArgs = {
  startIndex: number;
  limit: number;
};

export type viewAllFn = (args: viewAllFnArgs) => Promise<Payout[]>;

export type viewFunctionsType = {
  viewAllProposals: viewAllFn;
  viewAllBounties: viewAllFn;
  viewAllReferrals: viewAllFn;
  viewAllMiscellaneous: viewAllFn;
};

export type changeFunctionsType = {};

export type CustomContract = Contract & viewFunctionsType & changeFunctionsType;
