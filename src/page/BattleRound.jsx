import React, { useEffect } from 'react'
import { Card, PlayerInfo } from '../components'
import { useGlobalContext } from '../context'
import { useState } from 'react'
import { ethers } from 'ethers'
import { Contract_Coin_ABI, contract_address_Coin } from '../constant/constant'
import { battlegrounds } from '../assets'
import { attack, attackSound, defense, defenseSound, player01 as player01Icon, player02 as player02Icon } from '../assets';
import styles from '../styles'
const BattleRound = () => {
  const { socket, contract_of_coin, provider_of_coin, contract_of_nft, account, battleGround } = useGlobalContext();
  const [battlename, setbattlename] = useState("")
  const [name, setname] = useState("")
  const [name_oppo, setname_oppo] = useState("")
  const [player2, setplayer2] = useState({})
  const [player1, setplayer1] = useState({})
  const [player1_card, setplayer1_card] = useState([])
  const [player2_card, setplayer2_card] = useState([])
  const [account_player_2, setaccount_player_2] = useState("")
  const [account_player_1, setaccount_player_1] = useState("")
  const [bool_da_load_game,setbool_da_load_game] = useState(false)
  const [is_end_game,setis_end_game] = useState(false)
  const LoadName = async () => {
   socket.emit("get_player_data")
    socket.on("card_player", (pedri) => {
      console.log("data la", pedri)
      setname(pedri.name)
      const data = pedri.data_player
      console.log("account player 1", data[0][1])
      console.log("account player 2", data[1][1])
      setaccount_player_1(data[0][1])
      setaccount_player_2(data[1][1])
      const data_card = pedri.data_card
      if (data[0][0] == name) {
        setname_oppo(data[1][0])
        setplayer1_card(data_card[0])
        setplayer2_card(data_card[1])
        setplayer1({ name: data[0], health: 30, mana: 25 })
        setplayer2({ name: data[1],  health: 30, mana: 25 })
      }
      else {
        setname_oppo(data[0][0])
        setplayer1_card(data_card[1])
        
        setplayer2_card(data_card[0])
      
        setplayer1({ name: data[1], health: 30, mana: 25 })
        setplayer2({ name: data[0],  health: 30, mana: 25 })
      }
      console.log("account 1", account_player_1)
      console.log("account 2", account_player_2)
    })
    console.log("da vao Load Name")
  }
  const WinnrerGame = async (winner) => {
    if(name == winner[0]) 
    {
      const account_winner = winner[1]
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      // console.log("signer la", signer)
      const contract = new ethers.Contract(contract_address_Coin, Contract_Coin_ABI, signer)
      
      let value = await contract.transferCoinForWinner(account_winner)
      console.log("value :", value)
    }
      
  }
  const handleOnClickAttack = (item) => {
    console.log("item attack",parseInt(item[4].hex))
    const acttack_point = parseInt(item[4].hex)
    const mana_point = parseInt(item[6].hex)
    const blood_player1 = player1.health
    const mana_player1 = player1.mana
    socket.emit("player_acttack" , acttack_point,mana_point,blood_player1,mana_player1)
    socket.on("het_luot_choi" , () => {
      alert("You must wait to opponent play")
    })
  }
  const handleOnClickDefense = (item) => {
    console.log("item defensive",parseInt(item[5].hex))
    const defensive_poin = parseInt(item[5].hex)
    const mana_point = parseInt(item[6].hex)
    const blood_player1 = player1.health
    const mana_player1 = player1.mana
    socket.emit("player_defensive" , defensive_poin,mana_point,blood_player1,mana_player1)
    socket.on("het_luot_choi" , () => {
      alert("You must wait to opponent play")
    })
  }
  const updatePower = (detail_power) => {
    const name_1 = detail_power.player_name1
      const name_2  = detail_power.player_name2
      if (name_oppo == name_1) {
        setplayer1({ name: name_2 ,  health: detail_power.blood_2, mana : detail_power.mana_2})
        setplayer2({ name: name_1 , health: detail_power.blood_1, mana: detail_power.mana_1 })
        console.log("player1 health",player1.health)
        console.log("player2 health",player2.health)
        console.log("name owner ",name)
        console.log("name oppo ",name_oppo)
      }
      else{
        setplayer1({ name: name_1 ,  health: detail_power.blood_1, mana: detail_power.mana_1 })
        setplayer2({ name: name_2 , health: detail_power.blood_2, mana: detail_power.mana_2 })
        console.log("player1 health",player1.health)
        console.log("player2 health",player2.health)
        console.log("name owner ",name)
        console.log("name oppo ",name_oppo)
      }
      console.log("player1 health",player1.health)
      console.log("player2 health",player2.health)
  }
  const ListenActionFromServer = () => {
    socket.on("2_player_attack" ,(detail_power) => {
      updatePower(detail_power)
    })
    socket.on("2_player_defensive" ,(detail_power) => {
       updatePower(detail_power)
    })
    socket.on("defpoint_equal_to_acttackPoint" , (detail_power) =>{
      updatePower(detail_power)
    })
    socket.on("acttackpoint_higher_than_defenpoint",(detail_power) => {
    updatePower(detail_power)
    })
    socket.on("defpoint_equal_to_acttackPoint_" ,(detail_power) =>{
      updatePower(detail_power)
    })
    socket.on("acttackpoint_higher_than_defenpoint_", (detail_power) => {
      updatePower(detail_power)
    })
    socket.on("game_end" , (winner) => {
      alert( winner[0] ,"is winner")
      WinnrerGame(winner)
   })
   socket.on("game_end_because_disconnect" , (winner) => {
    alert("The winner is " , winner[0])
    WinnrerGame(winner)
   })
  }
  useEffect(() => {
    console.log("da vao useeffect")
    LoadName();
    setbool_da_load_game(true)
  }, [])
  useEffect(() => {
    ListenActionFromServer()
  },[socket])
  return (
    <>
    {!bool_da_load_game && LoadName()}
      <div className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround} `}>
        <PlayerInfo player={player2} playerIcon={player02Icon} mt />
        <div>
          <div className="card__player2">
            {player2_card.map((item, index) => (
              <div key={index}>
                <div className='card__image'>
                  <img src='https://i.imgur.com/d8uuqHu.png' width="80" height="40" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.flexCenter} flex-col my-10`}>
          <div className="flex items-center flex-row">
          </div>
        </div>
        <div>
          <div>
            <div className='card__player1'>
              {player1_card.map((item, index) => (
                <div key={index} className = "display: inline-block">
                  <div
                    className={`${styles.gameMoveBox} ${styles.flexCenter} ${styles.glassEffect} "mr-2 hover:border-yellow-400 float:left" `}
                  >
                    <img src={attack} alt="action_img" onClick={() => handleOnClickAttack(item)} className={styles.gameMoveIcon} />
                  </div>
                  <div className='card__image'>
                    {console.log("image laf", item[2])}
                    <img src={item[2]} width="100" height="40" />
                  </div>
                  <div
                    className={`${styles.gameMoveBox} ${styles.flexCenter} ${styles.glassEffect} "ml-6 hover:border-red-600 float:left " `}
                  >
                    <img src={defense} alt="action_img" onClick={() => handleOnClickDefense(item)} className={styles.gameMoveIcon} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <PlayerInfo player={player1} playerIcon={player01Icon} />
      </div>
    </>
  )
}

export default BattleRound