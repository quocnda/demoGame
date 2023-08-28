import React, { useEffect, useState } from 'react';
import { PageHOC } from '../components';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import styles from '../styles';

const Menu = () => {
    const { account ,socket } = useGlobalContext();
    const [name,setname] = useState("Quoc")
    const navigate = useNavigate();
    const handleOnclickMarket = () => {
        navigate('/market')
    }
    const handleOnClickCreateBattle = () => {
        navigate('/create-battle')
    }
    const handleOnClickJoinBattle = () => {
        navigate('/join-battle')
    }
    useEffect(() => {
        console.log("da vao set socket")
        socket.on("set_name_is_ok",(data) => {
            console.log("data",data)
            setname(data)
        })
    },[socket])
    return (
        <div>
            <label htmlFor='name' className={styles.label}>Your Name: </label>
            {name}
            <br/>
            <label htmlFor="name" className={styles.label}>Your account: </label>
            {account}
            <br />
            <button
                type="button"
                className={`${styles.btn} mt-6`}
                onClick={handleOnclickMarket}
            >
                Market
            </button>
            <> </>
            <button
                type="button"
                className={`${styles.btn} mt-6`}
                onClick={handleOnClickCreateBattle}
            >
                Create Battle
            </button>
            <div>

            </div>
            <button
                type="button"
                className={`${styles.btn} mt-6`}
                onClick={handleOnClickJoinBattle}
            >
                Join Battle
            </button>
        </div>

    )

};

export default PageHOC(
    Menu,

)