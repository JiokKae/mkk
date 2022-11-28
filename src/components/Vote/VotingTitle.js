import styled from "styled-components";

const Head = styled.div`
	width: 100%;
	text-align: center;
	border-radius: 5rem;
	background: linear-gradient(180deg, #d5efce, #edecda);
	box-shadow: 0 0.25rem 0.25rem 0 #afafaf;
`;

const Title = styled.p`
	font-size: 1.5rem;
`;

export default function VotingTitle({ title, deadline }) {
	return (
		<Head className="p-3 my-4">
			<Title className="fw-bold mb-0">{`[투표] ${title}`}</Title>
			<p className="m-0">
				{new Intl.DateTimeFormat("kr", {
					dateStyle: "full",
					timeStyle: "short",
				}).format(new Date(deadline))}{" "}
				마감
			</p>
		</Head>
	);
}
