import React from 'react'
import { useNProgress } from '@tanem/react-nprogress'
import Container from './Container'
import Bar from './Bar'

export default function Progress({ isAnimating }) {
    const { animationDuration, isFinished, progress } = useNProgress({ isAnimating })
    return (
        <Container animationDuration={animationDuration} isFinished={isFinished}>
            <Bar animationDuration={animationDuration} isFinished={isFinished} />
        </Container>
    )
}
