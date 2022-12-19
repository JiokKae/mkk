import styled from "styled-components";
import { MKK } from "../constants/urls";

const Card = styled.div`
	@media (max-width: 576px) {
		min-height: 111.5px;
	}
	position: relative;
	border: 1px solid #cbcbcb;
	border-radius: 1rem;
	padding: 0.5rem 1rem;
	height: 100%;
	min-height: 144.84px;
	background-color: #a2a2a2;
	box-shadow: inset 0 0.125rem 0.25rem 0.0625rem #666;
`;

export default function AddProfileCard({ onClick }) {
	return (
		<div className="col-6 col-md-4">
			<Card
				className="d-flex justify-content-center align-items-center"
				onClick={onClick}>
				<img src={`${process.env.REACT_APP_IMAGE_URL}/plus.png`} />
			</Card>
		</div>
	);
}
