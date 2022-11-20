import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ME, REGISTER_PROFILE } from "../constants/querys";

export default function RegisterProfile() {
	const [characterName, setCharacterName] = useState("");
	const [registerProfile] = useMutation(REGISTER_PROFILE, {
		onCompleted: ({ registerProfile }) => {
			if (registerProfile.profile) {
				setCharacterName("");
				return;
			}
			alert("등록에 실패했습니다.");
		},
		refetchQueries: [{ query: ME }],
	});

	const onSubmit = (e) => {
		e.preventDefault();
		var name = characterName.trim();
		if (name.length === 0) {
			alert("등록할 캐릭터 이름을 입력하세요");
			return;
		}
		registerProfile({ variables: { input: { characterName: name } } });
	};

	return (
		<form onSubmit={onSubmit}>
			<div className="row g-2 mb-2">
				<div className="col">
					<input
						type="text"
						className="form-control"
						value={characterName}
						onChange={(e) => setCharacterName(e.target.value)}
					/>
				</div>
				<div className="col-auto">
					<button className="btn btn-mkk">캐릭터 등록 신청</button>
				</div>
			</div>
		</form>
	);
}
