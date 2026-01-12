import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, forwardRef, useImperativeHandle } from 'react'

const Stairs = forwardRef(({ children }, ref) => {
  const stairParentRef = useRef(null)
  const tlRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })

    tl.set(stairParentRef.current, {
      display: 'block',
      pointerEvents: 'auto'
    })

    tl.from('.stair', {
      height: 0,
      duration: 0.4,
      ease: 'power4.out',
      stagger: {
        amount: 0.25,
        from: 'end'
      }
    })

    tl.to('.stair', {
      y: '100%',
      duration: 0.5,
      ease: 'power4.inOut',
      stagger: {
        amount: 0.3,
        from: 'start'
      }
    })

    tl.set(stairParentRef.current, {
      display: 'none',
      pointerEvents: 'none'
    })

    tl.set('.stair', { y: '0%' })

    tlRef.current = tl
  })

  // IMPERATIVE HANDLE - ONLY WAY TO CONTROL ANIMATION
  useImperativeHandle(ref, () => ({
    play: () => {
      tlRef.current?.restart()
    }
  }))

  return (
    <>
      <div
        ref={stairParentRef}
        className="fixed inset-0 z-50 pointer-events-none hidden"
      >
        <div className="flex h-full w-full">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="stair h-full w-1/5 bg-neutral-800" />
          ))}
        </div>
      </div>

      {children}
    </>
  )
})

Stairs.displayName = 'Stairs'
export default Stairs
