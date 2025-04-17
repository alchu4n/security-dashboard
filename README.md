# 安全态势感知平台 (Security Posture Awareness Platform)

这是一个全面的安全态势感知平台，用于实时监控和分析企业安全状态。平台提供了威胁检测、漏洞管理、资产管理、合规审计和安全事件分析等功能。


## 目录 (Table of Contents)

- [本地开发 (Local Development)](#本地开发-local-development)
- [线上部署 (Production Deployment)](#线上部署-production-deployment)
- [安全评分维度和计算规则 (Security Score Dimensions and Calculation Rules)](#安全评分维度和计算规则-security-score-dimensions-and-calculation-rules)

## 本地开发 (Local Development)

### 前提条件 (Prerequisites)

- Node.js 18.0.0 或更高版本
- npm 或 yarn

### 安装依赖 (Install Dependencies)

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install
```

### 运行开发服务器 (Run Development Server)

```bash
# 使用 npm
npm run dev

# 使用 yarn
yarn dev
```

开发服务器将在 [http://localhost:3000](http://localhost:3000) 启动。


### 代码结构 (Code Structure)

```
/
├── app/                    # Next.js 应用路由
│   ├── page.tsx            # 主页
│   ├── threat-detection/   # 威胁检测页面
│   ├── vulnerability-management/ # 漏洞管理页面
│   ├── asset-management/   # 资产管理页面
│   ├── compliance-audit/   # 合规审计页面
│   └── security-events/    # 安全事件页面
├── components/             # React 组件
│   ├── dashboard-header.tsx # 仪表板头部
│   ├── security-dashboard.tsx # 安全仪表板
│   ├── threat-detection/   # 威胁检测组件
│   ├── vulnerability-management/ # 漏洞管理组件
│   ├── asset-management/   # 资产管理组件
│   ├── compliance-audit/   # 合规审计组件
│   └── security-events/    # 安全事件组件
└── public/                 # 静态资源
```

### 构建生产版本 (Build for Production)

```bash
# 使用 npm
npm run build

# 使用 yarn
yarn build
```

构建完成后，可以使用以下命令启动生产服务器：


```bash
# 使用 npm
npm start

# 使用 yarn
yarn start
```

## 线上部署 (Production Deployment)

### 部署到 Vercel (Deploy to Vercel)

这个项目可以轻松部署到 Vercel 平台：


1. 在 GitHub、GitLab 或 Bitbucket 上创建一个仓库并推送代码

2. 在 Vercel 上导入项目

3. 选择仓库并配置部署设置

4. 点击部署

### 部署到其他平台 (Deploy to Other Platforms)

要部署到其他平台，请按照以下步骤操作：


1. 构建生产版本
   Build for production
   ```bash
   npm run build
   ```

2. 将 `.next`、`public` 目录和 `package.json` 文件复制到服务器
   Copy the `.next`, `public` directories and `package.json` file to your server

3. 在服务器上安装生产依赖
   ```bash
   npm install --production
   ```

4. 启动生产服务器
   ```bash
   npm start
   ```

5. 配置反向代理（如 Nginx 或 Apache）指向 Node.js 服务器

## 安全评分维度和计算规则 (Security Score Dimensions and Calculation Rules)

安全态势感知平台使用多维度评分系统来评估整体安全状态。以下是各个维度的评分规则：


### 整体安全评分 (Overall Security Score)

整体安全评分是以下五个维度的加权平均值：


- 威胁检测 (Threat Detection): 30%
- 漏洞管理 (Vulnerability Management): 25%
- 资产安全 (Asset Security): 20%
- 合规性 (Compliance): 15%
- 安全事件响应 (Security Incident Response): 10%

计算公式：
Calculation formula:

```
整体安全评分 = 
  (威胁检测得分 × 0.3) + 
  (漏洞管理得分 × 0.25) + 
  (资产安全得分 × 0.2) + 
  (合规性得分 × 0.15) + 
  (安全事件响应得分 × 0.1)
```

### 威胁检测评分 (Threat Detection Score)

威胁检测评分基于以下指标：


- 检测到的威胁数量与基线的比较 (Comparison of detected threats with baseline)
- 威胁检测率 (Threat detection rate)
- 平均检测时间 (Average detection time)
- 误报率 (False positive rate)

计算公式：
Calculation formula:

```
威胁检测得分 = 100 - (
  (检测到的威胁数量 / 基线威胁数量) × 30 +
  (1 - 威胁检测率) × 30 +
  (平均检测时间 / 目标检测时间) × 20 +
  (误报率 × 20)
)
```

### 漏洞管理评分 (Vulnerability Management Score)

漏洞管理评分基于以下指标：


- 未修复漏洞数量 (Number of unpatched vulnerabilities)
- 高危漏洞比例 (Proportion of high-risk vulnerabilities)
- 平均修复时间 (Average remediation time)
- 漏洞覆盖率 (Vulnerability coverage rate)

计算公式：
Calculation formula:

```
漏洞管理得分 = 100 - (
  (未修复漏洞数量 / 总资产数量) × 30 +
  (高危漏洞数量 / 总漏洞数量) × 30 +
  (平均修复时间 / 目标修复时间) × 20 +
  (1 - 漏洞覆盖率) × 20
)
```

### 资产安全评分 (Asset Security Score)

资产安全评分基于以下指标：


- 高风险资产比例 (Proportion of high-risk assets)
- 未授权资产比例 (Proportion of unauthorized assets)
- 资产合规率 (Asset compliance rate)
- 资产可见性 (Asset visibility)

计算公式：
Calculation formula:

```
资产安全得分 = 100 - (
  (高风险资产数量 / 总资产数量) × 30 +
  (未授权资产数量 / 总资产数量) × 30 +
  (1 - 资产合规率) × 20 +
  (1 - 资产可见性) × 20
)
```

### 合规性评分 (Compliance Score)

合规性评分基于以下指标：


- 合规控制点达成率 (Compliance control achievement rate)
- 不合规项数量 (Number of non-compliant items)
- 待审核项比例 (Proportion of pending audit items)
- 合规标准覆盖率 (Compliance standard coverage rate)

计算公式：
Calculation formula:

```
合规性得分 = 
  (合规控制点达成率 × 0.4) +
  (1 - (不合规项数量 / 总控制点数量)) × 30 +
  (1 - (待审核项数量 / 总控制点数量)) × 15 +
  (合规标准覆盖率 × 0.15)
```

### 安全事件响应评分 (Security Incident Response Score)

安全事件响应评分基于以下指标：


- 已处理事件比例 (Proportion of handled incidents)
- 平均响应时间 (Average response time)
- 事件解决率 (Incident resolution rate)
- 重复事件率 (Recurring incident rate)

计算公式：
Calculation formula:

```
安全事件响应得分 = 
  (已处理事件数量 / 总事件数量) × 30 +
  (1 - (平均响应时间 / 目标响应时间)) × 30 +
  (已解决事件数量 / 总事件数量) × 20 +
  (1 - 重复事件率) × 20
```

### 事业部安全评分 (Business Unit Security Score)

事业部安全评分使用与整体安全评分相同的维度，但针对特定事业部的资产和系统进行计算。


每个事业部的评分会根据其业务重要性和风险暴露程度进行加权，以反映在整体安全态势中的影响。

### 交流
![image](https://github.com/user-attachments/assets/0ee62820-774a-457b-a8dc-e232750e60a2){width=300 height=400}


## 许可证 (License)

[MIT](LICENSE)
