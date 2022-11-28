import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UNVOTE, VOTINGS } from "../../constants/querys";
import CloseButton from "../CloseButton";

export default function UnvoteModal({
	votingId,
	votingItemName,
	characterName,
}) {
	const [show, setShow] = useState(false);
	const [unvote] = useMutation(UNVOTE, {
		onCompleted: ({ unvote }) => {
			if (unvote.success) return;
			alert("투표 취소에 실패했습니다.");
		},
		refetchQueries: [{ query: VOTINGS }],
	});
	return (
		<>
			<CloseButton onClick={() => setShow(true)} />

			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title as="h5">투표 취소</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						취소
					</Button>
					<button
						className="btn btn-mkk"
						onClick={() => {
							setShow(false);
							unvote({
								variables: {
									input: {
										votingId,
										votingItemName,
										characterName,
									},
								},
							});
						}}>
						투표 취소
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
