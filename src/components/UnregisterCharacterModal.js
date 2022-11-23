import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ME, UNREGISTER_PROFILE } from "../constants/querys";
import CloseButton from "./CloseButton";

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
			<CloseButton onClick={() => setShow(true)} />

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
