"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, Download, ExternalLink, RefreshCw, Shield, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "../dashboard-header"
import Link from "next/link"

export function SecurityEventDetail({ id }: { id: string }) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  // 模拟事件详情数据
  const eventDetail = {
    id: id,
    title: "检测到可疑的SSH登录尝试",
    timestamp: "2023-04-16 14:32:45",
    type: "入侵检测",
    source: "192.168.1.105",
    destination: "192.168.1.10",
    severity: "高",
    status: "已处理",
    description:
      "系统检测到来自IP地址192.168.1.105的多次SSH登录失败尝试，可能是暴力破解攻击。在短时间内尝试了超过20次不同的密码组合。",
    affectedSystems: ["Web服务器", "认证服务"],
    timeline: [
      { time: "14:32:45", action: "检测到事件", user: "系统" },
      { time: "14:33:12", action: "触发告警", user: "系统" },
      { time: "14:35:30", action: "安全团队确认", user: "admin" },
      { time: "14:40:15", action: "IP地址已被临时封禁", user: "admin" },
      { time: "15:20:45", action: "完成调查", user: "security_analyst" },
      { time: "15:25:30", action: "事件已解决", user: "security_analyst" },
    ],
    relatedEvents: [
      { id: "SEC-1230", title: "防火墙规则被修改", timestamp: "2023-04-16 09:18:05" },
      { id: "SEC-1228", title: "异常大量数据传输", timestamp: "2023-04-15 23:45:12" },
    ],
    recommendations: [
      "更新SSH配置，禁用密码认证，仅允许密钥认证",
      "实施IP白名单策略",
      "配置失败登录尝试限制",
      "启用双因素认证",
    ],
  }

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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardHeader />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Link href="/security-events">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">安全事件详情</h1>
                <p className="text-muted-foreground">事件ID: {eventDetail.id}</p>
              </div>
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

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{eventDetail.title}</CardTitle>
                <CardDescription>详细信息</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">事件类型</div>
                      <div>{eventDetail.type}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">发生时间</div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {eventDetail.timestamp}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">来源</div>
                      <div className="font-mono">{eventDetail.source}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">目标</div>
                      <div className="font-mono">{eventDetail.destination}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">严重性</div>
                      <div>{getSeverityBadge(eventDetail.severity)}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">状态</div>
                      <div>{getStatusBadge(eventDetail.status)}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">事件描述</div>
                    <div className="rounded-md bg-muted p-4 text-sm">{eventDetail.description}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">受影响系统</div>
                    <div className="flex flex-wrap gap-2">
                      {eventDetail.affectedSystems.map((system) => (
                        <Badge key={system} variant="outline">
                          {system}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>处理建议</CardTitle>
                <CardDescription>推荐的处理措施</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {eventDetail.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Shield className="mt-0.5 h-4 w-4 text-red-500 shrink-0" />
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="timeline">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timeline">事件时间线</TabsTrigger>
              <TabsTrigger value="related">相关事件</TabsTrigger>
              <TabsTrigger value="logs">原始日志</TabsTrigger>
            </TabsList>
            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>事件时间线</CardTitle>
                  <CardDescription>事件处理过程</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l border-muted">
                    {eventDetail.timeline.map((item, index) => (
                      <div key={index} className="mb-6 relative">
                        <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                          <Clock className="h-3 w-3 text-primary-foreground" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                          <div className="text-sm font-medium">{item.time}</div>
                          <div className="text-base">{item.action}</div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
                            <User className="h-3 w-3" />
                            {item.user}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="related">
              <Card>
                <CardHeader>
                  <CardTitle>相关事件</CardTitle>
                  <CardDescription>可能相关的其他安全事件</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {eventDetail.relatedEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between border-b pb-4">
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">{event.timestamp}</div>
                        </div>
                        <Link href={`/security-events/${event.id}`}>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">查看详情</span>
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="logs">
              <Card>
                <CardHeader>
                  <CardTitle>原始日志</CardTitle>
                  <CardDescription>事件相关的系统日志</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-black text-green-400 p-4 font-mono text-sm overflow-auto max-h-[400px]">
                    <pre>
                      {`Apr 16 14:32:40 webserver sshd[12345]: Failed password for invalid user admin from 192.168.1.105 port 49812 ssh2
Apr 16 14:32:41 webserver sshd[12345]: Failed password for invalid user admin from 192.168.1.105 port 49813 ssh2
Apr 16 14:32:42 webserver sshd[12345]: Failed password for invalid user root from 192.168.1.105 port 49814 ssh2
Apr 16 14:32:43 webserver sshd[12345]: Failed password for invalid user root from 192.168.1.105 port 49815 ssh2
Apr 16 14:32:44 webserver sshd[12345]: Failed password for invalid user user from 192.168.1.105 port 49816 ssh2
Apr 16 14:32:45 webserver sshd[12345]: Failed password for invalid user test from 192.168.1.105 port 49817 ssh2
Apr 16 14:32:45 webserver security[54321]: Multiple failed login attempts detected from 192.168.1.105
Apr 16 14:33:12 webserver security[54321]: Alert triggered: Possible brute force attack from 192.168.1.105
Apr 16 14:35:30 webserver security[54321]: Security team acknowledged alert ID: SEC-1234
Apr 16 14:40:15 webserver iptables: Blocking IP 192.168.1.105 for 24 hours
Apr 16 15:20:45 webserver security[54321]: Investigation completed for alert ID: SEC-1234
Apr 16 15:25:30 webserver security[54321]: Alert ID: SEC-1234 marked as resolved`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
