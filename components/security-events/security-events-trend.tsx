"use client"

import { useEffect, useRef } from "react"

export function SecurityEventsTrend() {
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
    const data = {
      labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      datasets: [
        {
          label: "高危事件",
          data: [5, 8, 12, 10, 7, 9, 11, 8, 6, 9, 12, 10],
          color: "#ef4444",
        },
        {
          label: "中危事件",
          data: [15, 18, 22, 19, 16, 20, 23, 18, 15, 17, 20, 18],
          color: "#f59e0b",
        },
        {
          label: "低危事件",
          data: [25, 22, 20, 18, 15, 17, 19, 16, 14, 16, 18, 15],
          color: "#3b82f6",
        },
      ],
    }

    // Draw line chart
    const drawLineChart = () => {
      const padding = 40
      const chartWidth = canvas.width - padding * 2
      const chartHeight = canvas.height - padding * 2

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 1

      // Horizontal grid lines
      const numHorizontalLines = 5
      for (let i = 0; i <= numHorizontalLines; i++) {
        const y = padding + (chartHeight / numHorizontalLines) * i
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(padding + chartWidth, y)
        ctx.stroke()

        // Draw y-axis labels
        const value = Math.round(50 - (i / numHorizontalLines) * 50)
        ctx.fillStyle = "#64748b"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "right"
        ctx.textBaseline = "middle"
        ctx.fillText(value.toString(), padding - 10, y)
      }

      // Vertical grid lines and x-axis labels
      const numLabels = data.labels.length
      const labelWidth = chartWidth / (numLabels - 1)

      for (let i = 0; i < numLabels; i++) {
        const x = padding + labelWidth * i

        // Grid line
        ctx.beginPath()
        ctx.moveTo(x, padding)
        ctx.lineTo(x, padding + chartHeight)
        ctx.stroke()

        // Label
        ctx.fillStyle = "#64748b"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.fillText(data.labels[i], x, padding + chartHeight + 10)
      }

      // Find maximum value for scaling
      const maxValue = Math.max(...data.datasets.flatMap((dataset) => dataset.data)) * 1.1

      // Draw datasets
      data.datasets.forEach((dataset) => {
        // Draw line
        ctx.beginPath()
        ctx.strokeStyle = dataset.color
        ctx.lineWidth = 3

        dataset.data.forEach((value, index) => {
          const x = padding + labelWidth * index
          const y = padding + chartHeight - (value / maxValue) * chartHeight

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.stroke()

        // Draw points
        dataset.data.forEach((value, index) => {
          const x = padding + labelWidth * index
          const y = padding + chartHeight - (value / maxValue) * chartHeight

          ctx.beginPath()
          ctx.fillStyle = "#ffffff"
          ctx.arc(x, y, 5, 0, Math.PI * 2)
          ctx.fill()

          ctx.beginPath()
          ctx.fillStyle = dataset.color
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fill()
        })
      })

      // Draw legend
      const legendX = padding
      const legendY = 20
      const legendItemWidth = 80

      data.datasets.forEach((dataset, index) => {
        const x = legendX + index * legendItemWidth

        // Draw color box
        ctx.fillStyle = dataset.color
        ctx.fillRect(x, legendY, 12, 12)

        // Draw label
        ctx.fillStyle = "#334155"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(dataset.label, x + 16, legendY + 6)
      })
    }

    drawLineChart()
    window.addEventListener("resize", drawLineChart)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", drawLineChart)
    }
  }, [])

  return (
    <div className="relative h-[300px] w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
