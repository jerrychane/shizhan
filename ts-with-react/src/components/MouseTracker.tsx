import React, { useState, useEffect } from 'react'

const MouseTracker: React.FC = () => {
    const [postions, setPositions] = useState({ x: 0, y: 0 })
    useEffect(() => {
        console.log('add effect', postions.x)
        const updateMouse = (e: MouseEvent) => {
            console.log('inner')
            setPositions({ x: e.clientX, y: e.clientY })
        }
        document.addEventListener('click', updateMouse)
        return () => {
            console.log('move effect', postions.x)
            document.removeEventListener('click', updateMouse)
        }
    })
    console.log('before render', postions.x)
    return (
        <p>X: {postions.x} ,Y:{postions.y} </p>
    )
}

export default MouseTracker