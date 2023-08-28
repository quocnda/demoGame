import React, { startTransition, useEffect, useState } from 'react';
import { PageHOC } from '../components';


import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import styles from '../styles';

const CreateBattle = () => {
  var i =0;
  const {socket}  =useGlobalContext();
  const navigate = useNavigate();
  const [battlename,setbattlename] = useState("");
  const handleOnClickButton =() => {
    console.log(battlename)
    socket.emit("create-battle" , battlename)
    socket.on("room_datontai" , () => {
      i++;
      alert("Phong da ton tai, nhap ten phong khac man" , i)
    })
  }
  const ListenTheBattle = () => {
    socket.on("battle_is_connect",(data) => {
        console.log("da nghe dc event ")
        console.log("Yes :" , data)
        navigate('/battle-round')
    })
}
useEffect(() => {
  ListenTheBattle();
})
  return (
    <>
      <div className='flex flex-col mb-5'>
        <label htmlFor='name' className={styles.label}> Battle Name</label>
        <input 
        type='text'
        placeholder='Please give the battle name ...'
        value={battlename}
        onChange={(e) => {
          setbattlename(e.target.value)
        }}
         className={styles.input}
        />
        <button
        type='button'
        className= {`${styles.btn} mt-6`}
        onClick={handleOnClickButton}
        >
          Battle
        </button>
      </div>
    </>
  )
};

export default PageHOC(
  CreateBattle,
  
)