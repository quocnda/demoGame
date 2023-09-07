import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import { Makeitem } from '../components'
import {Navigation} from '../components'
import {Product} from '../components'
import {Section} from '../components'
import { useGlobalContext } from '../context'
import { BalanceOf} from '../components'

const Market = () =>{


    const { provider_of_coin, account, contract_of_coin, provider, setaccount, contract_of_nft, provider_of_nft, items_of_sold, items, contract_from_market,balance_ } = useGlobalContext();
    const [item, setitem] = useState(null)
    const [toggle, settoggle] = useState(false)
    const [toggleofMakeitem, settoggleofMakeitem] = useState(false)
    const [items_of_sold_id, setitem_of_sold_id] = useState(0)
    const [item_from_nft, setitem_from_nft] = useState(null)
    const [toggleofBalanceOf,settoggleBalanceOf] = useState(false)
    const [items_user_count_amount,setitem_user_count_amount] = useState([])
    const [items_user_count_image,setitem_user_count_image] = useState([])
    const togglePop = (id) => {
        const item_ = items_of_sold[id]
        if (item_ == undefined) {
          console.log("da vao day")
        }
        else {
          const item = items[item_.itemId - 1]
          setitem_from_nft(item)
        }
        setitem(item_)
        toggle ? settoggle(false) : settoggle(true)
      }
      const togglePopItem = () => {
        toggleofMakeitem ? settoggleofMakeitem(false) : settoggleofMakeitem(true)
      }

    return (
        <div>
            <Navigation account={account}
                contract_of_coin={contract_of_coin}
                provider={provider_of_coin}
                setaccount={setaccount}
                contract_of_nft={contract_of_nft}
                provider_of_nft={provider_of_nft}
                toggle={toggleofMakeitem}
                settoggle={settoggleofMakeitem}
                toggleBalanceOf = {toggleofBalanceOf}
                settoggleBalanceOf = {settoggleBalanceOf}
                setitem_user_count_amount={setitem_user_count_amount}
                setitem_user_count_image = {setitem_user_count_image}
                balance_={balance_}
            />
            <h2>Welcome to Market </h2>
            {items && (
                    <Section title={"Hero and weapon"} items_of_sold={items_of_sold} items={items} togglePop={togglePop} setitem_of_sold_id={setitem_of_sold_id} />
            )}
            {toggle &&
                (
                    <Product item_nft={item_from_nft} item={item} items_of_sold={items_of_sold} provider={provider} account={account} dappazon={contract_from_market} togglePop={togglePop} id_of_sold={items_of_sold_id} />
                )
            }
            {
                toggleofMakeitem && (
                    <Makeitem toggle={toggleofMakeitem}
                        settoggle={togglePopItem}
                        contract={contract_from_market}
                        provider={provider}
                    />
                )
            }
              {
        toggleofBalanceOf && (
          <BalanceOf 
          toggle={toggleofBalanceOf}
          settoggle={settoggleBalanceOf}
          items_user_count_amount = {items_user_count_amount}
          items_user_count_image = {items_user_count_image}
          />
        )
      }


        </div>
    );
}

export default Market;