"use client"

import { useState } from "react"
import { AlertTriangle, Download, FileCheck, RefreshCw, Shield, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "../dashboard-header"
import { SecurityScoreCard } from "../security-score-card"
import { ComplianceScoreByStandard } from "./compliance-score-by-standard"
import { ComplianceControlStatus } from "./compliance-control-status"
import { ComplianceAuditHistory } from "./compliance-audit-history"
import { ComplianceGapAnalysis } from "./compliance-gap-analysis"
import { ComplianceAuditTable } from "./compliance-audit-table"

export function ComplianceAuditDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardHeader />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">合规审计</h1>
              <p className="text-muted-foreground">监控和管理系统合规状态</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                刷新数据
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                导出报告
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <SecurityScoreCard
              title="总体合规评分"
              score={85}
              change={+3}
              icon={<Shield className="h-5 w-5" />}
              variant="default"
              suffix="%"
            />
            <SecurityScoreCard
              title="合规控制点"
              score={124}
              change={+8}
              icon={<FileCheck className="h-5 w-5" />}
              variant="success"
              suffix="个"
            />
            <SecurityScoreCard
              title="不合规项"
              score={18}
              change={-5}
              icon={<XCircle className="h-5 w-5" />}
              variant="danger"
              suffix="个"
              changeDirection="reverse"
            />
            <SecurityScoreCard
              title="待审核项"
              score={12}
              change={-3}
              icon={<AlertTriangle className="h-5 w-5" />}
              variant="warning"
              suffix="个"
              changeDirection="reverse"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>合规标准评分</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="选择视图" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有标准</SelectItem>
                      <SelectItem value="critical">关键标准</SelectItem>
                      <SelectItem value="recent">最近更新</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>各合规标准的达成情况</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplianceScoreByStandard />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>控制点状态</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="选择标准" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有标准</SelectItem>
                      <SelectItem value="iso27001">ISO 27001</SelectItem>
                      <SelectItem value="pci">PCI DSS</SelectItem>
                      <SelectItem value="gdpr">GDPR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>合规控制点实施状态</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplianceControlStatus />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>合规差距分析</CardTitle>
                  <Select defaultValue="iso27001">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="选择标准" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iso27001">ISO 27001</SelectItem>
                      <SelectItem value="pci">PCI DSS</SelectItem>
                      <SelectItem value="gdpr">GDPR</SelectItem>
                      <SelectItem value="hipaa">HIPAA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>合规要求与当前状态的差距</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplianceGapAnalysis />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>审计历史</CardTitle>
                  <Select defaultValue="90d">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="选择时间段" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30d">最近30天</SelectItem>
                      <SelectItem value="90d">最近90天</SelectItem>
                      <SelectItem value="180d">最近180天</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>历史审计结果趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplianceAuditHistory />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>合规审计记录</CardTitle>
                  <CardDescription>最近的合规审计记录和结果</CardDescription>
                </div>
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">全部</TabsTrigger>
                    <TabsTrigger value="passed">通过</TabsTrigger>
                    <TabsTrigger value="failed">不通过</TabsTrigger>
                    <TabsTrigger value="pending">待审核</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <ComplianceAuditTable />
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <div className="text-xs text-muted-foreground">显示最近20条审计记录</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  上一页
                </Button>
                <Button variant="outline" size="sm">
                  下一页
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
