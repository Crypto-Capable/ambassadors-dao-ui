import { atom } from 'jotai';
import {
  AmbassadorProfile,
  BountyType,
  CacheEntry,
  MiscellaneousType,
  Payout,
  ProposalType,
  ReferralType,
} from '../types';

export const proposalsAtom = atom<
  Record<number, CacheEntry<Payout<ProposalType>>>
>({});

export const bountiesAtom = atom<
  Record<number, CacheEntry<Payout<BountyType>>>
>({});

export const referralsAtom = atom<
  Record<number, CacheEntry<Payout<ReferralType>>>
>({});

export const miscellaneousAtom = atom<
  Record<number, CacheEntry<Payout<MiscellaneousType>>>
>({});

export const ambassadorProfileAtom = atom<AmbassadorProfile | null>(null);
