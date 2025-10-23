import React from 'react';
import '../App.css'

const Card = ({name, url, index, func}) => {

    
    return (
        
            <div onClick={()=> func(index)}  className="card bg-white shadow-sm cursor-pointer duration-150 hover:-translate-y-2 hover:-translate-x-2 transition-all ">
                <figure className='h-[80%] '>
                    <img className='w-full'
                        src={url}
                        alt={name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title capitalize text-2xl text-black">{name}</h2>
                </div>
            </div>
        
    );
};

export default Card;