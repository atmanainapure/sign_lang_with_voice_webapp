import React, { useEffect } from 'react'
import './Home.scss'
import noCall from '../../assets/images/hero.png'
import hero from '../../assets/images/bunchOfPeeps.jpg'
import { FiPhoneCall } from 'react-icons/fi'
import Lottie from 'react-lottie-player';
import chatPeeps from '../../assets/images/chatPeeps.json'
import { Link, Router, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Home = ({ loggedIn, loading, setLoading }) => {
	const navigate = useNavigate();

	const call = () => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false)
			navigate('/call')
		}, [3000])
	}

	return (
		<div className='home container'>
			<div className="bg-sections">
				<div className="line"></div>
				<div className="line"></div>
				<div className="line"></div>
				<div className="line"></div>
				<div className="line"></div>
			</div>
			{loading ? <div className='loading'>
				Connecting...
			</div> : <><div className="hero-section">
				<div className="left">
					<div className="box primary-scroll">
						<div className="user" onClick={call}>
							<div className="name">Atman (Deaf)</div>
							<div className="right">
								<FiPhoneCall />
							</div>
						</div>
						<div className="user">
							<div className="name">Noman</div>
							<div className="right">
								<FiPhoneCall />
							</div>
						</div>
						<div className="user">
							<div className="name">Varun</div>
							<div className="right">
								<FiPhoneCall />
							</div>
						</div>
					</div>
				</div>
				<div className="right">
					<div className="box">
						<img src={hero} alt="" />
						<Link to='/exploresigns'><div className="btn">Explore Signs</div></Link>
					</div>

				</div>
			</div>
				<div className="about">
					<div className="about-info">
						<div className="image">
							<Lottie
								loop
								animationData={chatPeeps}
								play
								style={{ marginRight: "auto", width: "300px", minHeight: "200px" }}
							/>
						</div>
						<div className="content-right">
							<div className="content">
								Disability cannot stop a person from becoming a complete personality
								- Samyak Lalit
							</div>
						</div>
					</div>

					<div className="about-info">
						<div className="content-left">
							<div className="content">
								Abled does not mean enabled. Disabled does not mean less abled
								- Khang Kijarro Nguyen
							</div>
						</div>
						<div className="image">
							<img src={noCall} width="400px" alt="" />
						</div>
					</div>
				</div></>}
		</div>
	)
}

export default Home