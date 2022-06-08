import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Forms } from '../types/forms';

interface FormValueType {
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNo: string;
  institution: string;
  otherWork: string;
  referralCode: string;
  discordHandle: string;
  currentForm: number;
}
const dummy = {
  firstName: '',
  lastName: '',
  emailId: '',
  phoneNo: '',
  institution: '',
  otherWork: '',
  referralCode: '',
  discordHandle: '',
  currentForm: 0,
};

export const activeFormAtom = atom<Forms>(Forms.ABOUT);

export const FormValuesAtom = atomWithStorage<FormValueType>(
  'dao-form-value',
  dummy
);
