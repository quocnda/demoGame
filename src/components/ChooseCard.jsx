import React, { useState } from 'react'
import { useGlobalContext } from '../context'
import { ethers } from 'ethers';
import { Contract_Coin_ABI, contract_address_Coin } from '../constant/constant';
const ChooseCard = ({ toggle, settoggle, items_user_count_amount, items_user_count_image, setwaitoppo, player, choosed_card, setchoose_card, roomname, socket, account }) => {
  const { items_user_details } = useGlobalContext();
  const [card, setcard] = useState([])
  const [isSigner, setisSgner] = useState(false)
  const [is_ready, setis_ready] = useState(false)
  const handleSettoggle = () => {
    if (player == 1) {
      setwaitoppo(false)
    }
    console.log(items_user_count_image)
    toggle ? settoggle(false) : settoggle(true)
    console.log("close la ", close)
  }
  const handleOnClickChooseCard = (index) => {
    if (card.includes(index)) {
      card.splice(card.indexOf(index), 1)
    }
    else {
      card.push(index)
    }
    if (card.length == 5) {
      console.log("card size ok")
      setis_ready(true)
      setchoose_card(card)
    }
    else {
      setis_ready(false)
    }
    console.log("chooose card la", card)
  }
  const ApproveForBattle = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    console.log("signer  la", signer)
    if (signer._isSigner == true) {
      setisSgner(true)
    }
    console.log("isSigner la ", isSigner)
    if (signer._isSigner == false) {
      alert("Please Sign to join Game")
    }
    else {
      setchoose_card(card)
      if (player == 1) {
        console.log("choose card la ", choosed_card)
        socket.emit("create-battle", roomname, choosed_card, account)
        socket.on("room_datontai", () => {
          alert("Phong da ton tai, nhap ten phong khac man")
          settoggle(false)
        })
        setwaitoppo(true)
        toggle ? settoggle(false) : settoggle(true)
        console.log("toggle la", toggle)
      }
      else {
        console.log("choose card la ", choosed_card)
        socket.emit("join-battle", roomname, choosed_card, account)
      }
    }
    const contract = new ethers.Contract(contract_address_Coin, Contract_Coin_ABI, signer)
    let value = await contract.transferCoinForContract(account)
  }
  const handleOnClickPlay = () => {
    ApproveForBattle();
  }
  return (
    <div className="product">
      <div className='product__details'>
        {items_user_details.map((item, index) => (
          <div key={index} >
            <div onClick={() => handleOnClickChooseCard(item)}>
              <img src={item.image} width="240" height="230" />
              {console.log("items la ",item.image)}
            </div>
          </div>
        ))}
        <div className='product__close'>
          <button onClick={handleSettoggle}  >
            <img src='https://i.imgur.com/kwnCxKr.png' alt='Close' />
          </button>
        </div>
        <div >
          {
            is_ready &&
            (<button type='button' className='nav__connectbtn' onClick={() => { handleOnClickPlay() }}>
              Play
            </button>)
          }
        </div>
      </div>
    </div >
  );
}

export default ChooseCard