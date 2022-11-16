import { useState } from "react";
import styled from "styled-components";
import { MKK } from "../constants/urls";

export default function LoawaSearchForm() {
	const [characterName, setCharacterName] = useState("");
	const onSubmit = (e) => {
		e.preventDefault();
		const charName = characterName.trim();
		if (charName.length === 0) {
			alert("검색할 캐릭터명을 입력하세요");
			return;
		}
		window.location = `https://loawa.com/char/${charName}`;
	};
	return (
		<Form className="d-flex" onSubmit={onSubmit}>
			<Input
				type="search"
				className="form-control"
				placeholder="캐릭터검색"
				aria-label="Search"
				value={characterName}
				onChange={(e) => setCharacterName(e.target.value)}
			/>
			<button type="submit" className="btn">
				<Img src={`${MKK}/img/search.png`} alt="검색" />
			</button>
		</Form>
	);
}

const Input = styled.input`
	border: 0;
`;

const Form = styled.form`
	border-bottom: 0.125rem solid gray;
`;

const Img = styled.img`
	height: 1.25rem;
`;
