import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, forwardRef, useImperativeHandle } from 'react'

const Stairs = forwardRef((props, ref) => {

  const stairParentRef = useRef(null)
  const pageRef = useRef(null)

  useImperativeHandle(ref, () => ({
    play,
  }))

  const play = () => {
    const tl = gsap.timeline()

    tl.to(stairParentRef.current, {
      display: 'block',
      pointerEvents: 'auto'
    })

    tl.from('.stair', {
      height: 0,
      stagger: {
        amount: -0.2,
      },
    })

    tl.to('.stair', {
      y: '100%',
      stagger: {
        amount: -0.25,
      },
    })

    tl.to(stairParentRef.current, {
      display: 'none',
      pointerEvents: 'none'
    })

    tl.to('.stair', {
      y: '0%',
    })

    gsap.from(pageRef.current, {
      opacity: 0,
      delay: 1.3,
      scale: 1.2,
    })
  }

  return (
    <div>
      {/* STAIRS OVERLAY */}
      <div
        ref={stairParentRef}
        className="h-screen w-full fixed z-20 top-0 hidden pointer-events-none"
      >
        <div className="h-full w-full flex">
          <div className="stair h-full w-1/5 bg-gray-600"></div>
          <div className="stair h-full w-1/5 bg-gray-600"></div>
          <div className="stair h-full w-1/5 bg-gray-600"></div>
          <div className="stair h-full w-1/5 bg-gray-600"></div>
          <div className="stair h-full w-1/5 bg-gray-600"></div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div ref={pageRef}>
        {props.children}
      </div>
    </div>
  )
})

export default Stairs
