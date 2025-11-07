import React from 'react';
import '../App.css'
import { motion } from 'motion/react';

const Card = ({name, url, index, func}) => {

    
    return (

            <motion.div layoutId={`card-${index}`} onClick={()=> func(index)} className="flex flex-col items-center  bg-white shadow-sm cursor-pointer hover:shadow-xl duration-150 hover:-translate-y-2 hover:-translate-x-2 transition-all rounded-md h-[280px]">
                    <div className='h-[75%]'>
                        <img  className='w-full h-full object-cover'
                        src={url}
                        alt={name} />
                    </div>
                <div className="card-body flex-1 justify-baseline">
                    <h2  className="card-title capitalize text-2xl text-black">{name}</h2>
                </div>
            </motion.div>
        
    );
};

export default Card;