'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Core() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15
      ref.current.rotation.x += delta * 0.05
    }
  })
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <Icosahedron ref={ref} args={[1.35, 4]}>
        <MeshDistortMaterial
          color="#3b6fff"
          emissive="#1b3aa0"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.85}
          distort={0.35}
          speed={1.6}
        />
      </Icosahedron>
      <Icosahedron args={[1.7, 1]}>
        <meshBasicMaterial color="#5b8cff" wireframe transparent opacity={0.18} />
      </Icosahedron>
    </Float>
  )
}

function OrbitNodes() {
  const group = useRef<THREE.Group>(null)
  const nodes = useMemo(() => {
    return Array.from({ length: 14 }).map(() => {
      const r = 2.4 + Math.random() * 1.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      return {
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.6,
          r * Math.sin(phi) * Math.sin(theta),
        ),
        scale: 0.04 + Math.random() * 0.05,
      }
    })
  }, [])
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08
  })
  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos} scale={n.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#54e6c5' : '#7aa2ff'}
            emissive={i % 3 === 0 ? '#1ba98a' : '#2c4fd0'}
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}
    </group>
  )
}

function ParticleField() {
  const positions = useMemo(() => {
    const arr = new Float32Array(500 * 3)
    for (let i = 0; i < 500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return arr
  }, [])
  const ref = useRef<THREE.Points>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02
  })
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#6f8bd6" size={0.035} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={2.2} color="#9bb6ff" />
      <pointLight position={[-4, -2, 2]} intensity={3} color="#3dd7c0" />
      <Core />
      <OrbitNodes />
      <ParticleField />
    </Canvas>
  )
}
