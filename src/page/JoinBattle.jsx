import React, { startTransition, useEffect, useState } from 'react';
import { PageHOC,ChooseCard } from '../components';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

import styles from '../styles';
const JoinBattle = () => {
    const navigate = useNavigate();
    const { socket, account,sum_room1,items_user_count_amount,items_user_count_image } = useGlobalContext();
    const [sum_room, setsum_room] = useState(sum_room1)
    const [room_name, setroom_name] = useState("")
    const [bool_choose_card,setbool_choose_card] = useState(false)
    const [is_ready,setis_ready] = useState(false)
    const [choosed_card,setchoose_card] = useState([])
    const [value,setvalue] = useState(null)
    const handleOnClickJoinGame = (roomname) => {
        setbool_choose_card(true)
        setroom_name(roomname)
    }
    const LoadRoom = () => {
        socket.on("sum_room", (map) => {
            const new_map = new Map(map)
            setsum_room(new_map)
        })
    }
    const ListenTheBattle = () => {
        socket.on("battle_is_connect", (data) => {
            navigate(`/battle-round/${data}`)
        })
    }
    useEffect(() => {
        LoadRoom();
    })
    useEffect(() => {
        ListenTheBattle();
    })
    return (
        <>
            {LoadRoom()} 
            {bool_choose_card && (
                <ChooseCard 
                toggle={bool_choose_card}
                settoggle={setbool_choose_card}
                items_user_count_amount={items_user_count_amount}
                items_user_count_image={items_user_count_image}
                setwaitoppo
                player={2}
                choosed_card = {choosed_card}
                setchoose_card = {setchoose_card}
                roomname = {room_name}
                socket = {socket}
                account={account}
                />
            )}
            <div>
                <div>
                    <h2 className={styles.joinHeadText}>Available Battles:</h2>
                    {Array.from(sum_room).map(([key, value]) => (
                        <>
                            <div key={key}>
                                Battle: {key}, Value: {value}
                            </div>
                            <button type='button' className={styles.btn} onClick={() => { handleOnClickJoinGame(key) }}>
                                Submit
                            </button>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}
export default PageHOC(
    JoinBattle,
)