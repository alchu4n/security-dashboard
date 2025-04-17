import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

interface SecurityScoreCardProps {
  title: string
  score: number
  change: number
  icon: ReactNode
  variant?: "default" | "success" | "warning" | "danger"
  suffix?: string
  changeDirection?: "normal" | "reverse"
}

export function SecurityScoreCard({
  title,
  score,
  change,
  icon,
  variant = "default",
  suffix = "",
  changeDirection = "normal",
}: SecurityScoreCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "bg-green-50 text-green-700 border-green-200"
      case "warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "danger":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-blue-50 text-blue-700 border-blue-200"
    }
  }

  const getIconClasses = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 text-green-700"
      case "warning":
        return "bg-yellow-100 text-yellow-700"
      case "danger":
        return "bg-red-100 text-red-700"
      default:
        return "bg-blue-100 text-blue-700"
    }
  }

  const isPositiveChange = changeDirection === "normal" ? change > 0 : change < 0
  const changeAbsValue = Math.abs(change)

  return (
    <Card className={`border ${getVariantClasses()}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`rounded-full p-2 ${getIconClasses()}`}>{icon}</div>
          <div className="flex items-center text-sm">
            {isPositiveChange ? (
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span className={isPositiveChange ? "text-green-500" : "text-red-500"}>{changeAbsValue}%</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-sm font-medium">{title}</div>
          <div className="flex items-end">
            <div className="text-3xl font-bold">{score}</div>
            {suffix && <div className="ml-1 mb-1 text-sm">{suffix}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
