import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Background = styled.div`
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	padding-top: 40px;
	padding-bottom: 40px;
	background-color: #f5f5f5;
	height: 100vh;
`;

const Container = styled.div`
	max-width: 350px;
	padding: 5px;
	margin: auto;
`;

export default function SignLayout() {
	return (
		<Background>
			<Container>
				<Outlet />
			</Container>
		</Background>
	);
}
