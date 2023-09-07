import React, { useState } from 'react'

const ChooseCard = ({toggle,settoggle,items_user_count_amount,items_user_count_image,setwaitoppo,player,choosed_card,setchoose_card,roomname,socket}) => {
    const [card,setcard] = useState([])
    const [is_ready,setis_ready] = useState(false)
    const handleSettoggle = () => {
        if(player == 1) {
            setwaitoppo(false)
        }
        
        toggle ? settoggle(false) : settoggle(true)
        console.log("close la ",close)
      }
      const handleOnClickChooseCard = (index) => {
        if(card.includes(index)) {
            card.splice(card.indexOf(index),1)
        }
        else {
            card.push(index)
        }
        if(card.length ==5  ) {
            console.log("card size ok")
            setis_ready(true)
            setchoose_card(card)
        }
        else {
            setis_ready(false)
        }
        console.log("chooose card la" ,card)
      }
      const handleOnClickPlay =() => {
        setchoose_card(card)
      if (player == 1) {
        console.log("choose card la ", choosed_card)
        socket.emit("create-battle" ,roomname,choosed_card)
        socket.on("room_datontai" , () => {
        alert("Phong da ton tai, nhap ten phong khac man")
        settoggle(false)
      })
        setwaitoppo(true)
        toggle ? settoggle(false) : settoggle(true)
        console.log("toggle la",toggle)
      }
      else {
        console.log("choose card la ", choosed_card)
        socket.emit("join-battle", roomname,choosed_card)
      }
        
      }
      return (
        <div className="product">
        <div className='product__details'>
          {items_user_count_image.map((item, index) => (
                        <div  key={index} >
                            <div onClick={() => handleOnClickChooseCard(item)}>
                                {console.log(item)}
                                <img src = {item} width="240" height="230" />
                            </div>
                            <div className='nav__links'> 
                             amount   {items_user_count_amount[index]}
                             </div>
                        </div>
                    ))}
        
          <div className='product__close'>
                <button onClick={handleSettoggle}  >
                  <img src='https://i.imgur.com/kwnCxKr.png' alt = 'Close'/>
                </button>
          </div>
          <div >
            {
                is_ready &&
            (<button type='button' className='nav__connectbtn' onClick={() => {handleOnClickPlay()}}>
                Play
            </button>)
            }   
          </div>
        </div>
    </div >
    );
}

export default ChooseCard