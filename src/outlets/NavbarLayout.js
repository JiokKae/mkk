import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NavbarLayout() {
	return (
		<div>
			<Navbar />
			<div className="container">
				<Outlet />
			</div>
		</div>
	);
}
