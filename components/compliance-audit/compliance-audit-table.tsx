import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function ComplianceAuditTable() {
  // Sample compliance audit data
  const audits = [
    {
      id: "AUD-1234",
      standard: "ISO 27001",
      control: "A.9.2.3",
      description: "特权访问权限管理",
      status: "通过",
      date: "2023-04-15",
      auditor: "张三",
      findings: "无重大发现",
      risk: "低",
    },
    {
      id: "AUD-1233",
      standard: "PCI DSS",
      control: "Req 8.2.3",
      description: "密码复杂度要求",
      status: "不通过",
      date: "2023-04-14",
      auditor: "李四",
      findings: "部分用户密码不符合复杂度要求",
      risk: "高",
    },
    {
      id: "AUD-1232",
      standard: "GDPR",
      control: "Art. 32",
      description: "数据处理安全",
      status: "部分通过",
      date: "2023-04-13",
      auditor: "王五",
      findings: "需要加强数据加密措施",
      risk: "中",
    },
    {
      id: "AUD-1231",
      standard: "ISO 27001",
      control: "A.8.1.1",
      description: "资产清单",
      status: "通过",
      date: "2023-04-12",
      auditor: "张三",
      findings: "资产清单完整且更新及时",
      risk: "低",
    },
    {
      id: "AUD-1230",
      standard: "HIPAA",
      control: "164.312(a)(1)",
      description: "访问控制",
      status: "待审核",
      date: "2023-04-11",
      auditor: "赵六",
      findings: "待确认",
      risk: "待评估",
    },
    {
      id: "AUD-1229",
      standard: "ISO 27001",
      control: "A.12.6.1",
      description: "漏洞管理",
      status: "不通过",
      date: "2023-04-10",
      auditor: "李四",
      findings: "漏洞修复流程未有效执行",
      risk: "高",
    },
    {
      id: "AUD-1228",
      standard: "PCI DSS",
      control: "Req 10.2",
      description: "审计日志记录",
      status: "通过",
      date: "2023-04-09",
      auditor: "王五",
      findings: "审计日志记录完整",
      risk: "低",
    },
    {
      id: "AUD-1227",
      standard: "GDPR",
      control: "Art. 25",
      description: "数据保护设计",
      status: "部分通过",
      date: "2023-04-08",
      auditor: "赵六",
      findings: "需要改进数据最小化措施",
      risk: "中",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "通过":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            通过
          </Badge>
        )
      case "不通过":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            不通过
          </Badge>
        )
      case "部分通过":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            部分通过
          </Badge>
        )
      case "待审核":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            待审核
          </Badge>
        )
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
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
            <th className="px-4 py-3 text-left font-medium">审计ID</th>
            <th className="px-4 py-3 text-left font-medium">标准</th>
            <th className="px-4 py-3 text-left font-medium">控制点</th>
            <th className="px-4 py-3 text-left font-medium">描述</th>
            <th className="px-4 py-3 text-left font-medium">状态</th>
            <th className="px-4 py-3 text-left font-medium">日期</th>
            <th className="px-4 py-3 text-left font-medium">审计员</th>
            <th className="px-4 py-3 text-left font-medium">风险等级</th>
            <th className="px-4 py-3 text-left font-medium">操作</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((audit) => (
            <tr key={audit.id} className="border-b text-sm hover:bg-muted/50">
              <td className="px-4 py-3 font-medium">{audit.id}</td>
              <td className="px-4 py-3">{audit.standard}</td>
              <td className="px-4 py-3 font-mono text-xs">{audit.control}</td>
              <td className="px-4 py-3">{audit.description}</td>
              <td className="px-4 py-3">{getStatusBadge(audit.status)}</td>
              <td className="px-4 py-3 text-muted-foreground">{audit.date}</td>
              <td className="px-4 py-3">{audit.auditor}</td>
              <td className="px-4 py-3">{getRiskBadge(audit.risk)}</td>
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
