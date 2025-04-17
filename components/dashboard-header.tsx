"use client"

import { Bell, Menu, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"

export function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 font-semibold">
        <Shield className="h-6 w-6 text-red-500" />
        <span className="hidden md:inline-block">安全态势感知平台</span>
      </div>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">切换菜单</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <nav className="grid gap-6 text-lg font-medium">
            <a
              href="/"
              className={`flex items-center gap-2 ${pathname === "/" ? "text-red-500" : "text-muted-foreground"}`}
            >
              <Shield className="h-5 w-5" />
              <span>安全态势</span>
            </a>
            <a
              href="/threat-detection"
              className={`flex items-center gap-2 ${pathname === "/threat-detection" ? "text-red-500" : "text-muted-foreground"}`}
            >
              <span>威胁检测</span>
            </a>
            <a
              href="/vulnerability-management"
              className={`flex items-center gap-2 ${pathname === "/vulnerability-management" ? "text-red-500" : "text-muted-foreground"}`}
            >
              <span>漏洞管理</span>
            </a>
            <a
              href="/asset-management"
              className={`flex items-center gap-2 ${pathname === "/asset-management" ? "text-red-500" : "text-muted-foreground"}`}
            >
              <span>资产管理</span>
            </a>
            <a
              href="/compliance-audit"
              className={`flex items-center gap-2 ${pathname === "/compliance-audit" ? "text-red-500" : "text-muted-foreground"}`}
            >
              <span>合规审计</span>
            </a>
            <a
              href="/security-events"
              className={`flex items-center gap-2 ${pathname === "/security-events" ? "text-red-500" : "text-muted-foreground"}`}
            >
              <span>安全事件</span>
            </a>
          </nav>
        </SheetContent>
      </Sheet>

      <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
        <a href="/" className={`font-medium ${pathname === "/" ? "text-red-500" : "text-muted-foreground"}`}>
          安全态势
        </a>
        <a
          href="/threat-detection"
          className={`font-medium ${pathname === "/threat-detection" ? "text-red-500" : "text-muted-foreground"}`}
        >
          威胁检测
        </a>
        <a
          href="/vulnerability-management"
          className={`font-medium ${pathname === "/vulnerability-management" ? "text-red-500" : "text-muted-foreground"}`}
        >
          漏洞管理
        </a>
        <a
          href="/asset-management"
          className={`font-medium ${pathname === "/asset-management" ? "text-red-500" : "text-muted-foreground"}`}
        >
          资产管理
        </a>
        <a
          href="/compliance-audit"
          className={`font-medium ${pathname === "/compliance-audit" ? "text-red-500" : "text-muted-foreground"}`}
        >
          合规审计
        </a>
        <a
          href="/security-events"
          className={`font-medium ${pathname === "/security-events" ? "text-red-500" : "text-muted-foreground"}`}
        >
          安全事件
        </a>
      </nav>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                3
              </Badge>
              <span className="sr-only">通知</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>通知</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="font-medium">检测到新的威胁</span>
              <span className="ml-auto text-xs text-muted-foreground">10分钟前</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="font-medium">系统更新完成</span>
              <span className="ml-auto text-xs text-muted-foreground">1小时前</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="font-medium">安全策略已更新</span>
              <span className="ml-auto text-xs text-muted-foreground">2小时前</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm">查看所有通知</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">用户菜单</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>个人资料</DropdownMenuItem>
            <DropdownMenuItem>设置</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>退出登录</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
