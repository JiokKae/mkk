import { useQuery } from "@apollo/client";
import styled from "styled-components";
import MyCharacters from "../components/MyCharacters";
import { ME } from "../constants/querys";

const Body = styled.div`
	max-width: 780px;
	margin: auto;
`;

export default function Home() {
	const { data } = useQuery(ME);
	return (
		<Body>
			{data?.me ? <MyCharacters /> : null}
		</Body>
	);
}
