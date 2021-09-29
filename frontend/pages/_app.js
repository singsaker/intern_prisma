import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
// import { HttpLink } from "apollo-link-http";
// import { ApolloClient } from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { ApolloProvider } from "@apollo/react-hooks";
import withReduxStore from "../lib/with-redux-store";
import { CookiesProvider } from "react-cookie";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeConfig from "../theme";
import createEmotionCache from "../src/createEmotionCache";
import { CacheProvider } from "@emotion/react";

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // uri: "http://localhost:4000",
  link: new HttpLink({
    uri: "http://localhost:4000",
    credentials: "include",
  }),
});

const MyApp = (props) => {
  const { Component, pageProps, reduxStore, emotionCache = clientSideEmotionCache } = props;

  return (
    <Provider store={reduxStore}>
      <ApolloProvider client={client}>
        <CookiesProvider>
          <CacheProvider value={emotionCache}>
            <Head>
              <title>Singsaker Intern</title>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@100..900&display=swap"
                rel="stylesheet"
              ></link>
              <link
                href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&display=swap"
                rel="stylesheet"
              />
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
              />
            </Head>
            <ThemeConfig>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeConfig>
          </CacheProvider>
        </CookiesProvider>
      </ApolloProvider>
    </Provider>
  );
};

export default withReduxStore(MyApp);
