import { useQuery } from "@apollo/client";
import { useState } from "react";
import styled, { css } from "styled-components";
import Voting from "./Voting";
import { ME, VOTINGS } from "../../constants/querys";
import EndedVotings from "./EndedVotings";
import CreateVotingModal from "./CreateVotingModal";

const Headline = styled.h1`
	text-align: center;
	font-weight: bold;
`;

const VotingTab = styled.div`
	padding-bottom: 5px;
	font-size: 1.25rem;
	margin: 0 2.5rem;
	cursor: pointer;
	${(props) =>
		props.select &&
		css`
			border-bottom: 2px solid #050505;
		`};
`;

export default function Votings() {
	const VOTING_TABS = [{ name: "진행중인 투표" }, { name: "종료된 투표" }];
	const [votingTabIndex, setVotingTabIndex] = useState(0);
	const [votings, setVotings] = useState([]);

	const { data } = useQuery(ME);
	useQuery(VOTINGS, {
		onCompleted: ({ votings }) => {
			setVotings(votings);
		},
	});

	return (
		<>
			<Headline className="mb-5">투표 게시판</Headline>
			<div className="row justify-content-center">
				{VOTING_TABS.map(({ name }, index) => (
					<VotingTab
						key={index}
						className="col-auto"
						select={votingTabIndex === index}
						onClick={() => setVotingTabIndex(index)}>
						{name}
					</VotingTab>
				))}
			</div>
			{data?.me ? (
				<div className="row justify-content-end">
					<CreateVotingModal className="col-auto" />
				</div>
			) : null}
			{votingTabIndex === 0 ? (
				<div>
					{votings.map((voting) => (
						<Voting key={voting.id} voting={voting} />
					))}
				</div>
			) : null}
			{votingTabIndex === 1 ? <EndedVotings /> : null}
		</>
	);
}
