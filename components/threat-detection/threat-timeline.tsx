"use client"

import { useEffect, useRef } from "react"

export function ThreatTimeline() {
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

    // Sample data for the chart - 24 hours
    const data = [
      { hour: "00:00", count: 3, severity: "medium" },
      { hour: "01:00", count: 2, severity: "low" },
      { hour: "02:00", count: 1, severity: "low" },
      { hour: "03:00", count: 2, severity: "medium" },
      { hour: "04:00", count: 1, severity: "low" },
      { hour: "05:00", count: 0, severity: "none" },
      { hour: "06:00", count: 1, severity: "low" },
      { hour: "07:00", count: 2, severity: "medium" },
      { hour: "08:00", count: 4, severity: "medium" },
      { hour: "09:00", count: 7, severity: "high" },
      { hour: "10:00", count: 9, severity: "high" },
      { hour: "11:00", count: 8, severity: "high" },
      { hour: "12:00", count: 6, severity: "medium" },
      { hour: "13:00", count: 5, severity: "medium" },
      { hour: "14:00", count: 7, severity: "high" },
      { hour: "15:00", count: 8, severity: "high" },
      { hour: "16:00", count: 6, severity: "medium" },
      { hour: "17:00", count: 5, severity: "medium" },
      { hour: "18:00", count: 4, severity: "medium" },
      { hour: "19:00", count: 3, severity: "medium" },
      { hour: "20:00", count: 2, severity: "low" },
      { hour: "21:00", count: 3, severity: "medium" },
      { hour: "22:00", count: 2, severity: "low" },
      { hour: "23:00", count: 1, severity: "low" },
    ]

    // Draw timeline chart
    const drawTimelineChart = () => {
      const padding = { top: 30, right: 20, bottom: 50, left: 40 }
      const chartWidth = canvas.width - padding.left - padding.right
      const chartHeight = canvas.height - padding.top - padding.bottom

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Find maximum value for scaling
      const maxValue = Math.max(...data.map((item) => item.count))

      // Draw grid lines
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 1

      // Horizontal grid lines
      const numHorizontalLines = 5
      for (let i = 0; i <= numHorizontalLines; i++) {
        const y = padding.top + (chartHeight / numHorizontalLines) * i
        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(padding.left + chartWidth, y)
        ctx.stroke()

        // Draw y-axis labels
        const value = Math.round(maxValue - (i / numHorizontalLines) * maxValue)
        ctx.fillStyle = "#64748b"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "right"
        ctx.textBaseline = "middle"
        ctx.fillText(value.toString(), padding.left - 10, y)
      }

      // Calculate bar width and spacing
      const barWidth = (chartWidth / data.length) * 0.7
      const barSpacing = (chartWidth / data.length) * 0.3

      // Draw bars
      data.forEach((item, index) => {
        const x = padding.left + (chartWidth / data.length) * index + barSpacing / 2
        const barHeight = (item.count / maxValue) * chartHeight
        const y = padding.top + chartHeight - barHeight

        // Set color based on severity
        let color
        switch (item.severity) {
          case "high":
            color = "#ef4444"
            break
          case "medium":
            color = "#f59e0b"
            break
          case "low":
            color = "#3b82f6"
            break
          default:
            color = "#d1d5db"
        }

        // Draw bar
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0])
        ctx.fill()

        // Draw x-axis labels (only show every 3 hours to avoid crowding)
        if (index % 3 === 0) {
          ctx.fillStyle = "#64748b"
          ctx.font = "12px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "top"
          ctx.fillText(item.hour, x + barWidth / 2, padding.top + chartHeight + 10)
        }
      })

      // Draw title
      ctx.fillStyle = "#334155"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "top"
      ctx.fillText("24小时威胁检测分布", padding.left, 10)

      // Draw legend
      const legendX = padding.left
      const legendY = padding.top + chartHeight + 30
      const legendSpacing = 80

      // High severity
      ctx.fillStyle = "#ef4444"
      ctx.fillRect(legendX, legendY, 12, 12)
      ctx.fillStyle = "#334155"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText("高危", legendX + 16, legendY + 6)

      // Medium severity
      ctx.fillStyle = "#f59e0b"
      ctx.fillRect(legendX + legendSpacing, legendY, 12, 12)
      ctx.fillStyle = "#334155"
      ctx.fillText("中危", legendX + legendSpacing + 16, legendY + 6)

      // Low severity
      ctx.fillStyle = "#3b82f6"
      ctx.fillRect(legendX + legendSpacing * 2, legendY, 12, 12)
      ctx.fillStyle = "#334155"
      ctx.fillText("低危", legendX + legendSpacing * 2 + 16, legendY + 6)
    }

    drawTimelineChart()
    window.addEventListener("resize", drawTimelineChart)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", drawTimelineChart)
    }
  }, [])

  return (
    <div className="relative h-[300px] w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
