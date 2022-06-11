import { atom } from 'jotai';
import { Forms } from '../types/forms';

export type FormKeysType =
  | 'first_name'
  | 'last_name'
  | 'email_id'
  | 'phone_no'
  | 'institution'
  | 'other_work'
  | 'referral_code'
  | 'discord_handle';
export type FormValueType = {
  first_name: string;
  last_name: string;
  email_id: string;
  phone_no: string;
  institution: string;
  other_work: string;
  referral_code: string;
  discord_handle: string;
};
const initialFormValue = {
  first_name: '',
  last_name: '',
  email_id: '',
  phone_no: '',
  institution: '',
  other_work: '',
  referral_code: '',
  discord_handle: '',
};

export const activeFormAtom = atom<Forms>(Forms.ABOUT);
export const currentFormAtom = atom<number>(0);
export const FormValuesAtom = atom<FormValueType>(initialFormValue);
