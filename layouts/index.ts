import DashboardLayout from './dashboard';

export enum Layouts {
  DASHBOARD = 'dashboard',
}

const layouts = {
  [Layouts.DASHBOARD]: DashboardLayout,
};

export default layouts;
