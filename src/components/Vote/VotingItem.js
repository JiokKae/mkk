import { useQuery } from "@apollo/client";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import { ME } from "../../constants/querys";
import AddProfileCard from "../AddProfileCard";
import ProfileCard from "../ProfileCard";
import UnvoteModal from "./UnvoteModal";
import VoteModal from "./VoteModal";

const Div = styled.div`
	margin-bottom: 2rem;
`;

const Name = styled.p`
	font-size: 1.5rem;
`;

export default function VotingItem({
	ended,
	votingId,
	name,
	limit,
	characters,
}) {
	const { data, loading } = useQuery(ME);

	const isLimited = (limit) => limit && limit >= 0;

	const isMyCharacter = (characterName, myCharacterNames = []) => {
		return myCharacterNames.includes(characterName);
	};

	const isVotedByMe = (votedCharacterNames, myCharacterNames) => {
		return votedCharacterNames.find((name) =>
			isMyCharacter(name, myCharacterNames)
		);
	};

	const canVote = (limit, characters) => {
		if (ended) {
			return false;
		}
		if (!data?.me) {
			return false;
		}
		if (isLimited(limit) && characters.length >= limit) {
			return false;
		}
		if (
			isVotedByMe(
				characters.map((character) => character.name),
				data.me.profiles.map((profile) => profile.character.name)
			)
		) {
			return false;
		}
		return true;
	};

	return (
		<Div>
			<Name className="m-0 fw-bold">
				{name} {isLimited(limit) ? `(${limit})` : null}
			</Name>
			<Row className="row m-0 g-3">
				{characters.map((character, index) => (
					<ProfileCard
						key={index}
						character={character}
						closeButton={
							!loading &&
							!ended &&
							isMyCharacter(
								character.name,
								data.me?.profiles.map(
									(profile) => profile.character.name
								)
							) ? (
								<UnvoteModal
									votingId={votingId}
									votingItemName={name}
									characterName={character.name}
								/>
							) : null
						}
					/>
				))}
				{canVote(limit, characters) ? (
					<VoteModal
						votingId={votingId}
						votingItemName={name}
						button={<AddProfileCard />}
					/>
				) : null}
			</Row>
		</Div>
	);
}
