import React from 'react'
import logo from '/logo.svg'
import { BiMenu } from 'react-icons/bi';

function navbar() {
    return (
        <div className='flex w-full px-10 py-5 justify-between absolute inset-0'>

            <span className='h-max w-max'>
                {/* <img src={logo} alt="" className='h-4' /> */}
                <h1 className='uppercase text-white/70 tracking-wider font-["Game_of_Squids"]'>cyberx</h1>
            </span>

            <div className='flex gap-8'>

                <BiMenu color='white' size='1.5rem'/>

            </div>

        </div>
    )
}

export default navbar