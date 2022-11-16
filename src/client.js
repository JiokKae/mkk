import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { API } from "./constants/urls";

const link = createHttpLink({
	//uri: `${API}/`,
	uri: "http://localhost/mkk/graphql/",
	credentials: "include",
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link,
});

export default client;
