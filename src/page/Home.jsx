import React, { useState } from 'react';
import { PageHOC } from '../components';
import { useGlobalContext } from '../context';
import styles from '../styles';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {account,socket} = useGlobalContext();
  const navigate = useNavigate();
  const [playerName,setPlayerName] = useState('')
  const handleOnClickLogin = () => {
    if(!window.ethereum) {
      alert(
        "Please connect Metamask"
      )
    }
    else {
      if(playerName == "")
      {
        alert ("Please choose the player name")
      }
      else {
      socket.emit("set_name_player",playerName)
      navigate('/menu')
      }
    }
  }
return (
    <div>
         <label htmlFor="name" className={styles.label}>Name</label>
    <input
      type="text"
      placeholder="Enter your player name"
      value={playerName}
      onChange={(e) => {
       setPlayerName(e.target.value);
      }}
      className={styles.input}
    />
         <button
    type="button"
    className={`${styles.btn} mt-6`}
    onClick={handleOnClickLogin}
  >
    Login
  </button>
    </div>

  )
};

export default PageHOC(
  Home,
  <>Welcome to Game Web3 <br/> a game made by Red Hawks Team </>,
  
)