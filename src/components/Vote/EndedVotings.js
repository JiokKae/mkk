import { useLazyQuery, useQuery } from "@apollo/client";
import { useState } from "react";
import { Waypoint } from "react-waypoint";
import { VOTINGS } from "../../constants/querys";
import Voting from "./Voting";

export default function EndedVotings() {
	const [endedVotings, setEndedVotings] = useState([]);
	const [allVotingLoaded, setAllVotingLoaded] = useState(false);
	useQuery(VOTINGS, {
		variables: { ended: true, count: 10 },
		onCompleted: ({ votings }) => {
			setEndedVotings(votings);
		},
	});
	const [nextEndedVotings, { loading }] = useLazyQuery(VOTINGS, {
		onCompleted: ({ votings }) => {
			setEndedVotings([...endedVotings, ...votings]);
			if (votings.length < 5) {
				setAllVotingLoaded(true);
			}
		},
	});

	const onEnter = () => {
		if (loading === true || allVotingLoaded === true) {
			return;
		}

		nextEndedVotings({
			variables: {
				ended: true,
				count: 5,
				startDateTime: endedVotings[endedVotings.length - 1]?.deadline,
			},
		});
	};

	return (
		<div>
			{endedVotings.map((voting) => (
				<Voting ended key={voting.id} voting={voting} />
			))}
			{loading === true || endedVotings.length === 0 ? null : (
				<Waypoint onEnter={onEnter} />
			)}
		</div>
	);
}
