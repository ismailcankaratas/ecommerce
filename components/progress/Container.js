import React from 'react'

export default function Container({ animationDuration, children, isFinished }) {
    return (
        <div className='pointer-event-none'
            style={{
                opacity: isFinished ? 0 : 1,
                transition: `opacity ${animationDuration}ms linear`
            }}>
            {children}
        </div>
    )
}
