import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logo, heroImg,LOIKIO } from '../assets'
import styles from '../styles'
const PageHOC = (Component, title, description) => () => {
    const navigate = useNavigate();
    return (
        <div className={styles.hocContainer}>
            <div className={styles.hocContentBox}>
                <img src={LOIKIO} width="330" height = "199" alt="logo" className={styles.hocLogo} onClick={() => navigate('/')} />

                <div className={styles.hocBodyWrapper}>
                    <div className='flex flex-row w-full'>
                        <h1 className='flex font-rajdhani font-bold text-white sm:text-6xl text-4xl head-text'>{title}</h1>
                    </div>
                    <p className='font-rajdhani font-normal text-[24px] text-siteWhite head-text'> {description}</p>
                    <Component />
                </div>
                <p className={styles.footerText}> Our passion </p>
            </div>
            <div className='flex flex-1'>
                <img src={heroImg} alt='hero-img' className='w-full x1:h-full object-cover' />

            </div>
        </div>

    )
}

export default PageHOC