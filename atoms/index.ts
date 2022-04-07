import { captureException } from '@sentry/nextjs';
import { atom } from 'jotai';
import { useImmerAtom } from 'jotai/immer';
import { useEffect, useMemo, useState } from 'react';
import {
  BountyType,
  CacheEntry,
  CustomContract,
  MiscellaneousType,
  Payout,
  ProposalType,
  ReferralType,
} from '../types';

export const proposalsAtom = atom(
  {} as Record<number, CacheEntry<Payout<ProposalType>>>
);

export const bountiesAtom = atom({} as Record<number, Payout<BountyType>>);

export const referralsAtom = atom({} as Record<number, Payout<ReferralType>>);

export const miscellaneousAtom = atom(
  {} as Record<number, Payout<MiscellaneousType>>
);
