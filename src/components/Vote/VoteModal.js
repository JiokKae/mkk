import { useMutation, useQuery } from "@apollo/client";
import { cloneElement, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { ME, VOTE, VOTINGS } from "../../constants/querys";

const Radio = styled.input`
	:checked {
		background-color: #81c97e;
		border-color: #81c97e;
	}
`;

export default function VoteModal({ votingId, votingItemName, button }) {
	const [characterName, setCharacterName] = useState("");
	const [show, setShow] = useState(false);

	const { data, loading } = useQuery(ME);
	const [vote] = useMutation(VOTE, {
		onCompleted: ({ vote }) => {
			if (vote.success) return;
			alert("투표에 실패했습니다.");
		},
		refetchQueries: [{ query: VOTINGS }],
	});

	return (
		<>
			{cloneElement(button, { onClick: () => setShow(true) })}

			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title as="h5">투표 캐릭터 선택</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{loading
						? null
						: data.me.profiles
								.filter(({ allow }) => allow === true)
								.map(({ character }, index) => (
									<div key={index} className="form-check">
										<Radio
											className="form-check-input"
											type="radio"
											name="characterName"
											id={`inputCharacterName${index}`}
											value={character.name}
											onChange={(e) => {
												setCharacterName(
													e.target.value
												);
											}}
										/>
										<label
											className="form-check-label"
											htmlFor={`inputCharacterName${index}`}>
											{character.name}
											<small className="text-muted">
												{" "}
												{character.itemLevel}
											</small>
										</label>
									</div>
								))}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						취소
					</Button>
					<button
						className="btn btn-mkk"
						onClick={() => {
							setShow(false);
							vote({
								variables: {
									input: {
										votingId,
										votingItemName,
										characterName,
									},
								},
							});
						}}>
						투표하기
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
