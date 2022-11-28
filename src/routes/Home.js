import { useQuery } from "@apollo/client";
import styled from "styled-components";
import MyCharacters from "../components/MyCharacters";
import Votings from "../components/Vote/Votings";
import { ME } from "../constants/querys";

const Container = styled.div`
	max-width: 780px;
	margin: auto;
`;

export default function Home() {
	const { data, loading } = useQuery(ME);

	return (
		<Container>
			{loading ? null : data.me ? <MyCharacters /> : null}
			<Votings />
		</Container>
	);
}
