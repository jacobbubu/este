// @flow
import type { State } from '../../common/types';
import * as themes from '../themes';
import Container from './Container';
import Footer from './Footer';
import Header from './Header';
import Helmet from 'react-helmet';
import React from 'react';
import common from '../../common/app/common';
import favicon from '../../common/app/favicon';
import { Baseline } from '../components';
import { Box } from '../../common/components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import getMUIThemeFromESTE from './getMUIThemeFromESTE';

type AppProps = {
  children: any,
  currentLocale: string,
};

// issue #1357(MUI): Marterial-UI needs userAgent
type AppContext = {
  userAgent: string,
  theme: Object,
};

const App = (
  {
    children,
    currentLocale,
  }: AppProps,
  {
    userAgent,
    theme,
  }: AppContext, // userAgent is provided by BaseRoot
) => {
  const muiTheme = getMuiTheme({
        // issue #1357(MUI): try my best to align ESTE theme to MUI theme
        ...getMUIThemeFromESTE(theme),
        userAgent,
      });
  return (
  <Baseline>
    <Helmet
      htmlAttributes={{ lang: currentLocale }}
      meta={[
        // v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
        { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
        ...favicon.meta,
      ]}
      link={[...favicon.link]}
    />
    <MuiThemeProvider
      muiTheme={muiTheme}
    >
      <Container>
        <Header />
        <Box
          flex={1} // make footer sticky
        >
          {children}
        </Box>
        <Footer />
      </Container>
    </MuiThemeProvider>
  </Baseline>
)};

App.contextTypes = {
  userAgent: React.PropTypes.string,
  theme: React.PropTypes.object,
};

export default compose(
  common({ themes }),
  connect((state: State) => ({
    currentLocale: state.intl.currentLocale,
  })),
)(App);
