"use client"

import { useEffect, useRef } from "react"

export function SecurityEventsSeverity() {
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
      { category: "网络服务器", high: 15, medium: 22, low: 18 },
      { category: "数据库服务器", high: 12, medium: 18, low: 14 },
      { category: "认证服务", high: 8, medium: 12, low: 10 },
      { category: "终端设备", high: 5, medium: 15, low: 25 },
      { category: "网络设备", high: 7, medium: 10, low: 12 },
    ]

    // Draw stacked bar chart
    const drawStackedBarChart = () => {
      const padding = { top: 30, right: 20, bottom: 60, left: 120 }
      const chartWidth = canvas.width - padding.left - padding.right
      const chartHeight = canvas.height - padding.top - padding.bottom

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Calculate bar width and spacing
      const barCount = data.length
      const barWidth = Math.min(40, (chartWidth / barCount) * 0.7)
      const barSpacing = (chartWidth - barWidth * barCount) / (barCount + 1)

      // Find maximum value for scaling
      const maxValue = data.reduce((max, item) => {
        const total = item.high + item.medium + item.low
        return Math.max(max, total)
      }, 0)

      // Draw title
      ctx.fillStyle = "#334155"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText("按系统类型的事件严重性分布", canvas.width / 2, 10)

      // Draw horizontal grid lines
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 1
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

      // Draw bars
      data.forEach((item, index) => {
        const x = padding.left + barSpacing * (index + 1) + barWidth * index

        // Draw category labels
        ctx.fillStyle = "#64748b"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.fillText(item.category, x + barWidth / 2, padding.top + chartHeight + 10)

        // Calculate bar heights
        const highHeight = (item.high / maxValue) * chartHeight
        const mediumHeight = (item.medium / maxValue) * chartHeight
        const lowHeight = (item.low / maxValue) * chartHeight

        // Draw high severity part
        ctx.fillStyle = "#ef4444"
        ctx.fillRect(x, padding.top + chartHeight - highHeight, barWidth, highHeight)

        // Draw medium severity part
        ctx.fillStyle = "#f59e0b"
        ctx.fillRect(x, padding.top + chartHeight - highHeight - mediumHeight, barWidth, mediumHeight)

        // Draw low severity part
        ctx.fillStyle = "#3b82f6"
        ctx.fillRect(x, padding.top + chartHeight - highHeight - mediumHeight - lowHeight, barWidth, lowHeight)
      })

      // Draw legend
      const legendX = padding.left
      const legendY = padding.top + chartHeight + 30
      const legendSpacing = 80

      // High severity legend
      ctx.fillStyle = "#ef4444"
      ctx.fillRect(legendX, legendY, 12, 12)
      ctx.fillStyle = "#334155"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText("高危", legendX + 16, legendY + 6)

      // Medium severity legend
      ctx.fillStyle = "#f59e0b"
      ctx.fillRect(legendX + legendSpacing, legendY, 12, 12)
      ctx.fillStyle = "#334155"
      ctx.fillText("中危", legendX + legendSpacing + 16, legendY + 6)

      // Low severity legend
      ctx.fillStyle = "#3b82f6"
      ctx.fillRect(legendX + legendSpacing * 2, legendY, 12, 12)
      ctx.fillStyle = "#334155"
      ctx.fillText("低危", legendX + legendSpacing * 2 + 16, legendY + 6)
    }

    drawStackedBarChart()
    window.addEventListener("resize", drawStackedBarChart)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", drawStackedBarChart)
    }
  }, [])

  return (
    <div className="relative h-[300px] w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
