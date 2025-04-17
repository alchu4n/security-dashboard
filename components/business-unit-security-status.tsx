"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"

export function BusinessUnitSecurityStatus() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Sample data for business units
  const businessUnits = [
    {
      name: "研发部门",
      securityScore: 87,
      threatCount: 5,
      vulnerabilityCount: 12,
      complianceScore: 92,
      riskLevel: "中",
    },
    {
      name: "市场部门",
      securityScore: 78,
      threatCount: 8,
      vulnerabilityCount: 18,
      complianceScore: 85,
      riskLevel: "中",
    },
    {
      name: "财务部门",
      securityScore: 92,
      threatCount: 2,
      vulnerabilityCount: 7,
      complianceScore: 95,
      riskLevel: "低",
    },
    {
      name: "人力资源",
      securityScore: 83,
      threatCount: 4,
      vulnerabilityCount: 10,
      complianceScore: 88,
      riskLevel: "中",
    },
    {
      name: "运营部门",
      securityScore: 75,
      threatCount: 12,
      vulnerabilityCount: 22,
      complianceScore: 80,
      riskLevel: "高",
    },
    {
      name: "客户服务",
      securityScore: 81,
      threatCount: 6,
      vulnerabilityCount: 14,
      complianceScore: 87,
      riskLevel: "中",
    },
  ]

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

      // Define metrics for radar chart
      const metrics = ["安全评分", "威胁防护", "漏洞管理", "合规性", "资产安全", "事件响应"]
      const numMetrics = metrics.length
      const angleStep = (Math.PI * 2) / numMetrics

      // Draw radar grid
      const gridLevels = 5
      for (let level = 1; level <= gridLevels; level++) {
        const gridRadius = (radius * level) / gridLevels

        ctx.beginPath()
        for (let i = 0; i < numMetrics; i++) {
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
      for (let i = 0; i < numMetrics; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = "#e2e8f0"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw metric labels
        const labelRadius = radius + 20
        const labelX = centerX + labelRadius * Math.cos(angle)
        const labelY = centerY + labelRadius * Math.sin(angle)

        ctx.fillStyle = "#334155"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(metrics[i], labelX, labelY)
      }

      // Draw data for each business unit
      const colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"]

      // Only show top 3 business units by security score for clarity
      const topUnits = [...businessUnits].sort((a, b) => b.securityScore - a.securityScore).slice(0, 3)

      topUnits.forEach((unit, unitIndex) => {
        // Generate random but consistent data for each metric
        const metricValues = [
          unit.securityScore, // Security Score
          100 - unit.threatCount * 5, // Threat Protection (inverse of threat count)
          100 - unit.vulnerabilityCount * 2, // Vulnerability Management (inverse of vulnerability count)
          unit.complianceScore, // Compliance
          85 + Math.sin(unitIndex) * 10, // Asset Security (random but consistent)
          90 - unitIndex * 5, // Incident Response (random but consistent)
        ]

        ctx.beginPath()
        for (let i = 0; i < numMetrics; i++) {
          const angle = i * angleStep - Math.PI / 2
          const value = metricValues[i]
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
        ctx.fillStyle = `${colors[unitIndex]}40` // Semi-transparent fill
        ctx.fill()
        ctx.strokeStyle = colors[unitIndex]
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw points at each metric
        for (let i = 0; i < numMetrics; i++) {
          const angle = i * angleStep - Math.PI / 2
          const value = metricValues[i]
          const valueRadius = (radius * value) / 100
          const x = centerX + valueRadius * Math.cos(angle)
          const y = centerY + valueRadius * Math.sin(angle)

          ctx.beginPath()
          ctx.fillStyle = "#ffffff"
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fill()
          ctx.strokeStyle = colors[unitIndex]
          ctx.lineWidth = 2
          ctx.stroke()
        }
      })

      // Draw legend
      const legendY = 20
      const legendItemWidth = canvas.width / 3

      topUnits.forEach((unit, index) => {
        const x = index * legendItemWidth + 20

        // Draw color box
        ctx.fillStyle = colors[index]
        ctx.fillRect(x, legendY, 12, 12)

        // Draw label
        ctx.fillStyle = "#334155"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(unit.name, x + 16, legendY + 6)
      })
    }

    drawRadarChart()
    window.addEventListener("resize", drawRadarChart)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", drawRadarChart)
    }
  }, [])

  const getRiskLevelBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "高":
        return <Badge variant="destructive">高</Badge>
      case "中":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            中
          </Badge>
        )
      case "低":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            低
          </Badge>
        )
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative h-[300px] w-full">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>

      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-muted/50 text-sm text-muted-foreground">
              <th className="px-4 py-3 text-left font-medium">事业部</th>
              <th className="px-4 py-3 text-left font-medium">安全评分</th>
              <th className="px-4 py-3 text-left font-medium">威胁数量</th>
              <th className="px-4 py-3 text-left font-medium">漏洞数量</th>
              <th className="px-4 py-3 text-left font-medium">合规评分</th>
              <th className="px-4 py-3 text-left font-medium">风险等级</th>
            </tr>
          </thead>
          <tbody>
            {businessUnits.map((unit) => (
              <tr key={unit.name} className="border-b text-sm hover:bg-muted/50">
                <td className="px-4 py-3 font-medium">{unit.name}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full max-w-24 rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${
                          unit.securityScore >= 90
                            ? "bg-green-500"
                            : unit.securityScore >= 80
                              ? "bg-blue-500"
                              : unit.securityScore >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }`}
                        style={{ width: `${unit.securityScore}%` }}
                      />
                    </div>
                    <span>{unit.securityScore}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{unit.threatCount}</td>
                <td className="px-4 py-3">{unit.vulnerabilityCount}</td>
                <td className="px-4 py-3">{unit.complianceScore}%</td>
                <td className="px-4 py-3">{getRiskLevelBadge(unit.riskLevel)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
