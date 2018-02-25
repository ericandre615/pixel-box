import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/layout';
import AppMenu from './components/app-menu';
import Main from './views/main';

const Routes = () => (
  <Layout>
    <Route path="*" component={ AppMenu } />
    <Route path="*" component={ Main } />
  </Layout>
);

export default Routes;
