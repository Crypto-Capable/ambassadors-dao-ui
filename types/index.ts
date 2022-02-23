import { NextPage } from 'next';
import { Layouts } from '../layouts';

export type LayoutPage = NextPage & {
  layout: Layouts;
};
