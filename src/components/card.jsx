import React from 'react'

function card({ttl, txt}) {
  return (
    <div className='rounded-3xl border border-white/5 max-w-[280px] p-4 h-max bg-white/5 backdrop-blur-sm'>
        <h1 className='text-white font-light mb-3 uppercase'>{ttl}</h1>
        <p className='text-white/50 font-light text-sm tracking-wide leading-5'>{txt}</p>
    </div>
  )
}

export default card