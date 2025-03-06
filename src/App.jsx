import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei'
import { TbView360Number } from "react-icons/tb";
import { AxesHelper } from 'three'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import Navbar from './components/navbar'
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import Card from './components/card';



function AxisHelper() {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(0, 0, 0)
    }
  }, [])

  return <primitive object={new AxesHelper(5)} ref={ref} />
}

function Scene() {

  const { scene } = useGLTF('/car2.glb')

  return (

    <>

      <primitive object={scene} scale={0.15} position={[0, 0, 2]}
        rotation={[null, -90 * (Math.PI / 180), null]}
      />

    </>

  )
}

function CameraControl({ cameraref }) {

  return (
    <>
      <PerspectiveCamera ref={cameraref} makeDefault position={[0, 0, 1.7]} rotation={[0, 0, 0]} />;
    </>
  )

}


function App() {
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const cardRef = useRef([])
  const btnRef = useRef([])
  const btn2 = useRef(null)
  const textref = useRef(null)

  const [isAnimating, setisAnimating] = useState(false)

  const [showBackbtn, setshowBackbtn] = useState(false)

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {

    setTimeout(() => setIsReady(true), 700);

  }, []);

  useEffect(() => {

    if (!modelRef.current || !textref.current) return

    const model = modelRef.current.children[0]

    const text = textref.current

    const handleMouseMove = (e) => {

      const xmove = (e.clientX / window.innerWidth) * 50

      const ymove = (e.clientY / window.innerHeight) * 50

      gsap.to(text, {
        x: -xmove,
        y: -ymove,
        duration: 0.6,
        ease: 'power4'
      })

    };

    window.addEventListener('mousemove', handleMouseMove)

    return () => {

      window.removeEventListener('mousemove', handleMouseMove)

    }

  }, [isReady])

  useLayoutEffect(() => {

    if (btn2.current) {
      gsap.set(btn2.current, { display: 'none', opacity: 0 })
    }


  }, [])



  const lenis = useLenis()

  const arr = [
    {
      ttl: 'Unstoppable Power',
      txt: 'With an armored exoskeleton and AI-driven aerodynamics, the Dark Sentinel dominates the streets. Built for speed, stealth, and precision.'
    },
    {
      ttl: 'The Future of Speed',
      txt: 'Futuristic design, turbo thrusters, and AI navigation make the Cyber Vortex a force to be reckoned with. race at full throttle—the future is in your hands.'
    },
  ]

  const btns = [
    {
      fnc: moveleft,
      icon: <IoIosArrowRoundBack className={`${isAnimating ? 'text-white/20' : 'text-white/80'}`} size='2rem' />
    },
    {
      fnc: moveright,
      icon: <IoIosArrowRoundForward className={`${isAnimating ? 'text-white/20' : 'text-white/80'}`} size='2rem' />
    },
    {
      fnc: move360,
      icon: <TbView360Number className={`${isAnimating ? 'text-white/20' : 'text-white/80'}`} size='2rem' />
    },
  ]

  function exit() {
    if (!btnRef.current || !cardRef.current || !modelRef.current) return
    const btnref = btnRef.current
    const cardref = cardRef.current
    const model = modelRef.current.children[0]

    const ctx = gsap.context(() => {

      const tl = gsap.timeline()

      tl.to(btn2.current, {
        opacity: 0,
        display: "none",
        duration: 0.1
      })

      btnref.forEach(e => {

        tl.to(e, {
          opacity: 1,
          display: 'block',
          duration: 0.2,
          delay: 0.1
        }, 0)

      })

      cardref.forEach(e => {

        tl.to(e, {
          opacity: 1,
          display: 'block',
          duration: 0.2,
          delay: 0.1,

        }, 0)

      })

      tl.to(model.scale, {
        x: 0.15,
        y: 0.15,
        z: 0.15,
      }, 0)

      tl.to(model.position, {
        x: -0.1, y: -0.2,
        duration: 1,
        ease: 'power4.out'
      }, 0);

      tl.to(cameraRef.current.position, {
        x: 0, y: 0, z: 1.7,
        duration: 1,
        ease: 'power4.out'
      }, 0);

      tl.to(cameraRef.current.rotation, {
        x: 0, y: 0, z: 0,
        duration: 1,
        ease: 'power4.out'
      }, 0);

    })

    setshowBackbtn(false)
    return () => ctx.revert()
  }

  function move360() {
    if (!btnRef.current || !cardRef.current || !modelRef.current) return
    const btnref = btnRef.current
    const cardref = cardRef.current
    const model = modelRef.current.children[0]

    const ctx = gsap.context(() => {

      const tl = gsap.timeline()

      btnref.forEach(e => {

        tl.to(e, {
          opacity: 0,
          duration: 0.2,
          display: 'none'
        }, 0)

      })

      cardref.forEach(e => {

        tl.to(e, {
          opacity: 0,
          duration: 0.2,
          display: 'none'
        }, 0)

      })

      tl.to(model.scale, {
        x: 0.2,
        y: 0.2,
        z: 0.2
      }, 0)

      tl.to(btn2.current, {
        opacity: 1,
        display: 'block'
      })

    })

    setshowBackbtn(true)

    return () => ctx.revert()
  }

  function moveleft() {
    if (!modelRef.current) {
      console.log('model not found')
      return
    }
    setisAnimating(true)

    gsap.to(modelRef.current.children[0].rotation, {
      y: `+=${-(Math.PI / 2)}`,
      duration: 1.5,
      ease: 'power4.out',
      onUpdate: () => {
        if (modelRef.current) {
          modelRef.current.lookAt(0, 0, 0);
        }
      },
      onComplete: () => {
        setisAnimating(false)
      }
    })
  }

  function moveright() {
    if (!modelRef.current) {
      console.log('model not found')
      return
    }
    setisAnimating(true)
    gsap.to(modelRef.current.children[0].rotation, {
      y: `+=${(Math.PI / 2)}`,
      duration: 1.5,
      ease: 'power4.out',
      onUpdate: () => {
        if (modelRef.current) {
          modelRef.current.lookAt(0, 0, 0);
        }
      },
      onComplete: () => {
        setisAnimating(false)
      }
    })
  }

  return (
    <ReactLenis root>

      <Navbar />

      <div className='h-screen w-full z-10 flex items-end'>

        <div className='space-y-5 pl-10 pb-10 z-10'>

          {
            arr.map((elem, i) => (

              <span key={i} className='block' ref={el => cardRef.current[i] = el}>
                <Card ttl={elem.ttl} txt={elem.txt} />
              </span>

            ))

          }

        </div>

        <div className='absolute bottom-16 left-1/2 z-10 -translate-x-1/2 flex gap-10'>

          {
            btns.map((btn, index) => (

              <button ref={el => btnRef.current[index] = el} key={index} className='p-4 rounded-full aspect-square h-auto w-auto bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors duration-300'
                onClick={btn.fnc}
                disabled={isAnimating}
              >

                {btn.icon}

              </button>

            ))
          }

          <button ref={btn2} className='p-1 px-5 rounded-full aspect-square h-auto w-auto bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors duration-300'
            onClick={exit}
          >

            <IoArrowBackCircleOutline className={`text-white/80`} size='1.7rem' />

          </button>

        </div>

        <div className='absolute top-[45%] left-1/2 -translate-1/2 '>

          <p className='text-center uppercase text-white'>pushing the limits</p>

          <h1 ref={textref} className=' text-[#fff]/10 uppercase tracking-tight future text-center' >
            cyberx
          </h1>

        </div>

        <div className='fixed inset-0 h-screen w-full pointer-events-none'>

          <Canvas gl={{ antialias: true }}>


            <CameraControl cameraref={cameraRef} />

            <Environment
              files='/orange.hdr'
              environmentIntensity={1}
            />

            <Suspense fallback={<>Loading...</>}>

              {showBackbtn && <OrbitControls enableZoom={false} />}

              <group ref={modelRef} >

                <Scene />

              </group>

            </Suspense>



          </Canvas>

        </div>

      </div>

    </ReactLenis >
  )
}


export default App