"use client"

import { useEffect, useRef } from "react"

export function SecurityEventsDistribution() {
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

    // Sample data for the chart
    const data = [
      { label: "入侵检测", value: 32, color: "#ef4444" },
      { label: "恶意软件", value: 24, color: "#f59e0b" },
      { label: "DDoS攻击", value: 18, color: "#3b82f6" },
      { label: "异常访问", value: 12, color: "#8b5cf6" },
      { label: "配置变更", value: 8, color: "#10b981" },
      { label: "其他", value: 6, color: "#6b7280" },
    ]

    // Draw pie chart
    const drawPieChart = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) - 60

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Calculate total value
      const total = data.reduce((sum, item) => sum + item.value, 0)

      // Draw pie slices
      let startAngle = -Math.PI / 2
      data.forEach((item) => {
        const sliceAngle = (2 * Math.PI * item.value) / total

        // Draw slice
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
        ctx.closePath()
        ctx.fillStyle = item.color
        ctx.fill()

        // Draw slice border
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
        ctx.closePath()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()

        // Calculate label position
        const labelAngle = startAngle + sliceAngle / 2
        const labelRadius = radius * 0.7
        const labelX = centerX + labelRadius * Math.cos(labelAngle)
        const labelY = centerY + labelRadius * Math.sin(labelAngle)

        // Draw percentage label
        const percentage = Math.round((item.value / total) * 100)
        if (percentage > 5) {
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 14px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(`${percentage}%`, labelX, labelY)
        }

        startAngle += sliceAngle
      })

      // Draw legend
      const legendX = 20
      let legendY = canvas.height - data.length * 25 - 10
      const legendSize = 15
      const legendSpacing = 25

      data.forEach((item) => {
        // Draw legend color box
        ctx.fillStyle = item.color
        ctx.fillRect(legendX, legendY, legendSize, legendSize)

        // Draw legend text
        ctx.fillStyle = "#334155"
        ctx.font = "14px sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(`${item.label} (${item.value}%)`, legendX + legendSize + 10, legendY + legendSize / 2)

        legendY += legendSpacing
      })
    }

    drawPieChart()
    window.addEventListener("resize", drawPieChart)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", drawPieChart)
    }
  }, [])

  return (
    <div className="relative h-[300px] w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
