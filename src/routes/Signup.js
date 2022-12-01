import { useLazyQuery, useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FloatingInput from "../components/FloatingInput";
import MkkLogo from "../components/MkkLogo";
import { classLocale } from "../constants/lostark";
import { CHECK_CHARACTER, SIGNUP } from "../constants/querys";

const SignupButton = styled.input`
	width: 100%;
	padding: 10px 0px;
	border-radius: 0;
	letter-spacing: -0.125rem;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
`;
const SigninText = styled.p`
	font-size: 1.25rem;
	letter-spacing: -0.125rem;
`;

export default function Signup() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [lostarkNickname, setLostarkNickname] = useState("");
	const [email, setEmail] = useState("");
	const [reCAPTCHAToken, setReCAPTCHAToken] = useState(null);
	const [lostarkNicknameCheck, setLostarkNicknameCheck] = useState(false);
	const navigate = useNavigate();
	const recaptchaRef = useRef();

	const [signup] = useMutation(SIGNUP, {
		onCompleted: ({ signup }) => {
			if (signup.success) {
				navigate(-1);
				return;
			}

			alert(signup.errorMessage);
			if (signup.errorProperty === "reCAPTCHA") {
				recaptchaRef.reset();
			}
		},
	});

	const onSubmit = (e) => {
		e.preventDefault();

		if (lostarkNicknameCheck === false) {
			alert("로스트아크 캐릭터 확인이 완료되지 않았습니다");
			return;
		}

		if (!reCAPTCHAToken) {
			alert("reCAPTCHA 항목이 완료되지 않았습니다");
			return;
		}
		signup({
			variables: {
				input: {
					id,
					password,
					nickname,
					lostarkNickname,
					email,
					token: reCAPTCHAToken,
				},
			},
		});
	};

	const [checkCharacter] = useLazyQuery(CHECK_CHARACTER, {
		onCompleted: ({ character }) => {
			if (!character) {
				alert(`${lostarkNickname} 캐릭터를 찾을 수 없습니다`);
				return;
			}
			var select = window.confirm(
				`닉네임: ${lostarkNickname}\n아이템 레벨: ${
					character.itemLevel
				} 직업: ${classLocale(
					character.class,
					"kr"
				)}\n본인 캐릭터가 맞습니까?`
			);
			setLostarkNicknameCheck(select);
		},
	});

	return (
		<>
			<MkkLogo />
			<form
				className="form-sign"
				onSubmit={onSubmit}
				style={{ width: "350px" }}>
				<FloatingInput
					className="mb-3"
					name="아이디"
					help="4-20자의 영문과 숫자만 사용 가능합니다."
					required
					autoFocus
					maxLength={20}
					pattern="[A-Za-z0-9]{4,20}"
					value={id}
					onChange={(e) => setId(e.target.value)}
				/>
				<FloatingInput
					type="password"
					className="mb-3"
					name="비밀번호"
					help="8-20자만 사용 가능합니다."
					maxLength={20}
					pattern=".{8,20}"
					autoComplete="new-password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<FloatingInput
					className="mb-3"
					name="닉네임"
					help="1~10자의 한글, 영문, 숫자만 사용 가능합니다."
					maxLength={10}
					pattern="[A-Za-z0-9ㄱ-힣]{1,10}"
					required
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
				/>
				<div className="input-group mb-3">
					<FloatingInput
						name="로스트아크 닉네임"
						maxLength={12}
						pattern="[a-zA-Z가-힣0-9]{1,12}"
						required
						value={lostarkNickname}
						onChange={(e) => {
							setLostarkNickname(e.target.value.trim());
						}}
					/>
					<button
						className="btn btn-outline-secondary"
						type="button"
						onClick={() => {
							if (!lostarkNickname) {
								return;
							}
							checkCharacter({
								variables: { name: lostarkNickname },
							});
						}}>
						확인
					</button>
				</div>
				<FloatingInput
					type="email"
					className="mb-3"
					name="이메일"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<ReCAPTCHA
					ref={recaptchaRef}
					className="mb-3"
					style={{ textAlign: "-webkit-center" }}
					sitekey="6LcZ-0AjAAAAAA1JDujfmnfOiqtjChfrVB68dxUf"
					onChange={(value) => setReCAPTCHAToken(value)}
				/>
				<SignupButton
					type="submit"
					className="btn btn-lg bgc-mkk"
					value="계정 만들기"
				/>
			</form>
			<hr style={{ width: "100%" }} />
			<div className="text-center">
				<StyledLink to="/signin/">
					<SigninText className="color-mkk">로그인</SigninText>
				</StyledLink>
			</div>
		</>
	);
}
