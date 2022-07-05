import React from 'react'

export default function Bar({ animationsDuration, progress }) {
    return (
        <div className='bg-indigo-600 h-1 w-full left-0 top-0 fixed z-[100]'
            style={{
                marginLeft: `${(-1 + progress) * 100}%`,
                transition: `margin-left ${animationsDuration}ms linear`
            }}></div>
    )
}
