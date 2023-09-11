import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { close } from '../assets'
import styles from '../styles'
const Product = ({  item_nft, item,items_of_sold, provider, account, dappazon, togglePop,id_of_sold }) => {
  const [number,setnumber] = useState(0)
  const buyHandler =async () => {
    const signer = await provider.getSigner()
    let transaction = dappazon.connect(signer).purchaseItem(id_of_sold+1,number)
    await transaction.wait()

  }
  const handleOnClick = (e) => {
    setnumber(e.target.value)
  }
  return (
    <div className="product">
        <div className='product__details'>
          <div className='product__image'>
            <img src={item_nft.image} alt='Product'/>
              {console.log}
          </div>
          <div className='product__overview'>
            <h1 > ID - {item.itemId.toString()}</h1>
  
             <hr/>
          
              
             <hr/>
            
             </div>
             <div className='product__order'> 
             
              <p>
                { <>
                  <p classname='product__buy'> AMOUNT </p>
                 <p> {item.amount.toString()} </p>
                 </>
                }
                {
                  <>
                  <p>PRICE</p>
                  {console.log(id_of_sold)}
                  <p> {item.price.toString()} </p>
                  <p>{item.seller.toString()}</p>
                  </>
                }
              </p>
                <input className={styles.input} type='text' placeholder='amount of items' value={number} onChange={handleOnClick}  />
              <button className='product__buy' onClick={buyHandler}>
                Buy now
              </button>

          </div>
          <div className='product__close'>
                <button onClick={togglePop}  >
                  <img src='https://i.imgur.com/kwnCxKr.png' alt = 'Close'/>
                </button>
          </div>
        </div>
    </div >
  );
}

export default Product;