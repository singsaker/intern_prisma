import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import "bootstrap/dist/css/bootstrap.min.css";
import withReduxStore from "../lib/with-redux-store";
import { CookiesProvider } from "react-cookie";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
  import CssBaseline from "@material-ui/core/CssBaseline";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000",
    credentials: "include",
  }),
});

const MyApp = (props) => {
  const { Component, pageProps, reduxStore } = props;

  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#F26E50",
      },
      secondary: {
        main: "#F2A679",
      },
      background: {
        paper: "#0F4C59",
        default: "#011F26",
      },
    },
  });

  return (
    <Provider store={reduxStore}>
      <ApolloProvider client={client}>
        <CookiesProvider>
          <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&display=swap"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CookiesProvider>
      </ApolloProvider>
    </Provider>
  );
};

export default withReduxStore(MyApp);
