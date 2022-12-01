import { Link } from "react-router-dom";
import styled from "styled-components";
import { MKK } from "../constants/urls";

const MkkLogoImg = styled.img`
	align-content: center;
	margin: 2rem;
`;

export default function MkkLogo() {
	return (
		<Link to="/">
			<MkkLogoImg src={`${MKK}/img/mkk_logo_s.png`} />
		</Link>
	);
}
