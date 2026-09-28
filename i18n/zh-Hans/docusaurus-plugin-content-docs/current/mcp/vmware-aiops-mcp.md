---
title: VMware AIops 扩展
description: 把 vmware-aiops MCP 服务器添加为 goose 扩展，用自然语言操作 VMware vCenter/ESXi
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

本教程介绍如何把 [vmware-aiops](https://github.com/zw008/VMware-AIops) 添加为 goose 扩展，用自然语言管理 VMware vCenter 和 ESXi 基础设施。有了这个扩展，goose 可以列出虚拟机、检查健康状态、开关机、从模板部署、在虚拟机内运行命令，并用自动回滚编排多步操作。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    先安装 vmware-aiops：
    ```sh
    uv tool install vmware-aiops
    vmware-aiops mcp-config install --agent goose
    ```
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    ```sh
    uv tool install vmware-aiops
    vmware-aiops mcp-config install --agent goose
    ```
  </TabItem>
</Tabs>
:::

## 配置

:::info 前置条件
你需要 [uv](https://docs.astral.sh/uv/)，以及正在运行的 VMware vCenter Server 或 ESXi 主机。访客操作功能要求客户机虚拟机内正在运行 VMware Tools。
:::

**第 1 步：安装并配置凭据**

```sh
uv tool install vmware-aiops

mkdir -p ~/.vmware-aiops
cat > ~/.vmware-aiops/config.yaml << 'EOF'
targets:
  my-vcenter:
    host: vcenter.example.com
    username: administrator@vsphere.local
    password_env: VMWARE_PASSWORD
    verify_ssl: false
EOF

echo "VMWARE_PASSWORD=your_password" > ~/.vmware-aiops/.env
chmod 600 ~/.vmware-aiops/.env
```

**第 2 步：验证连通性**

```sh
vmware-aiops doctor
```

**第 3 步：添加到 goose**

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
    <GooseDesktopInstaller
      extensionId="vmware-aiops"
      extensionName="VMware AIops"
      description="Natural language VMware vCenter/ESXi monitoring and operations"
      type="stdio"
      command="uvx"
      args={["--from", "vmware-aiops", "vmware-aiops-mcp"]}
      envVars={[
        { name: "VMWARE_AIOPS_CONFIG", label: "Path to config.yaml (e.g. /Users/you/.vmware-aiops/config.yaml)" }
      ]}
    />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="vmware-aiops"
      description="Natural language VMware vCenter/ESXi monitoring and operations"
      type="stdio"
      command="uvx --from vmware-aiops vmware-aiops-mcp"
      timeout={300}
      envVars={[
        { key: "VMWARE_AIOPS_CONFIG", value: "/Users/you/.vmware-aiops/config.yaml" }
      ]}
      infoNote={
        <>
          Set <code>VMWARE_AIOPS_CONFIG</code> to the absolute path of your config.yaml. See the <a href="https://github.com/zw008/VMware-AIops" target="_blank" rel="noopener noreferrer">vmware-aiops repository</a> for full setup instructions.
        </>
      }
    />
  </TabItem>
</Tabs>

## 使用示例

这个示例用 goose 对 vCenter 环境做日常健康检查，并处理一台虚拟机的磁盘空间问题。全程使用自然语言。

### goose 提示词

```
检查我的 vCenter 环境健康状况。列出所有活动告警，
以及最近没有使用、已关机的虚拟机。如果数据存储使用率
超过 85%，告诉我哪些虚拟机占用空间最多。
```

### goose 输出

```
我先对你的 vCenter 环境做一次完整健康检查。

--- get_alarms ---

发现 2 条活动告警：
- esxi-03：CPU ready > 5%（警告），已持续 2 小时
- datastore02：已用容量 87%（严重）← 需要处理

--- list_virtual_machines (power_state=poweredOff) ---

找到 4 台已关机的虚拟机：
- vm-test-old（上次开机：21 天前）
- vm-dev-unused（上次开机：14 天前）
- vm-staging-v1（上次开机：8 天前）
- vm-backup-runner（上次开机：3 天前）

--- browse_datastore (datastore02) ---

datastore02 上占用最大的对象：
1. vm-db-prod：320 GB（快照未清理）
2. vm-web-cluster：180 GB
3. vm-test-old：95 GB（已关机）

建议：删除 vm-test-old（已关机 21 天，95 GB），立即释放空间。
另外，vm-db-prod 有过期快照，合并后大约能回收 120 GB。

要我制定一个计划，删除 vm-test-old 并合并 vm-db-prod 的快照吗？
```

```
好，继续。
```

```
--- vm_create_plan ---

已创建计划：
第 1 步：检查 vm-test-old 是否已关机（已经关机 ✓）
第 2 步：删除 vm-test-old
第 3 步：合并 vm-db-prod 上的快照

⚠️  第 2 步不可逆。第 3 步是安全的（只读快照合并）。

--- vm_apply_plan ---

第 1/3 步：已确认 vm-test-old 处于关机状态 ✓
第 2/3 步：已删除 vm-test-old，释放 95 GB ✓
第 3/3 步：已合并 vm-db-prod 快照，释放 118 GB ✓

datastore02 现在的使用率是 64%。所有告警应在 5 分钟内清除。
```
