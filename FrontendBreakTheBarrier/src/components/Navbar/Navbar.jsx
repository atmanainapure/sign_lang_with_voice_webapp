import React, { useState } from 'react'
import { useEffect } from 'react'
import { IoMdNotifications } from 'react-icons/io'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = ({ loggedIn }) => {
	const [username, setUsername] = useState("");
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const userName = localStorage.getItem("username")
		if (userName) {
			setUsername(userName);
		}
	}, [loggedIn])

	useEffect(() => {
		const listener = () => {
			if (window.scrollY > 60 && !scrolled) {
				setScrolled(true)
			}
			else if (window.scrollY < 60 && scrolled) {
				setScrolled(false)
			}
		}

		window.addEventListener('scroll', listener)
	}, [scrolled])

	return (
		<div className={'navbar container' + (scrolled ? ' scrolled' : '')}>
			<Link to='/'>
				<div className="logo">
					E!motion
				</div>
			</Link>

			<div className="nav-right">
				<IoMdNotifications />

				{
					username === "" ?
						<Link to='/auth'><div className="btn">Login / Signup</div></Link> :
						<div className='username'><div className='bold'>Username |{'>'} </div><div>{username}</div></div>
				}
			</div>
		</div>
	)
}

export default Navbar