import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";

// Config
const { publicRuntimeConfig: { graphqlUrl } } = getConfig();
let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

// error handling for Apollo Link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      // eslint-disable-next-line no-console
      console.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${JSON.stringify(path)}`);
    });
  }

  if (networkError) {
    // eslint-disable-next-line no-console
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = (options) => new HttpLink({
  uri: `${graphqlUrl}`,
  headers: {
    "meteor-login-token": `${options.token || ""}`
  },
  credentials: "same-origin"
});

const create = (initialState, options = {}) =>
  new ApolloClient({
    connectToDevTools: true,
    ssrMode: false,
    link: errorLink.concat(httpLink(options)),
    cache: new InMemoryCache().restore({})
  });


/**
 * @name initApolloBrowser
 * @param {Object} initialState Initial state to initialize the Apollo client with
 * @param {Object} options Additional options to initialize the Apollo client with
 * @return {ApolloClient} Apollo client instance
 */
export default function initApolloBorwser(initialState, options) {
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
