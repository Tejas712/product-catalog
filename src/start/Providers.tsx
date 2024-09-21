import { ReactNode } from "react";
import RouteProvider from "../route/RouteProvider";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

type Props = {
  children: ReactNode;
};


export const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
  headers: {
    authorization: process.env.REACT_APP_AUTHORIZATION_TOKEN!,
  },
});

const Providers = () => {
  console.log(process.env);
  return (
    <ApolloProvider client={client}>
      <RouteProvider />
    </ApolloProvider>
  );
};

export default Providers;
