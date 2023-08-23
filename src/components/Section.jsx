import { ethers } from 'ethers'

// Components

const Section = ({ title,items_of_sold, items, togglePop,setitem_of_sold_id }) => {
    const settoggleandid = (id) => {
        togglePop(id)
        setitem_of_sold_id(id)
    }
    return (
        <div className='cards__section'>
            <h3 id={title}> {title}</h3>
            <hr/>
            <div className='cards'>
                {items.map((item,index) => (
                    <div className='card' key={index} onClick={() => settoggleandid(index)}>
                        <div className='card__image'>
                        {console.log(item.image)}
                            <img src={item.image} alt='Item' />
                        </div>
                        <div className='card__info'> 
                        HI anh em
                            {item.name}
                        </div>
                    </div>
                ))}
             



            </div>
        </div>
    );
}

export default Section;