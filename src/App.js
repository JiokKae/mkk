import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignLayout from "./outlets/SignLayout";
import Home from "./routes/Home";
import Signin from "./routes/Signin";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route element={<SignLayout />}>
					<Route path="/signin/" element={<Signin />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
