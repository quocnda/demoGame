import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { ethers } from 'ethers';
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {contract_address_Coin,contract_address_Market,contract_address_NFT,Contract_ABI_Market,Contract_ABI_NFT,Contract_Coin_ABI} from '../constant/constant'
const GlobalContext = createContext();
const socket = io("http://localhost:3000")
export const GlobalContextProvider = ({ children }) => {

  const [battleGround, setBattleGround] = useState('bg-astral');
    const [provider_of_coin,setprovider_of_coin] =useState(null)
    const [provider,setprovider] =useState(null)
    const [provider_of_nft,setprovider_of_nft] =useState(null)
    const [contract_of_coin,setcontract_of_coin] =useState(null)
    const [contract_of_nft,setcontract_of_nft] =useState(null)
    const [contract_from_market,setcontract_from_market] =useState(null)
    const [items,setitems] = useState(null)
    const [items_of_sold,setitem_of_sold] = useState(null)
    const [account,setaccount] = useState(null)
    const [balance_,setbalance_] = useState(0)
    const[sum_room1,setsum_room] = useState(null)
    const[items_user_count_amount,setitem_user_count_amount] = useState([])
    const[items_user_count_image,setitem_user_count_image] = useState([])
    const[items_user_details,setitem_user_details] = useState([])
    const LoadDataContract = async ()=> {
        const items_of_sold = []
         const items = []
       if(window.ethereum) {
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         await provider.send("eth_requestAccounts", []);
         const signer = provider.getSigner();
         const contract = new ethers.Contract(contract_address_Market,Contract_ABI_Market,signer)
         const provider_of_nft = new ethers.providers.JsonRpcProvider("https://public-en-baobab.klaytn.net")
         const contract_of_nft = new ethers.Contract(contract_address_NFT,Contract_ABI_NFT,provider_of_nft)
         const provider_of_coin = new ethers.providers.JsonRpcProvider("https://public-en-baobab.klaytn.net")
         const contract_of_coin = new ethers.Contract(contract_address_Coin,Contract_Coin_ABI,provider_of_coin)
         setprovider_of_coin(provider_of_coin)
         setprovider(provider)
         setprovider_of_nft(provider_of_nft)
        // for (let i = 0 ; i<10;i++) {
        //  const tmp = i+1
        //  const transaction = await contract.makeItem(tmp,20,20)
        //  await transaction.wait()
        //  console.log("transaction la ", transaction)
        // }
         console.log(contract)
         console.log(contract_of_nft)
         console.log(contract_of_coin)
         setcontract_of_coin(contract_of_coin)
         setcontract_from_market(contract)
         setcontract_of_nft(contract_of_nft)
         const amount_of_item = await contract.itemCount()
        const number_items = parseInt(amount_of_item._hex)
         console.log(number_items)
        for (let i=1; i<=number_items;i++) {
         const item = await contract.items(i)
         if(item.amount>0 ){
          items_of_sold.push(item)
          const itemID = item.itemId
          const item_ = await contract_of_nft.items(itemID.toString() - 1)
          items.push(item_)
          console.log("item thoa man la ",item.itemID)
        }
        }
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const account = ethers.utils.getAddress(accounts[0])
        const balance_ = await contract_of_coin.balanceOf(account)
        const balance_of_coi = parseInt(balance_._hex)
        setbalance_(balance_of_coi)
        setitems(items)
        setitem_of_sold(items_of_sold)

       const items_user_count_image  = []
      const items_user_count_amount = []
      const items_user_details = []
      for( let i =1;i<=10;i++) {
        const item = await contract_of_nft.balanceOf(account,i)
        const item_ = await contract_of_nft.items(i-1) 
        if(item > 0 ) {
          items_user_count_image.push(item_.image)
          items_user_details.push(item_)
          console.log("item from index.js",item_)
          items_user_count_amount.push(item.toString())
        }
      }
      setitem_user_count_amount(items_user_count_amount)
      setitem_user_count_image(items_user_count_image)
      setitem_user_details(items_user_details)
       }
       else {
         console.log("ch cai ")
       }
     } 
     function handleAccountsChanged(accounts) {
        if(accounts.length >0 && account != accounts[0])
        {
          setaccount(accounts[0])
    
        }
        else {
          setaccount(null)
        }
        
      }
    const updateCurrentAccount = async() => {
        if(window.ethereum) {
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            const account = ethers.utils.getAddress(accounts[0])
            setaccount(account)
            console.log("contract of coin ",contract_of_coin)
          
            }
            else {
                aler()
            }
    }
    const aler = () => {
        alert("Please install metamask")
    }
    const LoadRoom = () => {
        
        console.log("da vao day tu join battle")
        socket.emit("joinbattle")
        socket.on("sum_room" , (map) => {
            const new_map = new Map(map)
            setsum_room(new_map)
        })
       
    }
    
     useEffect(() => {
        updateCurrentAccount();
        LoadDataContract();
        LoadRoom();
        if (window.ethereum) {
          window.ethereum.on('accountsChanged', handleAccountsChanged);
        }
        return() => {
          if (window.ethereum) {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          }
        }
      }, [])
      useEffect(() => {
        const isBattleground = localStorage.getItem('battleground');
    
        if (isBattleground) {
          setBattleGround(isBattleground);
        } else {
          localStorage.setItem('battleground', battleGround);
        }
      }, []);
    return (
        <GlobalContext.Provider value={{
           provider_of_coin,account,contract_of_coin,provider,setaccount,contract_of_nft,provider_of_nft,items_of_sold,items,contract_from_market,balance_,socket,sum_room1,battleGround,
          items_user_count_amount,items_user_count_image,items_user_details
        }}>
            {children}           
        </GlobalContext.Provider>
    )
}
export const useGlobalContext = () => useContext(GlobalContext)