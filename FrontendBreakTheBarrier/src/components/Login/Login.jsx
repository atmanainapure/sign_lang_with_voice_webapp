
import './Login.scss'
import { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Login = ({ setLoggedIn }) => {
	const admin_server_url = import.meta.env.VITE_APP_SERVER_URL;
	const navigate = useNavigate();
	const [signupData, setSignupData] = useState({
		username: "",
		password: "",
		gender: "",
	});

	const [loginData, setLoginData] = useState({
		username: "",
		password: "",

	});

	const onSignupChange = (event) => {
		const { name, value } = event.target;
		setSignupData((prevData) => {
			return { ...prevData, [name]: value };
		});
	}
	const signUpSubmit = async (e) => {
		e.preventDefault();
		axios.post(
			`${admin_server_url}auth/Signup`,
			{
				username: signupData.username,
				password: signupData.password,
				gender: signupData.gender.toLocaleUpperCase(),
			}
		).then((res) => {
			console.log("res-->", res)
			localStorage.setItem("username", res.data.data.username);
			localStorage.setItem("gender", res.data.data.gender);
			setLoggedIn(true)
			navigate('/')
		}).catch((error) => {
			console.log("error-->", error)
		})

	}

	const onChange = (event) => {
		const { name, value } = event.target;
		setLoginData((prevData) => {
			return { ...prevData, [name]: value };
		});
	}

	const submit = async (e) => {
		e.preventDefault();
		axios.post(
			`${admin_server_url}auth/Login`,
			{
				username: loginData.username,
				password: loginData.password,
				gender: "MALE",
			}
		).then((res) => {
			console.log(res)
			localStorage.setItem("username", res.data.data.username);
			localStorage.setItem("gender", res.data.data.gender);
			setLoggedIn(true)
			navigate('/')
		}).catch((error) => {
			console.log("error-->", error)
		})
	}

	let changeForm = (e) => {
		let switchCtn = document.querySelector("#switch-cnt");
		let switchC1 = document.querySelector("#switch-c1");
		let switchC2 = document.querySelector("#switch-c2");
		let switchCircle = document.querySelectorAll(".switch__circle");
		let aContainer = document.querySelector("#a-container");
		let bContainer = document.querySelector("#b-container");

		switchCtn?.classList.toggle("is-txr");
		switchCircle[0]?.classList.toggle("is-txr");
		switchCircle[1]?.classList.toggle("is-txr");

		switchC1?.classList.toggle("is-hidden");
		switchC2?.classList.toggle("is-hidden");
		aContainer?.classList.toggle("is-txl");
		bContainer?.classList.toggle("is-txl");
		bContainer?.classList.toggle("is-z200");
	}

	return (
		<div className='container login_container'>
			<div className="bg-sections">
				<div className="line"></div>
				<div className="line"></div>
				<div className="line"></div>
				<div className="line"></div>
				<div className="line"></div>
			</div>

			<div className="main">
				<div className="container a-container" id="a-container">
					<form className="form" id="a-form" method="" action="">
						<h2 className="form_title title">Create Account</h2>
						<input
							className="form__input"
							type="text"
							name="username"
							value={signupData.username}
							placeholder="UserName"
							onChange={onSignupChange}
						/>
						<input
							className="form__input"
							type="password"
							name="password"
							value={signupData.password}
							placeholder="Password"
							onChange={onSignupChange}
						/>
						<input
							className="form__input"
							type="text"
							name="gender"
							value={signupData.gender}
							placeholder="Gender"
							onChange={onSignupChange}
						/>
						<input
							className="form__input"
							type="text"
							placeholder="Category : Blind / Deaf"
						/>
						<button onClick={signUpSubmit} style={{ cursor: 'pointer' }} className="form__button button submit">SIGN UP</button>
					</form>
				</div>
				<div className="container b-container" id="b-container">
					<form className="form" id="b-form" method="" action="">
						<h2 className="form_title title">Sign in to Website</h2>
						<input className="form__input" type="text"
							name="username"
							value={loginData.username}
							placeholder="UserName"
							onChange={onChange} />
						<input className="form__input" type="password"
							name="password"
							value={loginData.password}
							placeholder="Password"
							onChange={onChange} />
						<button onClick={submit} style={{ cursor: 'pointer' }} className="form__button button submit">SIGN IN</button>
					</form>
				</div>
				<div className="switch" id="switch-cnt">
					<div className="switch__circle"></div>
					<div className="switch__circle switch__circle--t"></div>
					<div className="switch__container" id="switch-c1">
						<h2 className="switch__title title">Welcome Back !</h2>
						<p className="switch__description description">To keep connected with us please login with your personal info</p>
						<button onClick={changeForm} className="switch__button button switch-btn">SIGN IN</button>
					</div>
					<div className="switch__container is-hidden" id="switch-c2">
						<h2 className="switch__title title">Hello Friend !</h2>
						<p className="switch__description description">Enter your personal details and start journey with us</p>
						<button onClick={changeForm} className="switch__button button switch-btn">SIGN UP</button>
					</div>
				</div>
			</div>


		</div>
	)
}

export default Login