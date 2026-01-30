"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    baseOpacity: number
    twinkleSpeed: number
    twinkleOffset: number
    isPink: boolean
}

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationId: number
        let particles: Particle[] = []
        let time = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const createParticles = () => {
            particles = []
            const count = Math.floor((canvas.width * canvas.height) / 4000)
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.15,
                    vy: (Math.random() - 0.5) * 0.15,
                    size: Math.random() * 1.5 + 0.5,
                    baseOpacity: Math.random() * 0.5 + 0.5,
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                    twinkleOffset: Math.random() * Math.PI * 2,
                    isPink: Math.random() > 0.6,
                })
            }
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            time += 1

            particles.forEach((p) => {
                p.x += p.vx
                p.y += p.vy

                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0

                const twinkle = Math.sin(time * p.twinkleSpeed + p.twinkleOffset)
                const currentOpacity = p.baseOpacity * (0.5 + twinkle * 0.5)

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)

                if (p.isPink) {
                    ctx.fillStyle = `rgba(217, 2, 125, ${currentOpacity})`
                } else {
                    ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.8})`
                }
                ctx.fill()
            })

            animationId = requestAnimationFrame(draw)
        }

        resize()
        createParticles()
        draw()

        const handleResize = () => {
            resize()
            createParticles()
        }

        window.addEventListener("resize", handleResize)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener("resize", handleResize)
        }
    }, [isMounted])

    if (!isMounted) {
        return null
    }

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    )
}
