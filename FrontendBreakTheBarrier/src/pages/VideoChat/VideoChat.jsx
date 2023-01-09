import React from 'react'
import { BsFillMicFill } from 'react-icons/bs'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { RiSendPlaneFill } from 'react-icons/ri'
import './VideoChat.scss'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import good from '../../assets/images/good.png'
import chatDefault from '../../assets/images/chatDefault.json'
import Lottie from "react-lottie-player"
import shreyash from '../../assets/images/shreyash.mp4'
import atman from '../../assets/images/atman.mp4'
import io from 'socket.io-client';
import axios from 'axios'
const server_url = import.meta.env.VITE_APP_SERVER_URL;

const VideoChat = () => {
	const chatContainerRef = useRef(null);
	const [template1, setTemplate1] = useState(null);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([{
		user: 'atman',
		message: "Hi How are you doing"
	}, {
		user: 'shreyash',
		message: "Oh i am fine thanks for asking",
		img: good,
	}, {
		user: 'atman',
		message: "Can we meet tomorrow",
	}, {
		user: 'shreyash',
		message: "Yes sure i am available",
		img: "",
	}, {
		user: 'atman',
		message: "Good",
	}, {
		user: 'atman',
		message: "Bye",
	}]);
	const [counter, setCounter] = useState(-1);
	const [socket, setSocket] = useState(null);


	useEffect(() => {
		const newSocket = io(`${server_url}`);
		setSocket(newSocket);
		return () => newSocket.close();
	}, [setSocket]);

	useEffect(() => {
		if (chatContainerRef) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
		}
		document.addEventListener("keydown", pressed)
		// axios.get(`http://127.0.0.1:8000`).then((res) => {
		// 	setTemplate1({ __html: res.data })
		// }).catch((res) => {
		// 	console.log(res);
		// })

		// axios.get(`http://127.0.0.1:8000/mask_feed`).then(res => console.log(res)).catch((e) => console.log(e))
		return () => document.removeEventListener("keydown", pressed);
	}, [])

	const pressed = (e) => {
		if (e.keyCode === 82) {
			setCounter((count) => count + 1);
		}
	}

	useEffect(() => {
		const messageListener = (message) => {
			setMessages((prevMessages) => {
				const newMessages = { ...prevMessages };
				newMessages[message.id] = message;
				return newMessages;
			});
		};

		const deleteMessageListener = (messageID) => {
			setMessages((prevMessages) => {
				const newMessages = { ...prevMessages };
				delete newMessages[messageID];
				return newMessages;
			});
		};

		socket.on('message', messageListener);
		socket.on('deleteMessage', deleteMessageListener);
		socket.emit('getMessages');

		return () => {
			socket.off('message', messageListener);
			socket.off('deleteMessage', deleteMessageListener);
		};
	}, [socket]);

	const sendMessage = (e) => {
		e.preventDefault();
		socket.emit('message', value);
		setMessage('');
	}

	return (
		<div className='video_chat_container'>
			<div className="video_container">
				<div className="video">
					<video src={shreyash} autoPlay type="video/mp4" alt=""></video>
					<div className='name'>Shreyash (Blind)</div>
				</div>
				<div className="video">
					<video src={atman} autoPlay type="video/mp4" alt=""></video>
					<div className='name'>Atman (Deaf)</div>
				</div>
			</div>
			<div className="chat_container">
				<div ref={chatContainerRef} className="chat_show primary-scroll">
					{counter == -1 ? <div className='default'>
						<div className="content">
							<Lottie
								loop
								animationData={chatDefault}
								play
								style={{ marginRight: "auto", width: "400px", minHeight: "200px" }}
							/>
							<h1>Type to Chat</h1>
						</div>
					</div>
						: <div className="real_chat">
							{messages.map((msg, idx) => {
								if (idx <= counter) {
									if (msg.user == "atman")
										return (<div className="chat chat_left">
											{msg.message}
										</div>
										)

									else
										return (
											<div className='chat_img'>
												<div className="chat chat_right">
													{msg.message}
												</div>
												<img src={msg.img} alt="" />
											</div>
										)
								}
								else {
									return ""
								}
							})}
						</div>}

				</div>
				<div className="chat_bottom">
					<div className="chat_input">
						<BsFillMicFill />
						<input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder='Type a message' />
						<div className='sm-icon'><AiOutlinePaperClip /></div>
					</div>
					<div className='send'>
						<RiSendPlaneFill />
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoChat