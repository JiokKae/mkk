import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FloatingInput from "../components/FloatingInput";
import MkkLogo from "../components/MkkLogo";
import { ME, QUERIES_AFFECTED_BY_SIGN, SINGIN } from "../constants/querys";

const SigninButton = styled.input`
	width: 100%;
	padding: 10px 0px;
	border-radius: 0;
	letter-spacing: -0.125rem;
`;
const StyledLink = styled(Link)`
	text-decoration: none;
`;
const SignupText = styled.p`
	font-size: 1.25rem;
	letter-spacing: -0.125rem;
`;
const ErrorMessage = styled.div`
	color: red;
	margin: 0.5rem 0;
`;

function Signin() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate();
	const [signin] = useMutation(SINGIN, {
		onCompleted: ({ signin }) => {
			if (signin.me) {
				navigate(-1);
				return;
			}
			setMessage(signin.message);
		},
		refetchQueries: QUERIES_AFFECTED_BY_SIGN,
	});
	const onSubmit = (e) => {
		e.preventDefault();
		signin({ variables: { input: { id, password } } });
	};
	useQuery(ME, {
		onCompleted: (data) => {
			if (data.me) navigate("/");
		},
	});
	return (
		<>
			<MkkLogo />
			<form className="form-sign" onSubmit={onSubmit}>
				<FloatingInput
					id="id"
					name="아이디"
					className="mb-3"
					required
					autoFocus
					value={id}
					onChange={(e) => setId(e.target.value)}
				/>
				<FloatingInput
					type="password"
					id="password"
					name="비밀번호"
					className="mb-3"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<ErrorMessage>{message}</ErrorMessage>
				<SigninButton
					type="submit"
					className="btn btn-lg bgc-mkk"
					value="로그인"
				/>
			</form>
			<hr style={{ width: "100%" }} />
			<div className="text-center">
				<StyledLink to="/signup/">
					<SignupText className="color-mkk">계정 만들기</SignupText>
				</StyledLink>
			</div>
		</>
	);
}

export default Signin;
