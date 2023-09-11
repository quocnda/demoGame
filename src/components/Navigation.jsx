import { ethers } from 'ethers';
// import Web3 from "web3"
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useGlobalContext } from '../context';
import { Contract_Coin_ABI,contract_address_Coin } from '../constant/constant';
import styles from '../styles';
const Navigation = ({ account,contract_of_coin,provider_of_coin,setaccount,contract_of_nft,provider_of_nft,toggle,settoggle,toggleBalanceOf,settoggleBalanceOf,setitem_user_count_amount,setitem_user_count_image }) => {
    const {balance_ } = useGlobalContext()
    console.log("balance_",balance_)
    const [number,setnumber] = useState(0)
    const [number_of_balance,setnumber_of_balance] = useState(balance_)
    const connectHandle = async () => {
        if(window.ethereum) {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const account = ethers.utils.getAddress(accounts[0])
       
        setaccount(account)
        }
        else {
            aler()
        }
    }
    const aler = () => {
        alert("Please install metamask")
    }
    const handleOnchange = async(e) => {
        
        setnumber(e.target.value)
        console.log("number la ",number)
    } 
    const handleOfDeposit = async() => {
        console.log(number)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contract_address_Coin,Contract_Coin_ABI,signer)
        await contract.deposit({value: ethers.utils.parseUnits(number,"ether")})
    }
    const changeBlance = async() => {
        const balance_ = await contract_of_coin.balanceOf(account)
        console.log(account)
        const balance_of_coi = parseInt(balance_._hex)
        setnumber_of_balance(balance_of_coi)
    }
    const HandleBUtttonMakeItem = async() => {
        toggle ? settoggle(false) : settoggle(true)
    }
    const HandleButtonBalanceOf = () => {
        toggleBalanceOf ? settoggleBalanceOf(false) : settoggleBalanceOf(true)
        HanldeMyBalance()
    }
    const HanldeMyBalance = async() => {
        const items_user_count_image = []
        const items_user_count_amount = []
        for(let i = 1;i<=10;i++) {
            const item = await contract_of_nft.balanceOf(account,i)
            const item_ = await contract_of_nft.items(i-1)
            if(item>0) {

               items_user_count_image.push(item_.image)
                items_user_count_amount.push(item.toString())
            } 
        }
        setitem_user_count_amount(items_user_count_amount)
        setitem_user_count_image(items_user_count_image)
    }
    useEffect(() => {
        changeBlance();
    },[])
    useEffect(() => {
       changeBlance();
       HanldeMyBalance();  
       console.log("fa vao day man")
    },[account])
    return (
        <nav>
            <div className='nav__displayHead'>
                    <div id='nav__brand'><h1>Game Character Market</h1></div>
                    {console.log("number balance ",number_of_balance)}
                    <div id='nav__coins'><a href='#Clothing and Jewelry'> {number_of_balance} Coins </a></div>
            </div>
            <div className='nav__displaySecond'>
                <div className='nav__search'><input type='text' placeholder='Search'/></div>  
                <div className='nav__connect'>   
                    {
                        account ? (
                        <button type='button' className='nav__connectbtn'>
                            {account.slice(0,6)+ '...' + account.slice(38,42)}
                        </button>
                        ) : (
                            <button type='button' className='nav__connectbtn' onClick={connectHandle}>
                                Connect
                            </button>
                        )
                    }
                    <input type='number' className={styles.input} id='nav__valueChange' value={number} onChange={handleOnchange}/> 
                    <button type='button' className='nav__deposit' onClick={handleOfDeposit}>
                        Deposit
                    </button>
                </div>
            </div>
            <div className='nav__links'>
            
                <button id='nav__makeItem' type='button' onClick={HandleBUtttonMakeItem}>
                    Make Item
                </button>
                <button id='nav__balanceOfItems' onClick={HandleButtonBalanceOf}><a>Balance Of</a></button> 

            </div>
        </nav>
    );

}

export default Navigation;