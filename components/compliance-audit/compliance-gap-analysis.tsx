"use client"

import { useEffect, useRef } from "react"

export function ComplianceGapAnalysis() {
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
      { category: "访问控制", current: 85, target: 100 },
      { category: "安全策略", current: 90, target: 100 },
      { category: "资产管理", current: 75, target: 100 },
      { category: "风险评估", current: 70, target: 100 },
      { category: "加密措施", current: 65, target: 100 },
      { category: "物理安全", current: 95, target: 100 },
      { category: "运营安全", current: 80, target: 100 },
      { category: "人员安全", current: 85, target: 100 },
    ]

    // Draw radar chart
    const drawRadarChart = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) - 60

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw title
      ctx.fillStyle = "#334155"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText("ISO 27001 合规差距分析", canvas.width / 2, 10)

      const categories = data.length
      const angleStep = (Math.PI * 2) / categories

      // Draw radar grid
      const gridLevels = 5
      for (let level = 1; level <= gridLevels; level++) {
        const gridRadius = (radius * level) / gridLevels

        ctx.beginPath()
        for (let i = 0; i < categories; i++) {
          const angle = i * angleStep - Math.PI / 2
          const x = centerX + gridRadius * Math.cos(angle)
          const y = centerY + gridRadius * Math.sin(angle)

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.strokeStyle = "#e2e8f0"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw radar axes
      for (let i = 0; i < categories; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = "#e2e8f0"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw category labels
        const labelRadius = radius + 20
        const labelX = centerX + labelRadius * Math.cos(angle)
        const labelY = centerY + labelRadius * Math.sin(angle)

        ctx.fillStyle = "#334155"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(data[i].category, labelX, labelY)
      }

      // Draw target area
      ctx.beginPath()
      for (let i = 0; i < categories; i++) {
        const angle = i * angleStep - Math.PI / 2
        const value = data[i].target
        const valueRadius = (radius * value) / 100
        const x = centerX + valueRadius * Math.cos(angle)
        const y = centerY + valueRadius * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
      ctx.fill()
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw current area
      ctx.beginPath()
      for (let i = 0; i < categories; i++) {
        const angle = i * angleStep - Math.PI / 2
        const value = data[i].current
        const valueRadius = (radius * value) / 100
        const x = centerX + valueRadius * Math.cos(angle)
        const y = centerY + valueRadius * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.fillStyle = "rgba(16, 185, 129, 0.5)"
      ctx.fill()
      ctx.strokeStyle = "#10b981"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw legend
      const legendX = 20
      const legendY = 20
      const legendSize = 15
      const legendSpacing = 80

      // Target legend
      ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
      ctx.fillRect(legendX, legendY, legendSize, legendSize)
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 1
      ctx.strokeRect(legendX, legendY, legendSize, legendSize)
      ctx.fillStyle = "#334155"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText("目标", legendX + legendSize + 5, legendY + legendSize / 2)

      // Current legend
      ctx.fillStyle = "rgba(16, 185, 129, 0.5)"
      ctx.fillRect(legendX + legendSpacing, legendY, legendSize, legendSize)
      ctx.strokeStyle = "#10b981"
      ctx.lineWidth = 2
      ctx.strokeRect(legendX + legendSpacing, legendY, legendSize, legendSize)
      ctx.fillStyle = "#334155"
      ctx.fillText("当前", legendX + legendSpacing + legendSize + 5, legendY + legendSize / 2)
    }

    drawRadarChart()
    window.addEventListener("resize", drawRadarChart)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", drawRadarChart)
    }
  }, [])

  return (
    <div className="relative h-[300px] w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
