import { useMutation } from "@apollo/client";
import { useEffect, useId, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import styled from "styled-components";
import { CREATE_VOTING, VOTINGS } from "../../constants/querys";

const Label = styled.label`
	font-size: 1.25rem;
`;

const FormLabel = styled(Form.Label)`
	font-size: 1.25rem;
`;

function VotingItemForm({ index, onChange, votingItemData }) {
	const [usesLimit, setUsesLimit] = useState(false);
	const id = useId();

	return (
		<div className="row g-2 align-items-center">
			<div className="col">
				<input
					type="text"
					className="form-control"
					placeholder="항목을 입력하세요"
					value={votingItemData.name}
					onChange={(e) => onChange(index, "name", e.target.value)}
				/>
			</div>
			<div className="col-auto form-check">
				<input
					type="checkbox"
					className="form-check-input"
					id={`${id}UsesLimit`}
					value={usesLimit}
					onChange={(e) => {
						if (e.target.checked === false)
							onChange(index, "limit", null);
						setUsesLimit(e.target.checked);
					}}
				/>
				<label htmlFor={`${id}UsesLimit`} className="form-check-label">
					인원제한
				</label>
			</div>
			<div className="col-2">
				<input
					type="number"
					className="form-control"
					min={1}
					disabled={!usesLimit}
					value={votingItemData.limit ?? ""}
					onChange={(e) =>
						onChange(index, "limit", Number(e.target.value))
					}
				/>
			</div>
		</div>
	);
}

export default function CreateVotingModal({ className }) {
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState("");
	const [deadline, setDeadline] = useState("");
	const [now, setNow] = useState(new Date());
	const [votingItems, setVotingItems] = useState([
		{ name: "" },
		{ name: "" },
		{ name: "" },
	]);

	const handleVotingItemChange = (index, fieldId, value) => {
		setVotingItems(
			votingItems.map((votingItem, i) => {
				if (i !== index) return votingItem;
				if (value === null) {
					delete votingItem[fieldId];
					return votingItem;
				}
				votingItem[fieldId] = value;
				return votingItem;
			})
		);
	};

	useEffect(() => {
		var nowDate = new Date();
		nowDate.setMinutes(nowDate.getMinutes() - nowDate.getTimezoneOffset());
		setNow(nowDate);
		setDeadline(nowDate.toISOString().slice(0, 16));
	}, []);

	const [createVoting] = useMutation(CREATE_VOTING, {
		onCompleted: (data) => {
			console.log(data);
		},
		refetchQueries: [{ query: VOTINGS }],
	});

	return (
		<>
			<button
				className={`btn btn-mkk ${className}`}
				onClick={() => setShow(true)}>
				투표 만들기
			</button>
			<Modal size="lg" show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title as="h2">투표 만들기</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="titleInput">
							<FormLabel className="fw-bold">제목</FormLabel>
							<Form.Control
								type="text"
								placeholder="투표 제목을 입력하세요"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Row className="flex-column gy-2">
								<Col>
									<FormLabel className="fw-bold">
										항목
									</FormLabel>
								</Col>
								{votingItems.map((votingItem, index) => (
									<Col key={index}>
										<VotingItemForm
											index={index}
											onChange={handleVotingItemChange}
											votingItemData={votingItem}
										/>
									</Col>
								))}
								<Col>
									<div
										className="form-control"
										onClick={() =>
											setVotingItems([
												...votingItems,
												{ name: "" },
											])
										}
										style={{
											cursor: "pointer",
											textAlign: "center",
										}}>
										+
									</div>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group className="mb-3" controlId="deadlineInput">
							<FormLabel className="fw-bold">마감 시각</FormLabel>
							<Form.Control
								type="datetime-local"
								min={now.toISOString().slice(0, 16)}
								value={deadline}
								onChange={(e) => {
									setDeadline(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<FormLabel className="fw-bold">부가 기능</FormLabel>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									disabled
								/>
								<label className="form-check-label">
									투표 종료 후 결과 공개
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									disabled
								/>
								<label className="form-check-label">
									인원 초과 시 자동 사다리
								</label>
							</div>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						취소
					</Button>
					<button
						className="btn btn-mkk"
						onClick={() => {
							setShow(false);
							createVoting({
								variables: {
									input: { title, deadline, votingItems },
								},
							});
						}}>
						등록
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
