"use client"

import { useEffect, useRef } from "react"

export function ComplianceScoreByStandard() {
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
      { label: "ISO 27001", value: 92, color: "#3b82f6" },
      { label: "PCI DSS", value: 85, color: "#10b981" },
      { label: "GDPR", value: 78, color: "#f59e0b" },
      { label: "HIPAA", value: 88, color: "#8b5cf6" },
      { label: "内部策略", value: 95, color: "#ef4444" },
    ]

    // Draw horizontal bar chart
    const drawHorizontalBarChart = () => {
      const padding = { top: 30, right: 20, bottom: 20, left: 100 }
      const chartWidth = canvas.width - padding.left - padding.right
      const chartHeight = canvas.height - padding.top - padding.bottom

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Calculate bar height and spacing
      const barCount = data.length
      const barHeight = Math.min(30, (chartHeight / barCount) * 0.7)
      const barSpacing = (chartHeight - barHeight * barCount) / (barCount + 1)

      // Draw title
      ctx.fillStyle = "#334155"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "top"
      ctx.fillText("合规标准评分", padding.left, 10)

      // Draw bars
      data.forEach((item, index) => {
        const barWidth = (item.value / 100) * chartWidth
        const y = padding.top + barSpacing * (index + 1) + barHeight * index

        // Create gradient for bar
        const gradient = ctx.createLinearGradient(padding.left, 0, padding.left + chartWidth, 0)
        gradient.addColorStop(0, item.color)
        gradient.addColorStop(1, `${item.color}80`)

        // Draw bar
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.roundRect(padding.left, y, barWidth, barHeight, [0, 4, 4, 0])
        ctx.fill()

        // Draw label
        ctx.fillStyle = "#334155"
        ctx.font = "13px sans-serif"
        ctx.textAlign = "right"
        ctx.textBaseline = "middle"
        ctx.fillText(item.label, padding.left - 10, y + barHeight / 2)

        // Draw value
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "right"
        ctx.textBaseline = "middle"
        ctx.fillText(`${item.value}%`, padding.left + barWidth - 10, y + barHeight / 2)
      })

      // Draw grid lines
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 1

      // Vertical grid lines
      for (let i = 0; i <= 5; i++) {
        const x = padding.left + (chartWidth / 5) * i
        ctx.beginPath()
        ctx.moveTo(x, padding.top)
        ctx.lineTo(x, padding.top + chartHeight)
        ctx.stroke()

        // Draw grid line label
        const value = i * 20
        ctx.fillStyle = "#64748b"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.fillText(`${value}%`, x, padding.top + chartHeight + 5)
      }
    }

    drawHorizontalBarChart()
    window.addEventListener("resize", drawHorizontalBarChart)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", drawHorizontalBarChart)
    }
  }, [])

  return (
    <div className="relative h-[300px] w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
