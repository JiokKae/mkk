import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Navbar from "../components/Navbar";

const GlobalStyle = createGlobalStyle`
	@media (max-width: 576px)
	{
		html { font-size: .75rem; }
	}
	body { background-color: #f5f5f5; }
`;

export default function NavbarLayout() {
	return (
		<>
			<GlobalStyle />
			<Navbar />
			<div className="container">
				<Outlet />
			</div>
		</>
	);
}
