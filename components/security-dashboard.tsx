"use client"

import { useState } from "react"
import { Shield, AlertTriangle, CheckCircle, XCircle, Search, Filter, Download, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "./dashboard-header"
import { SecurityScoreCard } from "./security-score-card"
import { ThreatMap } from "./threat-map"
import { SecurityEventsTable } from "./security-events-table"
import { SystemStatusCards } from "./system-status-cards"
import { VulnerabilityChart } from "./vulnerability-chart"
import { BusinessUnitSecurityStatus } from "./business-unit-security-status"

export function SecurityDashboard() {
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
              <h1 className="text-3xl font-bold tracking-tight">安全态势概览</h1>
              <p className="text-muted-foreground">实时监控系统安全状态和潜在威胁</p>
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
            <SecurityScoreCard title="整体安全评分" score={78} change={+3} icon={<Shield className="h-5 w-5" />} />
            <SecurityScoreCard
              title="威胁检测"
              score={12}
              change={-4}
              icon={<AlertTriangle className="h-5 w-5" />}
              variant="warning"
              suffix="个"
            />
            <SecurityScoreCard
              title="已修复漏洞"
              score={85}
              change={+12}
              icon={<CheckCircle className="h-5 w-5" />}
              variant="success"
              suffix="%"
            />
            <SecurityScoreCard
              title="待修复漏洞"
              score={24}
              change={+5}
              icon={<XCircle className="h-5 w-5" />}
              variant="danger"
              suffix="个"
              changeDirection="reverse"
            />
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>事业部安全态势</CardTitle>
                  <CardDescription>各事业部安全状态对比分析</CardDescription>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="选择视图" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有事业部</SelectItem>
                    <SelectItem value="critical">关键事业部</SelectItem>
                    <SelectItem value="risk">高风险事业部</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <BusinessUnitSecurityStatus />
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>威胁地理分布</CardTitle>
                  <Select defaultValue="24h">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="选择时间段" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">最近1小时</SelectItem>
                      <SelectItem value="24h">最近24小时</SelectItem>
                      <SelectItem value="7d">最近7天</SelectItem>
                      <SelectItem value="30d">最近30天</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>全球范围内的安全威胁来源分布</CardDescription>
              </CardHeader>
              <CardContent>
                <ThreatMap />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>漏洞趋势分析</CardTitle>
                  <Select defaultValue="30d">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="选择时间段" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">最近7天</SelectItem>
                      <SelectItem value="30d">最近30天</SelectItem>
                      <SelectItem value="90d">最近90天</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>系统漏洞数量和修复状态趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <VulnerabilityChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>系统安全状态</CardTitle>
                  <CardDescription>关键系统和服务的安全状态监控</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  筛选
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <SystemStatusCards />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>安全事件日志</CardTitle>
                  <CardDescription>最近检测到的安全事件和告警</CardDescription>
                </div>
                <div className="flex w-full sm:w-auto items-center gap-2">
                  <div className="relative w-full sm:w-[180px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="搜索事件..." className="w-full pl-8" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="事件类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有事件</SelectItem>
                      <SelectItem value="critical">严重事件</SelectItem>
                      <SelectItem value="warning">警告事件</SelectItem>
                      <SelectItem value="info">信息事件</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <SecurityEventsTable />
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <div className="text-xs text-muted-foreground">显示最近100条事件记录</div>
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
