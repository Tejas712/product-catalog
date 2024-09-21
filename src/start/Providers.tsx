import RouteProvider from "../route/RouteProvider";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import SnackbarProvider from "../context/SnackbarContext";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store/store";

export const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
  headers: {
    authorization: process.env.REACT_APP_AUTHORIZATION_TOKEN!,
  },
});

const Providers = () => {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <SnackbarProvider>
          <RouteProvider />
        </SnackbarProvider>
      </ReduxProvider>
    </ApolloProvider>
  );
};

export default Providers;
