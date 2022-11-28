import styled from "styled-components";
import VotingItem from "./VotingItem";
import VotingTitle from "./VotingTitle";

const ClickableDiv = styled.div`
	cursor: pointer;
`;

export default function Voting({ ended, voting }) {
	return (
		<>
			<ClickableDiv
				className="collapsed"
				data-bs-toggle="collapse"
				data-bs-target={`#voting${voting.id}`}
				aria-expanded="false"
				aria-controls={`voting${voting.id}`}>
				<VotingTitle title={voting.title} deadline={voting.deadline} />
			</ClickableDiv>
			<div className="collapse" id={`voting${voting.id}`}>
				{voting.items.map(({ id, name, limit, characters }) => (
					<VotingItem
						ended={ended}
						key={id}
						votingId={voting.id}
						name={name}
						limit={limit}
						characters={characters}
					/>
				))}
			</div>
			<hr />
		</>
	);
}
