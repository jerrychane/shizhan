import { useState, useEffect } from 'react'

const useMousePositon = () => {
    const [positions, setPositions] = useState({ x: 0, y: 0 })
    useEffect(() => {
        console.log('add effect', positions.x)
        const updateMouse = (e: MouseEvent) => {
            setPositions({ x: e.clientX, y: e.clientY })
        }
        document.addEventListener('mousemove', updateMouse)
        return () => {
            console.log('move effect', positions.x)
            document.removeEventListener('mousemove', updateMouse)
        }
    }, [])
    return positions
}
export default useMousePositon