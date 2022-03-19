import React from 'react';
import {ApolloClient, ApolloLink, ApolloProvider,createHttpLink, InMemoryCache} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import { ShowMessage, type } from '../components/Toaster/ShowMessage';
import { setContext } from '@apollo/client/link/context';
import { isDev, GQL_URL } from './config';
type Props = {
  children: JSX.Element
};
const httpLink = createHttpLink({
    uri: GQL_URL,
    credentials:"include"
});
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
        }
    }
});
const Root = ({children}: Props) => {
  const errorLink = onError(({graphQLErrors, networkError,operation}) => {
    if (graphQLErrors) graphQLErrors?.map(({message, locations, path}) => {
            if((operation?.query?.definitions[0]as any).operation === "mutation") {
              ShowMessage(type.ERROR, message)
            }
            isDev && console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            )
          }
      );

    if (networkError && isDev) {
         console.log(`[Network error]: ${networkError}`)
    }
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink,httpLink]),
    cache: new InMemoryCache(),
  });
  return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
  );
};

export default Root;
