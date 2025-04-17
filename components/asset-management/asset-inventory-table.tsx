import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function AssetInventoryTable() {
  // Sample asset inventory data
  const assets = [
    {
      id: "SRV-001",
      name: "Web服务器01",
      type: "服务器",
      os: "Ubuntu 20.04 LTS",
      ip: "192.168.1.10",
      location: "主数据中心",
      department: "IT部门",
      riskLevel: "低",
      lastScan: "2023-04-15",
    },
    {
      id: "SRV-002",
      name: "数据库服务器01",
      type: "服务器",
      os: "CentOS 8",
      ip: "192.168.1.11",
      location: "主数据中心",
      department: "IT部门",
      riskLevel: "高",
      lastScan: "2023-04-14",
    },
    {
      id: "WS-001",
      name: "财务工作站01",
      type: "工作站",
      os: "Windows 10 Pro",
      ip: "192.168.2.15",
      location: "总部办公室",
      department: "财务部",
      riskLevel: "中",
      lastScan: "2023-04-16",
    },
    {
      id: "WS-002",
      name: "市场工作站01",
      type: "工作站",
      os: "macOS Monterey",
      ip: "192.168.2.20",
      location: "总部办公室",
      department: "市场部",
      riskLevel: "低",
      lastScan: "2023-04-15",
    },
    {
      id: "NW-001",
      name: "核心交换机01",
      type: "网络设备",
      os: "Cisco IOS",
      ip: "192.168.0.1",
      location: "主数据中心",
      department: "IT部门",
      riskLevel: "中",
      lastScan: "2023-04-13",
    },
    {
      id: "NW-002",
      name: "防火墙01",
      type: "网络设备",
      os: "Palo Alto PAN-OS",
      ip: "192.168.0.2",
      location: "主数据中心",
      department: "IT部门",
      riskLevel: "低",
      lastScan: "2023-04-14",
    },
    {
      id: "MB-001",
      name: "销售平板01",
      type: "移动设备",
      os: "iOS 15",
      ip: "192.168.3.10",
      location: "移动设备",
      department: "销售部",
      riskLevel: "中",
      lastScan: "2023-04-12",
    },
    {
      id: "IOT-001",
      name: "监控摄像头01",
      type: "IoT设备",
      os: "嵌入式Linux",
      ip: "192.168.4.5",
      location: "总部办公室",
      department: "行政部",
      riskLevel: "高",
      lastScan: "2023-04-10",
    },
  ]

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
    <div className="overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-muted/50 text-sm text-muted-foreground">
            <th className="px-4 py-3 text-left font-medium">资产ID</th>
            <th className="px-4 py-3 text-left font-medium">名称</th>
            <th className="px-4 py-3 text-left font-medium">类型</th>
            <th className="px-4 py-3 text-left font-medium">操作系统</th>
            <th className="px-4 py-3 text-left font-medium">IP地址</th>
            <th className="px-4 py-3 text-left font-medium">位置</th>
            <th className="px-4 py-3 text-left font-medium">部门</th>
            <th className="px-4 py-3 text-left font-medium">风险等级</th>
            <th className="px-4 py-3 text-left font-medium">最后扫描</th>
            <th className="px-4 py-3 text-left font-medium">操作</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="border-b text-sm hover:bg-muted/50">
              <td className="px-4 py-3 font-medium">{asset.id}</td>
              <td className="px-4 py-3">{asset.name}</td>
              <td className="px-4 py-3">{asset.type}</td>
              <td className="px-4 py-3">{asset.os}</td>
              <td className="px-4 py-3 font-mono text-xs">{asset.ip}</td>
              <td className="px-4 py-3">{asset.location}</td>
              <td className="px-4 py-3">{asset.department}</td>
              <td className="px-4 py-3">{getRiskLevelBadge(asset.riskLevel)}</td>
              <td className="px-4 py-3 text-muted-foreground">{asset.lastScan}</td>
              <td className="px-4 py-3">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">查看详情</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
