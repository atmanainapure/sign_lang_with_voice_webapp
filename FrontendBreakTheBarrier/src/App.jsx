import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Navbar } from "./components/import";
import { Home } from "./pages/import";
import useSpeechToText from "react-hook-speech-to-text";
import VideoChat from "./pages/VideoChat/VideoChat";
import { useLocation, useNavigate } from 'react-router-dom'
import ExploreSigns from "./pages/ExploreSigns/ExploreSigns";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [login, setLogin] = useState(null);
  const [sleep, setSleep] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const speak = (msg) => {
    console.log(msg)
    const speech = new SpeechSynthesisUtterance()
    speech.text = msg
    window.speechSynthesis.speak(speech)

  }

  useEffect(() => {
    if (!isRecording)
      startSpeechToText();
    document.addEventListener(onMessageChange, speakOnClick);
    return () => document.removeEventListener(onMessageChange, speakOnClick);
  }, [])

  const onMessageChange = () => {
    if (message) {
      speak(message)
    }
  }

  const speakOnClick = (e) => {
    if (e.keyCode == 32)
      speak(message)
  }

  useEffect(() => {
    if (location.pathname == "/call") {
      document.body.style.paddingTop = "0px";
    } else {
      document.body.style.paddingTop = "70px";
    }
  }, [location.pathname])

  useEffect(() => {
    if (message != "")
      speak(message)
  }, [message])

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  useEffect(() => {
    if (interimResult)
      setTranscript(interimResult);

  }, [interimResult])

  useEffect(() => {
    setAI();
    console.log(transcript)
  }, [transcript])

  const setAI = () => {
    const lowerTrans = transcript.toLocaleLowerCase();
    if (!sleep) {
      // if (lowerTrans.includes("stop")) {
      //   setSleep(true);
      //   setMessage("See you later sir")
      // }
      setTimeout(() => {
        if (lowerTrans.includes("login") || lowerTrans.includes("log in") || lowerTrans.includes("signup") || lowerTrans.includes("sign up")) {
          navigate('/auth')
        }
        else if (lowerTrans.includes("explore signs") || lowerTrans.includes("explore sign") || lowerTrans.includes("explore")) {
          navigate('/exploresigns')
        }
        else if (lowerTrans.includes("home") || lowerTrans.includes("homepage")) {
          navigate('/')
        }
        else if (lowerTrans.includes("shreyash") || lowerTrans.includes("call") || lowerTrans.includes("shreyas") || lowerTrans.includes("suresh")) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false)
            navigate('/call')
          }, [3000])
        }
        else if (lowerTrans.includes("submit")) {
          setLogin(true)
        }
      }, 1000)
    }
    else {
      if (lowerTrans.includes("wake up")) {
        setMessage("I am online Sir")
        setSleep(false)
      }
    }
  }
  return (
    <div className="App">
      {location.pathname === "/call" ? "" : <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      <Routes>
        <Route path="/" element={<Home loading={loading} setLoading={setLoading} />} />
        <Route path='/exploresigns' element={<ExploreSigns />} />
        <Route path="/auth" element={<Login setLoggedIn={setLoggedIn} login={login} />} />
        <Route path='/call' element={<VideoChat />} />
      </Routes>
    </div>
  );
}


export default App;
