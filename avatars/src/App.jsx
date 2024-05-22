import './App.css'
import { useEffect, useRef } from 'react'
import useAvatar from './hooks/useAvatar'

function App() {
  const canvasRef = useRef(null)
  const { generate } = useAvatar({ canvasRef })

  useEffect(() => {
    generate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1 className="text-xxl font-bold pb-8">Avatars</h1>
      <canvas ref={canvasRef} width="254" height="286" className='border-2 border-black' />
    </>
  )
}

export default App

// grid centre = 8.25rem = 132px
// hex height = 1.5rem = 24px
// hex side length = 0.866rem = 13.856px ~ 14px
// hex half-side length = 0.433rem = 6.928px ~ 7px