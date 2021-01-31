import React, { useState, useEffect, useRef } from 'react'
import useMousePositon from '../hooks/useMousePosition'
import useMousePosition from '../hooks/useMousePosition'
const LikeButton: React.FC = () => {
    const [like, setLike] = useState(0)
    const [on, setOn] = useState(true)
    const likeRef = useRef(0)
    const didMountRef = useRef(false)
    const domRef = useRef<HTMLInputElement>(null)
    // const positions = useMousePositon()
    useEffect(() => {
        console.log('document title effect is runnning')
        document.title = `点击了 ${like} 次`
    }, [like, on])
    useEffect(() => {
        if (didMountRef.current) {
            console.log('this is updated')
        } else {
            didMountRef.current = true
        }
    })
    useEffect(() => {
        if (domRef && domRef.current) {
            domRef.current.focus()
        }
    })
    function handAlertClick() {
        setTimeout(() => {
            alert('you clicked on' + likeRef.current)
        }, 3000)
    }
    return (
        <>
            <input type='text' ref={domRef} />
            {/* <h2> X: {positions.x} ,Y:{positions.y} </h2> */}
            <button onClick={() => { setLike(like + 1); likeRef.current++ }}>
                {like + 1} 👍
             </button>
            <button onClick={handAlertClick}>
                Alert!
             </button>
            <button onClick={() => { setOn(!on) }}>
                {on ? 'ON' : 'OFF'} 👍
        </button>
        </>
    )
}
export default LikeButton