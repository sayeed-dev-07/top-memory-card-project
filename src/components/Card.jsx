import React from 'react';
import '../App.css'

const Card = ({name, url, index, func}) => {
    return (
        
            <div onClick={()=> func(index)}  className="card hover:shadow-lg bg-white  shadow-sm hover:-translate-y-2 hover:-translate-x-2 transition-all duration-150 cursor-pointer">
                <figure>
                    <img
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