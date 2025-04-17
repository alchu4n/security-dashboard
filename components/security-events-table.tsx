import { Badge } from "@/components/ui/badge"

export function SecurityEventsTable() {
  // Sample security events data
  const events = [
    {
      id: "SEC-1234",
      timestamp: "2023-04-16 14:32:45",
      type: "入侵检测",
      source: "192.168.1.105",
      description: "检测到可疑的SSH登录尝试",
      severity: "高",
    },
    {
      id: "SEC-1233",
      timestamp: "2023-04-16 13:15:22",
      type: "漏洞扫描",
      source: "Web服务器",
      description: "发现SQL注入漏洞",
      severity: "高",
    },
    {
      id: "SEC-1232",
      timestamp: "2023-04-16 12:05:17",
      type: "恶意软件",
      source: "工作站PC-045",
      description: "检测到特洛伊木马",
      severity: "高",
    },
    {
      id: "SEC-1231",
      timestamp: "2023-04-16 10:42:33",
      type: "异常行为",
      source: "用户ID: admin",
      description: "非常规时间的管理员登录",
      severity: "中",
    },
    {
      id: "SEC-1230",
      timestamp: "2023-04-16 09:18:05",
      type: "配置变更",
      source: "防火墙",
      description: "防火墙规则被修改",
      severity: "中",
    },
    {
      id: "SEC-1229",
      timestamp: "2023-04-16 08:27:51",
      type: "DDoS",
      source: "外部网络",
      description: "检测到针对Web服务器的DDoS攻击",
      severity: "高",
    },
    {
      id: "SEC-1228",
      timestamp: "2023-04-15 23:45:12",
      type: "数据泄露",
      source: "数据库服务器",
      description: "异常大量数据传输",
      severity: "高",
    },
    {
      id: "SEC-1227",
      timestamp: "2023-04-15 21:33:40",
      type: "访问控制",
      source: "用户ID: user123",
      description: "尝试访问未授权资源",
      severity: "低",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
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
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            低
          </Badge>
        )
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-muted/50 text-sm text-muted-foreground">
            <th className="px-4 py-3 text-left font-medium">事件ID</th>
            <th className="px-4 py-3 text-left font-medium">时间</th>
            <th className="px-4 py-3 text-left font-medium">类型</th>
            <th className="px-4 py-3 text-left font-medium">来源</th>
            <th className="px-4 py-3 text-left font-medium">描述</th>
            <th className="px-4 py-3 text-left font-medium">严重性</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b text-sm hover:bg-muted/50">
              <td className="px-4 py-3 font-medium">{event.id}</td>
              <td className="px-4 py-3 text-muted-foreground">{event.timestamp}</td>
              <td className="px-4 py-3">{event.type}</td>
              <td className="px-4 py-3 font-mono text-xs">{event.source}</td>
              <td className="px-4 py-3">{event.description}</td>
              <td className="px-4 py-3">{getSeverityBadge(event.severity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
