import React, { useState, useEffect } from 'react'
import useMousePositon from '../hooks/useMousePosition'
import useMousePosition from '../hooks/useMousePosition'
const LikeButton: React.FC = () => {
    const [like, setLike] = useState(0)
    const [on, setOn] = useState(true)
    const positions = useMousePositon()
    useEffect(() => {
        console.log('document title effect is runnning')
        document.title = `点击了 ${like} 次`
    }, [like, on])
    return (
        <>
            <h2> X: {positions.x} ,Y:{positions.y} </h2>
            <button onClick={() => { setLike(like + 1) }}>
                {like + 1} 👍
        </button>
            <button onClick={() => { setOn(!on) }}>
                {on ? 'ON' : 'OFF'} 👍
        </button>
        </>
    )
}
export default LikeButton