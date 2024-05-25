import { Card } from "@tremor/react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import MainPage from "./pages/main";
import Worker from "./pages/Worker";
import Admin from "./pages/Admin";
import Report from "./pages/Report/Report";

const Default = () => {
	return (
		<div className="flex w-100 h-100 flex-col justify-center align-center">
			<p className="self-center">Links</p>
			<div className="flex gap-3">
				<Link to="/admin">
					<Card>
						<p className="text-white">Admin</p>
					</Card>
				</Link>
				<Link to="/worker">
					<Card>
						<p className="text-white">Worker</p>
					</Card>
				</Link>
			</div>
		</div>
	);
};

function App() {
	const location = useLocation();
	return (
		<>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Default />} />
				<Route path="/*" element={<MainPage />}>
                    <Route path="admin" element={<Admin />}/>
                    <Route path="report" element={<Report />} />
					<Route path="home" element={<Worker />}/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
