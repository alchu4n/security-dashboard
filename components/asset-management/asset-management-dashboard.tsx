"use client"

import { useState } from "react"
import { AlertTriangle, Download, HardDrive, RefreshCw, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "../dashboard-header"
import { SecurityScoreCard } from "../security-score-card"
import { AssetDistribution } from "./asset-distribution"
import { AssetVulnerabilityStatus } from "./asset-vulnerability-status"
import { AssetComplianceStatus } from "./asset-compliance-status"
import { AssetRiskTrend } from "./asset-risk-trend"
import { AssetInventoryTable } from "./asset-inventory-table"

export function AssetManagementDashboard() {
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
              <h1 className="text-3xl font-bold tracking-tight">资产管理</h1>
              <p className="text-muted-foreground">全面监控和管理IT资产安全状态</p>
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
              title="总资产数"
              score={248}
              change={+12}
              icon={<HardDrive className="h-5 w-5" />}
              variant="default"
              suffix="个"
            />
            <SecurityScoreCard
              title="高风险资产"
              score={32}
              change={-5}
              icon={<AlertTriangle className="h-5 w-5" />}
              variant="danger"
              suffix="个"
              changeDirection="reverse"
            />
            <SecurityScoreCard
              title="合规资产"
              score={85}
              change={+3}
              icon={<Shield className="h-5 w-5" />}
              variant="success"
              suffix="%"
            />
            <SecurityScoreCard
              title="未授权资产"
              score={8}
              change={-2}
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
                  <CardTitle>资产分布</CardTitle>
                  <Select defaultValue="type">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="选择视图" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="type">按类型</SelectItem>
                      <SelectItem value="location">按位置</SelectItem>
                      <SelectItem value="department">按部门</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>按类型划分的资产分布</CardDescription>
              </CardHeader>
              <CardContent>
                <AssetDistribution />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>资产漏洞状态</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="选择类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有资产</SelectItem>
                      <SelectItem value="servers">服务器</SelectItem>
                      <SelectItem value="endpoints">终端设备</SelectItem>
                      <SelectItem value="network">网络设备</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>资产漏洞修复状态</CardDescription>
              </CardHeader>
              <CardContent>
                <AssetVulnerabilityStatus />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>资产合规状态</CardTitle>
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
                <CardDescription>资产合规性评估状态</CardDescription>
              </CardHeader>
              <CardContent>
                <AssetComplianceStatus />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>资产风险趋势</CardTitle>
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
                <CardDescription>资产风险评分趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <AssetRiskTrend />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>资产清单</CardTitle>
                  <CardDescription>所有IT资产的详细信息</CardDescription>
                </div>
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">全部</TabsTrigger>
                    <TabsTrigger value="servers">服务器</TabsTrigger>
                    <TabsTrigger value="endpoints">终端设备</TabsTrigger>
                    <TabsTrigger value="network">网络设备</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <AssetInventoryTable />
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <div className="text-xs text-muted-foreground">显示最近20条资产记录</div>
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
