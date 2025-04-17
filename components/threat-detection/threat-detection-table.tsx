import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export function ThreatDetectionTable() {
  // Sample threat detection data
  const threats = [
    {
      id: "THR-1234",
      timestamp: "2023-04-16 14:32:45",
      type: "恶意软件",
      source: "192.168.1.105",
      target: "文件服务器",
      description: "检测到特洛伊木马",
      severity: "高",
      status: "未处理",
    },
    {
      id: "THR-1233",
      timestamp: "2023-04-16 13:15:22",
      type: "SQL注入",
      source: "203.0.113.42",
      target: "Web应用",
      description: "检测到SQL注入尝试",
      severity: "高",
      status: "处理中",
    },
    {
      id: "THR-1232",
      timestamp: "2023-04-16 12:05:17",
      type: "暴力破解",
      source: "198.51.100.73",
      target: "认证服务器",
      description: "多次登录失败尝试",
      severity: "中",
      status: "已处理",
    },
    {
      id: "THR-1231",
      timestamp: "2023-04-16 10:42:33",
      type: "异常行为",
      source: "用户ID: admin",
      target: "数据库服务器",
      description: "非常规时间的管理员操作",
      severity: "中",
      status: "未处理",
    },
    {
      id: "THR-1230",
      timestamp: "2023-04-16 09:18:05",
      type: "网络钓鱼",
      source: "外部邮件",
      target: "多个用户",
      description: "检测到钓鱼邮件活动",
      severity: "高",
      status: "处理中",
    },
    {
      id: "THR-1229",
      timestamp: "2023-04-16 08:27:51",
      type: "DDoS",
      source: "多个IP",
      target: "Web服务器",
      description: "检测到分布式拒绝服务攻击",
      severity: "高",
      status: "已处理",
    },
    {
      id: "THR-1228",
      timestamp: "2023-04-15 23:45:12",
      type: "数据泄露",
      source: "内部用户",
      target: "客户数据库",
      description: "异常大量数据下载",
      severity: "高",
      status: "已处理",
    },
    {
      id: "THR-1227",
      timestamp: "2023-04-15 21:33:40",
      type: "XSS攻击",
      source: "172.16.254.1",
      target: "Web应用",
      description: "检测到跨站脚本攻击",
      severity: "中",
      status: "已处理",
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "已处理":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            已处理
          </Badge>
        )
      case "处理中":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            处理中
          </Badge>
        )
      case "未处理":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            未处理
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
            <th className="px-4 py-3 text-left font-medium">威胁ID</th>
            <th className="px-4 py-3 text-left font-medium">时间</th>
            <th className="px-4 py-3 text-left font-medium">类型</th>
            <th className="px-4 py-3 text-left font-medium">来源</th>
            <th className="px-4 py-3 text-left font-medium">目标</th>
            <th className="px-4 py-3 text-left font-medium">描述</th>
            <th className="px-4 py-3 text-left font-medium">严重性</th>
            <th className="px-4 py-3 text-left font-medium">状态</th>
            <th className="px-4 py-3 text-left font-medium">操作</th>
          </tr>
        </thead>
        <tbody>
          {threats.map((threat) => (
            <tr key={threat.id} className="border-b text-sm hover:bg-muted/50">
              <td className="px-4 py-3 font-medium">{threat.id}</td>
              <td className="px-4 py-3 text-muted-foreground">{threat.timestamp}</td>
              <td className="px-4 py-3">{threat.type}</td>
              <td className="px-4 py-3 font-mono text-xs">{threat.source}</td>
              <td className="px-4 py-3">{threat.target}</td>
              <td className="px-4 py-3">{threat.description}</td>
              <td className="px-4 py-3">{getSeverityBadge(threat.severity)}</td>
              <td className="px-4 py-3">{getStatusBadge(threat.status)}</td>
              <td className="px-4 py-3">
                <Link href={`/security-events/${threat.id}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">查看详情</span>
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
