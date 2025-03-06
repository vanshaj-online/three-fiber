import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three';
import { AxesHelper, TextureLoader } from 'three'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import Navbar from './components/navbar'
import Button from './components/button';
import { IoIosArrowRoundForward } from "react-icons/io";
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

  const allmesh = scene.children[0].children[0].children[0]

  allmesh.traverse(e => {
    console.log(e)
  })

  const { x, y, z, scale } = useControls('Position', {
    x: { value: 0, min: -20, max: 10, step: 0.1 },
    y: { value: -0.2, min: -20, max: 2, step: 0.1 },
    z: { value: 0.5, min: -10, max: 10, step: 1 },
    scale: { value: 0.15, min: -1, max: 10, step: 0.05 },
  })

  const { px, py, pz } = useControls('camera', {
    x: { value: 0, min: -10, max: 10, steps: 0.5 },
    y: { value: 0, min: -10, max: 10, steps: 0.5 },
    z: { value: 2, min: -10, max: 10, steps: 0.5 },
  })

  const { Rx, Ry, Rz } = useControls('Rotation', {
    Rx: { value: -0.5, min: -Math.PI, max: Math.PI, step: 0.1 },
    Ry: { value: 2.0, min: -10, max: 10, step: 0.1 },
    Rz: { value: -0.4, min: -10, max: 10, step: 0.1 },
  })



  return (

    <>

      <primitive object={scene} scale={scale} position={[x, y, z]}
        rotation={[null, -90 * (Math.PI / 180), null]}
      // rotation={[Rx, Ry, Rz]}
      />

    </>

  )
}

function CameraControl({ cameraref }) {



  const { x, y, z } = useControls("Camera Position", {
    x: { value: 0, min: -10, max: 10, step: 0.1 },
    y: { value: 0, min: -10, max: 10, step: 0.1 },
    z: { value: 1.7, min: -10, max: 10, step: 0.1 },
  });

  const { Rx, Ry, Rz } = useControls('camera Rotation', {
    Rx: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    Ry: { value: 0, min: -10, max: 10, step: 0.1 },
    Rz: { value: 0, min: -10, max: 10, step: 0.1 },
  })



  return (
    <>
      <PerspectiveCamera ref={cameraref} makeDefault position={[x, y, z]} rotation={[Rx, Ry, Rz]} />;
    </>
  )

}


function App() {
  const cameraRef = useRef(null);
  const modelRef = useRef(null);

  const [isAnimating, setisAnimating] = useState(false)

  const lenis = useLenis()

  const { Rx, Ry, Rz } = useControls('group rotation', {
    Rx: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    Ry: { value: 0, min: -10, max: 10, step: 0.1 },
    Rz: { value: 0, min: -10, max: 10, step: 0.1 },
  })

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

  function moveleft() {
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

  function moveright() {
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

  const wrapperRef = useRef(null)

  return (
    <ReactLenis root>

      <Navbar />

      <div className='h-screen w-full z-10 flex items-end'>

        <div className='space-y-5 pl-10 pb-10 z-10'>
          {
            arr.map((elem, i) => (

              <Card ttl={elem.ttl} txt={elem.txt} key={i} />

            ))

          }
        </div>

        <div className='absolute bottom-16 left-1/2 z-10 -translate-x-1/2 flex gap-10'>

          <button className='p-4 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer'
            onClick={moveleft}
            disabled={isAnimating}
          >

            <IoIosArrowRoundBack className={`${isAnimating ? 'text-white/20' : 'text-white/80'}`} size='2rem' />

          </button>

          <button className='p-4 rounded-full bg-white/5 backdrop-blur-sm cursor-pointer'
            onClick={moveright}
            disabled={isAnimating}
          >

            <IoIosArrowRoundForward className={`${isAnimating ? 'text-white/20' : 'text-white/80'}`} size='2rem' />

          </button>

        </div>

        <div className='absolute top-[45%] left-1/2 -translate-1/2 '>

          <p className='text-center uppercase text-white'>pushing the limits </p>

          <h1 className=' text-[#fff]/10 uppercase tracking-tight future text-center' >
            cyberx
          </h1>

        </div>

        <div className='fixed inset-0 h-screen w-full pointer-events-none'>

          <Canvas gl={{ antialias: true }}>

            {/* <OrbitControls enableZoom={false} /> */}

            <CameraControl cameraref={cameraRef} />

            <Environment
              files='/orange.hdr'
              environmentIntensity={1}
            />

            {/* <AxisHelper /> */}

            <Suspense fallback={<>Loading...</>}>

              <group ref={modelRef} rotation={[Rx,Ry,Rz]}>

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