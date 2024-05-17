import type { ComponentType, JSX } from 'react';

/* import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { InitDataPage } from '@/pages/InitDataPage/InitDataPage';
import { LaunchParamsPage } from '@/pages/LaunchParamsPage/LaunchParamsPage.tsx';
import { ThemeParamsPage } from '@/pages/ThemeParamsPage/ThemeParamsPage.tsx'; */
import { CashPage } from '@/pages/CashPage/CashPage.tsx';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: CashPage },
  //{ path: '/init-data', Component: InitDataPage, title: 'Init Data' },
  //{ path: '/theme-params', Component: ThemeParamsPage, title: 'Theme Params' },
  //{ path: '/launch-params', Component: LaunchParamsPage, title: 'Launch Params' },
  //{ path: '/cash', Component: CashPage, title: 'Cash Page' },
];
