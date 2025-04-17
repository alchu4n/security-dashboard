"use client"

import { useEffect, useRef } from "react"

export function ThreatMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = 300
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Draw world map (simplified)
    const drawMap = () => {
      ctx.fillStyle = "#f1f5f9"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw a simplified world map outline
      ctx.strokeStyle = "#cbd5e1"
      ctx.lineWidth = 1
      ctx.beginPath()

      // This is a very simplified world map outline
      // In a real application, you would use GeoJSON data
      const mapWidth = canvas.width * 0.8
      const mapHeight = canvas.height * 0.6
      const mapX = (canvas.width - mapWidth) / 2
      const mapY = (canvas.height - mapHeight) / 2

      // Draw continents (very simplified)
      // North America
      ctx.moveTo(mapX + mapWidth * 0.1, mapY + mapHeight * 0.2)
      ctx.lineTo(mapX + mapWidth * 0.3, mapY + mapHeight * 0.2)
      ctx.lineTo(mapX + mapWidth * 0.3, mapY + mapHeight * 0.5)
      ctx.lineTo(mapX + mapWidth * 0.1, mapY + mapHeight * 0.6)
      ctx.closePath()

      // South America
      ctx.moveTo(mapX + mapWidth * 0.25, mapY + mapHeight * 0.5)
      ctx.lineTo(mapX + mapWidth * 0.35, mapY + mapHeight * 0.5)
      ctx.lineTo(mapX + mapWidth * 0.3, mapY + mapHeight * 0.9)
      ctx.lineTo(mapX + mapWidth * 0.2, mapY + mapHeight * 0.9)
      ctx.closePath()

      // Europe
      ctx.moveTo(mapX + mapWidth * 0.4, mapY + mapHeight * 0.2)
      ctx.lineTo(mapX + mapWidth * 0.5, mapY + mapHeight * 0.2)
      ctx.lineTo(mapX + mapWidth * 0.55, mapY + mapHeight * 0.4)
      ctx.lineTo(mapX + mapWidth * 0.4, mapY + mapHeight * 0.4)
      ctx.closePath()

      // Africa
      ctx.moveTo(mapX + mapWidth * 0.45, mapY + mapHeight * 0.4)
      ctx.lineTo(mapX + mapWidth * 0.55, mapY + mapHeight * 0.4)
      ctx.lineTo(mapX + mapWidth * 0.55, mapY + mapHeight * 0.8)
      ctx.lineTo(mapX + mapWidth * 0.45, mapY + mapHeight * 0.8)
      ctx.closePath()

      // Asia
      ctx.moveTo(mapX + mapWidth * 0.55, mapY + mapHeight * 0.2)
      ctx.lineTo(mapX + mapWidth * 0.85, mapY + mapHeight * 0.2)
      ctx.lineTo(mapX + mapWidth * 0.85, mapY + mapHeight * 0.6)
      ctx.lineTo(mapX + mapWidth * 0.55, mapY + mapHeight * 0.6)
      ctx.closePath()

      // Australia
      ctx.moveTo(mapX + mapWidth * 0.75, mapY + mapHeight * 0.65)
      ctx.lineTo(mapX + mapWidth * 0.9, mapY + mapHeight * 0.65)
      ctx.lineTo(mapX + mapWidth * 0.9, mapY + mapHeight * 0.8)
      ctx.lineTo(mapX + mapWidth * 0.75, mapY + mapHeight * 0.8)
      ctx.closePath()

      ctx.stroke()
      ctx.fillStyle = "#e2e8f0"
      ctx.fill()
    }

    // Draw threat points
    const drawThreatPoints = () => {
      // Sample threat data (in a real app, this would come from an API)
      const threats = [
        { x: 0.2, y: 0.3, intensity: 0.8 }, // North America
        { x: 0.25, y: 0.7, intensity: 0.5 }, // South America
        { x: 0.45, y: 0.3, intensity: 0.9 }, // Europe
        { x: 0.5, y: 0.6, intensity: 0.7 }, // Africa
        { x: 0.7, y: 0.3, intensity: 1.0 }, // Asia
        { x: 0.8, y: 0.7, intensity: 0.4 }, // Australia
        { x: 0.65, y: 0.4, intensity: 0.8 }, // Middle East
        { x: 0.3, y: 0.4, intensity: 0.6 }, // Central America
      ]

      threats.forEach((threat) => {
        const x = threat.x * canvas.width
        const y = threat.y * canvas.height
        const radius = threat.intensity * 20

        // Draw glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, "rgba(239, 68, 68, 0.8)")
        gradient.addColorStop(0.5, "rgba(239, 68, 68, 0.4)")
        gradient.addColorStop(1, "rgba(239, 68, 68, 0)")

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw center point
        ctx.beginPath()
        ctx.fillStyle = "#ef4444"
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Animation
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawMap()
      drawThreatPoints()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative h-[300px] w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
