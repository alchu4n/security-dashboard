"use client"

import { useEffect, useRef } from "react"

export function ThreatSeverityTrend() {
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
          label: "高危",
          data: [8, 10, 12, 9, 11, 14, 12, 10, 8, 7, 9, 11],
          color: "#ef4444",
        },
        {
          label: "中危",
          data: [15, 18, 16, 14, 17, 19, 16, 15, 13, 12, 14, 16],
          color: "#f59e0b",
        },
        {
          label: "低危",
          data: [22, 20, 18, 16, 19, 21, 18, 16, 15, 14, 17, 19],
          color: "#3b82f6",
        },
      ],
    }

    // Draw stacked area chart
    const drawStackedAreaChart = () => {
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
        const value = Math.round(100 - (i / numHorizontalLines) * 100)
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

      // Calculate stacked data
      const stackedData = []
      for (let i = 0; i < data.labels.length; i++) {
        let sum = 0
        for (let j = 0; j < data.datasets.length; j++) {
          sum += data.datasets[j].data[i]
        }
        stackedData.push(sum)
      }

      const maxValue = Math.max(...stackedData)

      // Draw stacked areas (in reverse order to layer properly)
      for (let i = data.datasets.length - 1; i >= 0; i--) {
        const dataset = data.datasets[i]
        const points = []

        // Calculate points for this dataset
        for (let j = 0; j < dataset.data.length; j++) {
          let stackedValue = 0
          for (let k = 0; k <= i; k++) {
            stackedValue += data.datasets[k].data[j]
          }

          const x = padding + labelWidth * j
          const y = padding + chartHeight - (stackedValue / maxValue) * chartHeight
          points.push({ x, y })
        }

        // Draw filled area
        ctx.beginPath()
        ctx.moveTo(points[0].x, padding + chartHeight)
        for (let j = 0; j < points.length; j++) {
          ctx.lineTo(points[j].x, points[j].y)
        }
        ctx.lineTo(points[points.length - 1].x, padding + chartHeight)
        ctx.closePath()

        // Create gradient fill
        const gradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight)
        gradient.addColorStop(0, `${dataset.color}80`) // Semi-transparent
        gradient.addColorStop(1, `${dataset.color}10`) // Very transparent
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw line on top of area
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let j = 1; j < points.length; j++) {
          ctx.lineTo(points[j].x, points[j].y)
        }
        ctx.strokeStyle = dataset.color
        ctx.lineWidth = 2
        ctx.stroke()
      }

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

    drawStackedAreaChart()
    window.addEventListener("resize", drawStackedAreaChart)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", drawStackedAreaChart)
    }
  }, [])

  return (
    <div className="relative h-[300px] w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
