import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarLayout from "./outlets/NavbarLayout";
import SignLayout from "./outlets/SignLayout";
import Home from "./routes/Home";
import Signin from "./routes/Signin";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<NavbarLayout />}>
					<Route path="/" element={<Home />} />
				</Route>
				<Route element={<SignLayout />}>
					<Route path="/signin/" element={<Signin />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
