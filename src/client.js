import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { API } from "./constants/urls";

const link = createHttpLink({
	uri: `${API}/`,
	credentials: "include",
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link,
});

export default client;
