import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, forwardRef, useImperativeHandle, useState } from 'react'
import { setTransitioning } from '../stores/transitionStore'
import Noise from './ui/Noise'

const Stairs = forwardRef(({ children }, ref) => {
  const stairParentRef = useRef(null)
  const tlRef = useRef(null)
  const [noiseReadyCount, setNoiseReadyCount] = useState(0)
  const numStairs = 5
  const allNoiseReady = noiseReadyCount === numStairs

  useGSAP(() => {
    if (!allNoiseReady) return // Wait for all noise canvases to be ready

    const tl = gsap.timeline({ paused: true })

    // 🔒 HARD RESET (prevents first-frame bleed)
    gsap.set(stairParentRef.current, {
      autoAlpha: 0,
      pointerEvents: 'none'
    })

    gsap.set(stairParentRef.current.querySelectorAll('.stair'), { height: 0, y: '0%' })

    tl.set(stairParentRef.current, {
      autoAlpha: 1,
      pointerEvents: 'auto'
    })

    tl.to(stairParentRef.current.querySelectorAll('.stair'), {
      height: '100%',
      duration: 0.45,
      ease: 'power4.out',
      stagger: { amount: 0.25, from: 'end' }
    })

    tl.to(stairParentRef.current.querySelectorAll('.stair'), {
      y: '100%',
      duration: 0.5,
      ease: 'power4.inOut',
      stagger: { amount: 0.3, from: 'start' }
    })

    tl.set(stairParentRef.current, {
      autoAlpha: 0,
      pointerEvents: 'none'
    })

    // 🔁 FULL RESET FOR NEXT PLAY
    tl.set(stairParentRef.current.querySelectorAll('.stair'), { height: 0, y: '0%' })

    tlRef.current = tl
  }, [allNoiseReady])

  // IMPERATIVE HANDLE - ONLY WAY TO CONTROL ANIMATION
  useImperativeHandle(ref, () => ({
    play: () => {
      setTransitioning(true)

      tlRef.current?.restart()

      tlRef.current?.eventCallback('onComplete', () => {
        setTransitioning(false)
      })
    }
  }))

  return (
    <>
      <div
        ref={stairParentRef}
        className="fixed inset-0 z-50 pointer-events-none"
      >
        <div className="relative flex h-full w-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="stair relative h-full w-1/5 bg-neutral-800 overflow-hidden">
              <Noise
                patternAlpha={15}
                patternRefreshInterval={2}
                onReady={() => setNoiseReadyCount(prev => prev + 1)}
              />
            </div>
          ))}
        </div>
      </div>

      {children}
    </>
  )
})

Stairs.displayName = 'Stairs'
export default Stairs
