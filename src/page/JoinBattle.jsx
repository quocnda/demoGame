
import React, { startTransition, useEffect, useState } from 'react';
import { PageHOC } from '../components';


import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import styles from '../styles';


const JoinBattle = () => {
    const navigate = useNavigate();
    const {socket,sum_room1} = useGlobalContext();
    const [sum_room,setsum_room] = useState(sum_room1)
    const [room_name,setroom_name] = useState("")
    
    const handleOnClickJoinGame =(roomname) => {
        console.log("chi rua bay he")
        socket.emit("join-battle",roomname)
    }
    const LoadRoom = () => {
        socket.on("sum_room" , (map) => {
            const new_map = new Map(map)
            setsum_room(new_map)
        })
    }
    const ListenTheBattle = () => {
        socket.on("battle_is_connect",(data) => {
            console.log("da nghe dc event ")
            console.log("Yes :" , data)
            navigate('/battle-round')
        })
    }
    useEffect( () => {
        LoadRoom();
    } , [socket])
    useEffect(() => {
        ListenTheBattle();
    })
  return (
    <>
        <div>
             {Array.from(sum_room).map(([key, value]) => (
                <>
                <div key={key}>
                    Key: {key}, Value: {value}
                </div>
                <button type='button' className={styles.btn} onClick={() => {handleOnClickJoinGame(key)}}>
                    Submit
                </button>
                </>
            ))}
           
        </div>
    </>
  )
}
export default PageHOC (
    JoinBattle,
)