import React from 'react'
import { GoArrowRight } from "react-icons/go";

function Button({ children, className }) {


    return (
        <button className={`bg-white/5 font-extralight text-white border-white/20 border rounded-full uppercase text-xs tracking-wider flex items-center ${className} justify-center gap-2 group backdrop-blur-sm p-1 w-max h-max text-nowrap cursor-pointer z-10 `}>

            <span className='pl-3 pr-2'>

                {children}

            </span>

            <span className='rounded-full p-1.5 bg-white group-hover:bg-black transition-all group-hover:-rotate-45 duration-300'>

                <GoArrowRight className='text-black group-hover:text-white transition-colors duration-300' size='1.1rem' />

            </span>

        </button>
    )
}

export default Button