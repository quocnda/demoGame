import React, { useEffect } from 'react'
import { PageHOC,Card,PlayerInfo } from '../components'
import { useGlobalContext } from '../context'
import { useState } from 'react'
import { battlegrounds } from '../assets'
import { attack, attackSound, defense, defenseSound, player01 as player01Icon, player02 as player02Icon } from '../assets';
import styles from '../styles'
const BattleRound = () => {
  const {socket,contract_of_nft,account,battleGround} = useGlobalContext();
  const [battlename,setbattlename] = useState("")
  const [name,setname]  = useState("")
  const [name_oppo,setname_oppo] = useState("")
  const [player2,setplayer2] = useState({})
  const [player1,setplayer1] = useState({})

  const LoadName = () => {
    socket.emit("get_player_data")
    socket.on("name_player", (name_owner) =>{
      setname(name_owner)
    })
    socket.on("server_send_name" , (data) => {
            if(data[0] == name) {
              setname_oppo(data[1])
              setplayer1({name : data[0],att : 20, def: 20, health: 30,mana: 25})
              setplayer2({name: data[1], att: 'X', def: 'X', health: 30, mana: 25})
            }
            else {
              setname_oppo(data[0])
              setplayer1({name : data[1],att : 20, def: 20, health: 30,mana: 25})
              setplayer2({name: data[0], att: 'X', def: 'X', health: 30, mana: 25})
            }
    })
  }
  return (
    <>
    {LoadName()}
      <div className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround} `}>
      <PlayerInfo player={player2} playerIcon={player02Icon} mt />

      <div className={`${styles.flexCenter} flex-col my-10`}>
       

        <div className="flex items-center flex-row">
        </div>
      </div>

      <PlayerInfo player={player1} playerIcon={player01Icon} />

      {/* <GameInfo /> */}
    </div>
    </>
  )
}

export default PageHOC (BattleRound)