import { useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'

const cardModel = '/AS.glb'

const LERP_SPEED = 0.06
const MAX_YAW = 0.35
const MAX_PITCH = 0.22

function AceCard({ mouseRef }) {
  const { scene } = useGLTF(cardModel)

  const groupRef = useRef()

  const currentRot = useRef({
    x: 0,
    y: 0,
  })

  const targetRot = useRef({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh || obj.isSkinnedMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
        obj.frustumCulled = false

        const mats = Array.isArray(obj.material)
          ? obj.material
          : [obj.material]

        mats.forEach((m) => {
          if (!m) return

          if (
            m.isMeshStandardMaterial ||
            m.isMeshPhysicalMaterial
          ) {
            m.roughness = 0.45
            m.metalness = 0.15

            // subtle green cyber glow
            m.emissive = new THREE.Color('#0bff6d')
            m.emissiveIntensity = 0.08
          }

          m.needsUpdate = true
        })
      }
    })

    // Rotate so front of card faces camera
    scene.rotation.set(Math.PI / 2, -Math.PI / 2, 0)

    // Scale card nicely
    scene.scale.setScalar(3.2)

    // Raise slightly
    scene.position.set(0, 0.2, 0)

  }, [scene])

  useFrame((state) => {
    if (!groupRef.current) return

    targetRot.current.y =
      mouseRef.current.x * MAX_YAW

    targetRot.current.x =
      -mouseRef.current.y * MAX_PITCH

    currentRot.current.x +=
      (targetRot.current.x - currentRot.current.x) *
      LERP_SPEED

    currentRot.current.y +=
      (targetRot.current.y - currentRot.current.y) *
      LERP_SPEED

    groupRef.current.rotation.x = currentRot.current.x
    groupRef.current.rotation.y = currentRot.current.y

    // subtle idle movement
    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 1.2) * 0.08
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.15}
      floatIntensity={0.2}
    >
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Float>
  )
}

function CameraRig() {
  const { camera } = useThree()

  useEffect(() => {
    camera.fov = 90
    camera.near = 0.1
    camera.far = 100
    camera.position.set(0, 0, 7)

    camera.lookAt(0, 0, 0)

    camera.updateProjectionMatrix()
  }, [camera])

  return null
}

function Lights() {
  return (
    <>
      {/* base ambience */}
      <ambientLight intensity={1.8} color="#0aff7b" />

      {/* main spotlight */}
      <spotLight
        position={[0, 3, 6]}
        intensity={80}
        angle={0.4}
        penumbra={1}
        color="#00ff88"
      />

      {/* front fill */}
      <pointLight
        position={[0, 0, 5]}
        intensity={25}
        color="#55ffbb"
      />

      {/* left rim */}
      <pointLight
        position={[-4, 1, 1]}
        intensity={18}
        color="#00ff66"
      />

      {/* right rim */}
      <pointLight
        position={[4, 1, 1]}
        intensity={18}
        color="#00ff66"
      />

      {/* bottom glow */}
      <pointLight
        position={[0, -3, 2]}
        intensity={22}
        color="#007733"
      />
    </>
  )
}

export default function DesktopBackground() {
  const mouseRef = useRef({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x =
        (e.clientX / window.innerWidth) * 2 - 1

      mouseRef.current.y =
        (e.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('mousemove', onMove)

    return () =>
      window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at center, #06130b 0%, #020503 60%, #000000 100%)',
      }}
    >
      {/* glowing background orb */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(0,255,120,0.18) 0%, transparent 70%)',
        }}
      />

      {/* scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          opacity: 0.12,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            'radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.8,
        }}
        camera={{ position: [0, 0, 7] }}
      >
        <fog attach="fog" args={['#020503', 8, 18]} />

        <CameraRig />

        <Lights />

        <Suspense fallback={null}>
          <AceCard mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}