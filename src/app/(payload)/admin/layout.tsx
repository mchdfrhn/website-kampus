import { RootLayout } from '@payloadcms/next/layouts';
import React from 'react';
import '@payloadcms/next/css';
import '@payloadcms/ui/scss/app.scss';
import config from '../../../../payload.config';
import { importMap } from './importMap';
import { serverFunctions } from './_serverFunctions';

type Args = {
  children: React.ReactNode;
};

const Layout = ({ children }: Args) =>
  RootLayout({
    children,
    config,
    importMap,
    serverFunction: serverFunctions,
  });

export default Layout;
