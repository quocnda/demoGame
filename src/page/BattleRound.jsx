import React, { useEffect } from 'react'
import { PageHOC } from '../components'
import { useGlobalContext } from '../context'
import { useState } from 'react'
import styles from '../styles'
const BattleRound = () => {
  const {socket} = useGlobalContext();
  const [battlename,setbattlename] = useState("")
  const [message,setmess] = useState([])
  const handleOnClickButton = () => {
      socket.emit("bat_su_kien", battlename)
      
  }
  useEffect(() => {
    socket.on("tra_lai_mess", (mess) => {
      message.push(mess)
      console.log("mess la " ,message)
    })
  },[socket])
  return (
    
    <>
    <div className='flex flex-col mb-5'>
        <label htmlFor='name' className={styles.label}> Send Message</label>
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
      <div>
        {
          message.map((value,index) => (
            <tr>
              <td>{value}</td>
            </tr>
          ))
          } 
      </div>
    </>
  )
}

export default PageHOC (BattleRound)