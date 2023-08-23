import { useEffect, useState } from 'react'
import { ethers } from 'ethers'


import { close } from '../assets'

const BalanceOf= ({toggle,settoggle,items_user_count_amount,items_user_count_image}) => {
  const handleSettoggle = () => {
    toggle ? settoggle(false) : settoggle(true)
    console.log("close la ",close)
  }
  return (
    <div className="product">
    <div className='product__details'>
      
      {items_user_count_image.map((item, index) => (
                    <div  key={index} >
                        <div >
                            <img src = {item} width="240" height="230"/>
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
    </div>
</div >
);
}

export default BalanceOf;