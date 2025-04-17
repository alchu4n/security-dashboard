"use client"

import { useState } from "react"
import { AlertTriangle, Calendar, Download, Filter, RefreshCw, Search, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { DashboardHeader } from "../dashboard-header"
import { SecurityScoreCard } from "../security-score-card"
import { SecurityEventsTable } from "../security-events-table"
import { SecurityEventsTrend } from "./security-events-trend"
import { SecurityEventsDistribution } from "./security-events-distribution"
import { SecurityEventsSeverity } from "./security-events-severity"

export function SecurityEventsAnalysis() {
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
              <h1 className="text-3xl font-bold tracking-tight">安全事件分析</h1>
              <p className="text-muted-foreground">详细分析和管理安全事件</p>
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
              title="总安全事件"
              score={156}
              change={+12}
              icon={<Shield className="h-5 w-5" />}
              variant="default"
              suffix="个"
            />
            <SecurityScoreCard
              title="高危事件"
              score={28}
              change={+5}
              icon={<AlertTriangle className="h-5 w-5" />}
              variant="danger"
              suffix="个"
              changeDirection="reverse"
            />
            <SecurityScoreCard
              title="已处理事件"
              score={124}
              change={+18}
              icon={<Shield className="h-5 w-5" />}
              variant="success"
              suffix="个"
            />
            <SecurityScoreCard
              title="平均响应时间"
              score={18}
              change={-3}
              icon={<Calendar className="h-5 w-5" />}
              variant="warning"
              suffix="分钟"
              changeDirection="reverse"
            />
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>事件筛选</CardTitle>
                  <CardDescription>按条件筛选安全事件</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="搜索事件..." className="pl-8" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="事件类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有类型</SelectItem>
                    <SelectItem value="intrusion">入侵检测</SelectItem>
                    <SelectItem value="malware">恶意软件</SelectItem>
                    <SelectItem value="ddos">DDoS攻击</SelectItem>
                    <SelectItem value="access">异常访问</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="严重性" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有级别</SelectItem>
                    <SelectItem value="high">高危</SelectItem>
                    <SelectItem value="medium">中危</SelectItem>
                    <SelectItem value="low">低危</SelectItem>
                  </SelectContent>
                </Select>
                <DatePickerWithRange />
              </div>
              <div className="mt-4 flex justify-end">
                <Button>
                  <Filter className="mr-2 h-4 w-4" />
                  应用筛选
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>事件趋势</CardTitle>
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
                <CardDescription>安全事件发生趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <SecurityEventsTrend />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>事件类型分布</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="选择类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有类型</SelectItem>
                      <SelectItem value="high">高危事件</SelectItem>
                      <SelectItem value="medium">中危事件</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>按类型划分的事件分布</CardDescription>
              </CardHeader>
              <CardContent>
                <SecurityEventsDistribution />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>事件严重性分析</CardTitle>
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
              <CardDescription>按严重性级别的事件分析</CardDescription>
            </CardHeader>
            <CardContent>
              <SecurityEventsSeverity />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>安全事件列表</CardTitle>
                  <CardDescription>详细的安全事件记录</CardDescription>
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
