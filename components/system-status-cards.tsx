import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

export function SystemStatusCards() {
  // Sample system status data
  const systems = [
    {
      name: "Web应用防火墙",
      status: "正常",
      lastUpdated: "10分钟前",
      details: "所有规则正常运行",
    },
    {
      name: "入侵检测系统",
      status: "正常",
      lastUpdated: "15分钟前",
      details: "检测引擎正常运行",
    },
    {
      name: "数据库安全监控",
      status: "警告",
      lastUpdated: "30分钟前",
      details: "检测到异常查询模式",
    },
    {
      name: "终端安全防护",
      status: "正常",
      lastUpdated: "25分钟前",
      details: "所有终端安全状态良好",
    },
    {
      name: "网络流量分析",
      status: "正常",
      lastUpdated: "5分钟前",
      details: "流量模式正常",
    },
    {
      name: "云资源安全",
      status: "异常",
      lastUpdated: "1小时前",
      details: "检测到未授权的API访问",
    },
    {
      name: "身份认证系统",
      status: "正常",
      lastUpdated: "20分钟前",
      details: "认证服务运行正常",
    },
    {
      name: "安全日志分析",
      status: "警告",
      lastUpdated: "45分钟前",
      details: "日志收集延迟增加",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "正常":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "警告":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "异常":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "正常":
        return "bg-green-50 border-green-200"
      case "警告":
        return "bg-yellow-50 border-yellow-200"
      case "异常":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {systems.map((system) => (
        <div key={system.name} className={`rounded-lg border p-4 ${getStatusClass(system.status)}`}>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{system.name}</h3>
            {getStatusIcon(system.status)}
          </div>
          <p className="mt-2 text-sm">{system.details}</p>
          <div className="mt-3 text-xs text-muted-foreground">更新于 {system.lastUpdated}</div>
        </div>
      ))}
    </div>
  )
}
