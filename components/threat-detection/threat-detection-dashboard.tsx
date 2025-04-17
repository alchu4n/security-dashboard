"use client"

import { useState } from "react"
import { AlertTriangle, Download, RefreshCw, Shield, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "../dashboard-header"
import { SecurityScoreCard } from "../security-score-card"
import { ThreatTypeDistribution } from "./threat-type-distribution"
import { ThreatTimeline } from "./threat-timeline"
import { AttackVectorAnalysis } from "./attack-vector-analysis"
import { ThreatSeverityTrend } from "./threat-severity-trend"
import { ThreatDetectionTable } from "./threat-detection-table"

export function ThreatDetectionDashboard() {
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
              <h1 className="text-3xl font-bold tracking-tight">威胁检测</h1>
              <p className="text-muted-foreground">实时监控和分析潜在安全威胁</p>
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
              title="检测到的威胁"
              score={24}
              change={+5}
              icon={<AlertTriangle className="h-5 w-5" />}
              variant="danger"
              suffix="个"
              changeDirection="reverse"
            />
            <SecurityScoreCard
              title="已处理威胁"
              score={18}
              change={+7}
              icon={<Shield className="h-5 w-5" />}
              variant="success"
              suffix="个"
            />
            <SecurityScoreCard
              title="平均检测时间"
              score={2.5}
              change={-0.8}
              icon={<Zap className="h-5 w-5" />}
              variant="warning"
              suffix="分钟"
            />
            <SecurityScoreCard
              title="威胁检测率"
              score={96.5}
              change={+1.2}
              icon={<Shield className="h-5 w-5" />}
              variant="default"
              suffix="%"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>威胁类型分布</CardTitle>
                  <Select defaultValue="7d">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="选择时间段" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">最近24小时</SelectItem>
                      <SelectItem value="7d">最近7天</SelectItem>
                      <SelectItem value="30d">最近30天</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>按类型划分的威胁检测分布</CardDescription>
              </CardHeader>
              <CardContent>
                <ThreatTypeDistribution />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>威胁严重性趋势</CardTitle>
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
                <CardDescription>按严重性级别的威胁趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <ThreatSeverityTrend />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>攻击载体分析</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="选择类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有类型</SelectItem>
                      <SelectItem value="network">网络攻击</SelectItem>
                      <SelectItem value="application">应用攻击</SelectItem>
                      <SelectItem value="social">社会工程学</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>按攻击载体分类的威胁分析</CardDescription>
              </CardHeader>
              <CardContent>
                <AttackVectorAnalysis />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>威胁检测时间线</CardTitle>
                  <Select defaultValue="24h">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="选择时间段" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">最近24小时</SelectItem>
                      <SelectItem value="7d">最近7天</SelectItem>
                      <SelectItem value="30d">最近30天</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>威胁检测的时间分布</CardDescription>
              </CardHeader>
              <CardContent>
                <ThreatTimeline />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>最近检测到的威胁</CardTitle>
                  <CardDescription>系统检测到的最新威胁事件</CardDescription>
                </div>
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">全部</TabsTrigger>
                    <TabsTrigger value="high">高危</TabsTrigger>
                    <TabsTrigger value="medium">中危</TabsTrigger>
                    <TabsTrigger value="low">低危</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <ThreatDetectionTable />
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <div className="text-xs text-muted-foreground">显示最近20条威胁记录</div>
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
