import { useEffect, useState } from 'react'
import { ethers } from 'ethers'


import { close } from '../assets'
import styles from '../styles'

const Makeitem= ({toggle,settoggle,contract,provider}) => {
  const [hasBought, setHasBought] = useState(false)
  const [number,setnumber] = useState(0)
  const [numberofsold,setnumberofsold] = useState(0)
  const [price,setprice] = useState(0)
 const MakeHandler= async() => {
    console.log(number)
    console.log(numberofsold)
    const signer =provider.getSigner()
    let transaction = contract.connect(signer).makeItem(number,numberofsold,price)
    await transaction.wait()

 }
  const handleOnClick = (e) => {
    setnumber(e.target.value)
  }
  const handleOnClickSetnumbersold = (e) => {
    setnumberofsold(e.target.value)
  }
  const handldeOnPrice = (e) => {
    setprice(e.target.value)
  }
  return (
    <div className="product">
        <div className='test__product'>
             <div > 
                <input type='number' className={styles.input} bgcolor="#279aec" placeholder='id of items' value={number} onChange={handleOnClick}  />
                <input type='number' className={styles.input} placeholder='amount of items' value={numberofsold} onChange={handleOnClickSetnumbersold}  />
                <input type='number' className={styles.input} placeholder='price of items' value={price} onChange={handldeOnPrice}  />

              <button className= {styles.btn} onClick={MakeHandler}>
                makeItem
              </button>
              <div>
                <button onClick={settoggle} className='product__close' >
                  <img src='https://i.imgur.com/kwnCxKr.png' alt = 'Close'/>
                </button>
              </div>

          </div>

        </div>
    </div >
  );
}

export default Makeitem;