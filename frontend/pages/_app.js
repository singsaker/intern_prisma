import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import withReduxStore from "../lib/with-redux-store";
import { CookiesProvider } from "react-cookie";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeConfig from "../theme";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000",
    credentials: "include",
  }),
});

const MyApp = (props) => {
  const { Component, pageProps, reduxStore } = props;

  return (
    <Provider store={reduxStore}>
      <ApolloProvider client={client}>
        <CookiesProvider>
          <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@100..900&display=swap"
              rel="stylesheet"
            ></link>
            <link
              href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&display=swap"
              rel="stylesheet"
            />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          </Head>
          <ThemeConfig>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeConfig>
        </CookiesProvider>
      </ApolloProvider>
    </Provider>
  );
};

export default withReduxStore(MyApp);
