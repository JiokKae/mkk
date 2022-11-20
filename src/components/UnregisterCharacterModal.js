import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ME, UNREGISTER_PROFILE } from "../constants/querys";

export default function UnregisterCharacterModal({ characterName }) {
	const [show, setShow] = useState(false);
	const [unregisterProfile] = useMutation(UNREGISTER_PROFILE, {
		onCompleted: ({ unregisterProfile }) => {
			if (unregisterProfile.success) {
				return;
			}
			alert("해제에 실패했습니다.");
		},
		refetchQueries: [{ query: ME }],
	});
	const onClick = () => {
		setShow(false);
		unregisterProfile({ variables: { input: { characterName } } });
	};
	return (
		<>
			<svg
				onClick={() => setShow(true)}
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				className="bi bi-x"
				viewBox="0 0 16 16"
				style={{ color: "black" }}>
				<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
			</svg>

			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title as="h5">캐릭터 등록 해제</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{characterName}
					<p>등록을 해제하시겠습니까?</p>
				</Modal.Body>
				<Modal.Footer>
					<button
						type="button"
						className="btn btn-mkk"
						onClick={onClick}>
						등록 해제
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
