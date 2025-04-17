"use client"

import { useEffect, useRef } from "react"

export function AssetComplianceStatus() {
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
      { label: "ISO 27001", compliant: 85, nonCompliant: 15 },
      { label: "PCI DSS", compliant: 78, nonCompliant: 22 },
      { label: "GDPR", compliant: 92, nonCompliant: 8 },
      { label: "HIPAA", compliant: 80, nonCompliant: 20 },
      { label: "内部策略", compliant: 88, nonCompliant: 12 },
    ]

    // Draw horizontal stacked bar chart
    const drawHorizontalStackedBarChart = () => {
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
      ctx.fillText("合规标准达成率", padding.left, 10)

      // Draw bars
      data.forEach((item, index) => {
        const y = padding.top + barSpacing * (index + 1) + barHeight * index

        // Draw compliant part
        const compliantWidth = (item.compliant / 100) * chartWidth
        ctx.fillStyle = "#10b981"
        ctx.beginPath()
        ctx.roundRect(padding.left, y, compliantWidth, barHeight, [4, 0, 0, 4])
        ctx.fill()

        // Draw non-compliant part
        const nonCompliantWidth = (item.nonCompliant / 100) * chartWidth
        ctx.fillStyle = "#ef4444"
        ctx.beginPath()
        ctx.roundRect(padding.left + compliantWidth, y, nonCompliantWidth, barHeight, [0, 4, 4, 0])
        ctx.fill()

        // Draw label
        ctx.fillStyle = "#334155"
        ctx.font = "13px sans-serif"
        ctx.textAlign = "right"
        ctx.textBaseline = "middle"
        ctx.fillText(item.label, padding.left - 10, y + barHeight / 2)

        // Draw percentage
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(`${item.compliant}%`, padding.left + compliantWidth / 2, y + barHeight / 2)

        if (item.nonCompliant > 10) {
          ctx.fillText(
            `${item.nonCompliant}%`,
            padding.left + compliantWidth + nonCompliantWidth / 2,
            y + barHeight / 2,
          )
        }
      })

      // Draw legend
      const legendX = padding.left
      const legendY = padding.top + chartHeight + 10
      const legendSpacing = 100

      // Compliant legend
      ctx.fillStyle = "#10b981"
      ctx.fillRect(legendX, legendY, 12, 12)
      ctx.fillStyle = "#334155"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText("合规", legendX + 16, legendY + 6)

      // Non-compliant legend
      ctx.fillStyle = "#ef4444"
      ctx.fillRect(legendX + legendSpacing, legendY, 12, 12)
      ctx.fillStyle = "#334155"
      ctx.fillText("不合规", legendX + legendSpacing + 16, legendY + 6)
    }

    drawHorizontalStackedBarChart()
    window.addEventListener("resize", drawHorizontalStackedBarChart)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", drawHorizontalStackedBarChart)
    }
  }, [])

  return (
    <div className="relative h-[300px] w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
