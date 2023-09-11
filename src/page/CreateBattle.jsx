import React, { startTransition, useEffect, useState } from 'react';
import { PageHOC,GameLoad,ChooseCard} from '../components';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import styles from '../styles';

const CreateBattle = () => {
  const {socket,account,contract_of_nft,items_user_count_amount,items_user_count_image}  =useGlobalContext();
  const navigate = useNavigate();
  const [battlename,setbattlename] = useState("");
  const [waitoppo, setwaitoppo] = useState(false);
  const [bool_choose_card,setbool_choose_card] = useState(false)
  const [choosed_card,setchoose_card] = useState([])
  const handleOnClickButton =() => {
    console.log(battlename)
    setwaitoppo(true)
    setbool_choose_card(true)
    
  }
  const ListenTheBattle = () => {
    socket.on("battle_is_connect",(data) => {
        navigate(`/battle-round`)
    })
}
  
useEffect(() => {
  ListenTheBattle();
})
  return (
    <>
       { bool_choose_card ? (<ChooseCard
        toggle = {bool_choose_card}
        settoggle = {setbool_choose_card}
        items_user_count_amount = {items_user_count_amount}
        items_user_count_image = {items_user_count_image}
        setwaitoppo = {setwaitoppo}
        player  = {1}
        choosed_card= {choosed_card}
        setchoose_card={setchoose_card}
        roomname = {battlename}
        socket = {socket}
        account = {account}
       />) : (waitoppo && <GameLoad/>)}
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