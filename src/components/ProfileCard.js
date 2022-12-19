import { Col, Row } from "react-bootstrap";
import styled, { css } from "styled-components";
import { classLocale } from "../constants/lostark";
import { MKK } from "../constants/urls";
import UnregisterCharacterModal from "./UnregisterCharacterModal";

const Card = styled.div`
	position: relative;
	border: 1px solid #cbcbcb;
	padding: 0.5rem 1rem;
	background: white;
	border-radius: 1rem;
	box-shadow: 0 0.125rem 0.25rem 0.0625rem #aaa;
`;

const NotRegistered = styled.div`
	z-index: 9;
	padding: 1.25rem 0;
	position: absolute;
	color: red;
	background-color: #ffffffc9;
	font-size: 1.25rem;
	left: 50%;
	top: 50%;
	width: 100%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
`;

const BoldDiv = styled.div`
	font-weight: bold;
`;

const OrangeDiv = styled.div`
	color: #f25400;
	margin: auto;
`;

const ClassImg = styled.img`
	width: 3.625rem;
	height: 3.625rem;
	${(props) =>
		props.empty &&
		css`
			background-color: #aaa;
			border-radius: 50%;
		`};
`;

function ClassImage({ className }) {
	return (
		<>
			{className === "" ? (
				<ClassImg empty />
			) : (
				<ClassImg
					src={`https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/${className}.png`}
				/>
			)}
		</>
	);
}

function ItemLevel({ itemLevel }) {
	const [integer, decimal] = itemLevel.split(".");
	return (
		<>
			{integer || "???"}.<small>{decimal || "??"}</small>
		</>
	);
}

export default function ProfileCard({ character, allow = true, closeButton }) {
	return (
		<div className="col-6 col-md-4">
			<Card>
				{allow ? null : <NotRegistered>등록 대기</NotRegistered>}
				<Row className="gx-2 mb-2 flex-nowrap align-items-center">
					<Col xs="auto">
						<img
							src={`${process.env.REACT_APP_IMAGE_URL}/guild.png`}
							style={{
								maxHeight: "1.5rem",
							}}
						/>
					</Col>
					<Col className="overflow-hidden">
						<div
							className="singleLine"
							style={{
								fontWeight: "bold",
								color: "#006265",
							}}>
							{character.guild?.name || "???"}
						</div>
					</Col>
					<Col xs="auto">{closeButton}</Col>
				</Row>
				<div className="row gx-1 mb-2">
					<div className="col-auto">
						<ClassImage className={character.class} />
					</div>
					<div className="col-auto" style={{ margin: "auto" }}>
						<BoldDiv style={{ color: "#4761b4" }}>
							{character.server || "???"}
						</BoldDiv>
						<span style={{ color: "black" }}>
							Lv. {character.level || "??"}
						</span>
					</div>
					<OrangeDiv className="col-auto">
						<BoldDiv>{classLocale(character.class, "kr")}</BoldDiv>
						<ItemLevel itemLevel={character.itemLevel} />
					</OrangeDiv>
				</div>
				<div className="singleLine">
					<span>{character.name}</span>
				</div>
			</Card>
		</div>
	);
}
