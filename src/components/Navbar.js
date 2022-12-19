import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { MKK } from "../constants/urls";
import { ME, QUERIES_AFFECTED_BY_SIGN, SIGNOUT } from "../constants/querys";
import LoawaSearchForm from "./LoawaSearchForm";
import styled from "styled-components";

function UserIcon() {
	return (
		<img
			src={`${process.env.REACT_APP_IMAGE_URL}/user.png`}
			alt="유저"
			style={{
				height: "1.5rem",
				marginRight: ".4375rem",
			}}
		/>
	);
}

const Nav = styled.nav`
	background: white;
	box-shadow: 0 0.25rem 0.25rem 0 #d3d3d3;
`;

function Navbar() {
	const { data: { me } = {}, loading } = useQuery(ME);
	const [signout] = useMutation(SIGNOUT, {
		refetchQueries: QUERIES_AFFECTED_BY_SIGN,
	});
	const NAV_ITEMS = [
		{ name: "투표", to: "/", style: { color: "black" } },
		{ name: "경매계산기", className: "disabled" },
		{ name: "직업게시판", className: "disabled" },
		{ name: "인벤검색", className: "disabled" },
	];
	return (
		<Nav className="navbar navbar-expand-xl navbar-light mb-4">
			<div className="container-lg">
				<Link to="/" className="navbar-brand">
					<img
						src={`${process.env.REACT_APP_IMAGE_URL}/mkk_logo_s.png`}
						className="d-inline-block align-text-top"
						style={{ height: "1.5rem", margin: ".625rem" }}
					/>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent">
					<ul
						className="navbar-nav me-auto mb-2 mb-lg-0"
						style={{ marginLeft: "auto" }}>
						{NAV_ITEMS.map(
							(
								{ name, className = "", to, style = {} },
								index
							) => (
								<li key={index} className="nav-item">
									<Link
										to={to ?? false}
										className={`nav-link ${className}`}
										style={{ margin: "0 1rem", ...style }}>
										{name}
									</Link>
								</li>
							)
						)}
					</ul>
					<LoawaSearchForm />
					<ul className="navbar-nav">
						{loading ? null : me ? (
							<li className="nav-item dropdown">
								<a
									className="nav-link"
									style={{ color: "black" }}
									data-toggle="dropdown"
									href="#"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false">
									<UserIcon />
									<span
										style={{
											verticalAlign: "middle",
											marginRight: ".4375rem",
										}}>
										{me.name}
									</span>
									<img
										src={`${process.env.REACT_APP_IMAGE_URL}/^.png`}
										alt="caret"
										style={{
											transform: "rotate(180deg)",
											height: "1rem",
										}}
									/>
								</a>
								<ul
									className="dropdown-menu dropdown-menu-right"
									aria-labelledby="navbarDropdown">
									<li>
										<Link className="dropdown-item disabled">
											원정대 관리
										</Link>
									</li>
									{me?.roles.some(
										(role) => role === "manager"
									) ? (
										<li>
											<a
												className="dropdown-item"
												href={`${MKK}/manage/`}>
												관리자 페이지
											</a>
										</li>
									) : null}
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<Link
											className="dropdown-item"
											onClick={() => signout()}>
											로그아웃
										</Link>
									</li>
								</ul>
							</li>
						) : (
							<li className="nav-item">
								<Link
									to="/signin/"
									className="nav-link"
									style={{ color: "black" }}>
									<UserIcon />
									<span style={{ verticalAlign: "middle" }}>
										로그인
									</span>
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</Nav>
	);
}

export default Navbar;
