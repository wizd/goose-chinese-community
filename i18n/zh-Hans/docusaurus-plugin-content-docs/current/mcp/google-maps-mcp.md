---
title: Google Maps 扩展
description: 将 Google Maps MCP 服务器添加为 goose 扩展
unlisted: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';

服务器已归档

本教程介绍如何将 [Google Maps MCP 服务器](https://www.pulsemcp.com/servers/google-maps-docs) 添加为 goose 扩展，以实现地理编码、地点搜索、距离计算、海拔数据获取和路线规划。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=%40modelcontextprotocol%2Fserver-google-maps&id=google-maps&name=Google%20Maps&description=Google%20Maps%20API%20integration&env=GOOGLE_MAPS_API_KEY%3DGoogle%20Maps%20API%20key)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y @modelcontextprotocol/server-google-maps
  ```
  </TabItem>
</Tabs>
  **环境变量**
  ```
  GOOGLE_MAPS_API_KEY: <YOUR_TOKEN>
  ```
:::

## 配置

:::info
运行此命令需要在系统上安装 [Node.js](https://nodejs.org/)，因为它使用 `npx`。
:::

<Tabs groupId="interface" defaultValue="ui">
  <TabItem value="ui" label="goose Desktop">
  <GooseDesktopInstaller
    extensionId="google-maps"
    extensionName="Google Maps"
    description="Google Maps API 集成"
    command="npx"
    args={["-y", "@modelcontextprotocol/server-google-maps"]}
    envVars={[
      { name: "GOOGLE_MAPS_API_KEY", label: "Google Maps API Key" }
    ]}
    apiKeyLink="https://developers.google.com/maps/documentation/javascript/get-api-key"
    apiKeyLinkText="Google Maps API Key"
  />
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  1. 运行 `configure` 命令：
  ```sh
  goose configure
  ```

  2. 选择添加 `Command-line Extension`
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◆  What type of extension would you like to add?
    │  ○ Built-in Extension 
    // highlight-start    
    │  ● Command-line Extension (Run a local command or script)
    // highlight-end
    │  ○ Remote Extension (Streamable HTTP) 
    └ 
  ```

  3. 为扩展命名
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    // highlight-start
    ◆  What would you like to call this extension?
    │  Google Maps
    // highlight-end
    └ 
  ```

  4. 输入命令
  ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    ◇  What would you like to call this extension?
    │  Google Maps
    │
    // highlight-start
    ◆  What command should be run?
    │  npx -y @modelcontextprotocol/server-google-maps
    // highlight-end
    └ 
  ``` 

  5. 输入 goose 在操作完成前应等待的秒数，超时后会中止。默认是 300 秒
   ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    ◇  What would you like to call this extension?
    │  Google Maps
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-google-maps
    │
    // highlight-start
    ◆  Please set the timeout for this tool (in secs):
    │  300
    // highlight-end
    └ 
  ``` 

  6. 选择是否添加描述。如果这里选择 “Yes”，系统会提示你输入扩展描述。
   ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    ◇  What would you like to call this extension?
    │  Google Maps
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-google-maps
    │
    ◆  Please set the timeout for this tool (in secs):
    │  300
    │
    // highlight-start
    ◇  Would you like to add a description?
    │  No
    // highlight-end
    │
    └ 
  ```

  7. 获取 [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) 并粘贴到此处。

   ```sh
    ┌   goose-configure 
    │
    ◇  What would you like to configure?
    │  Add Extension (Connect to a new extension) 
    │
    ◇  What type of extension would you like to add?
    │  Command-line Extension 
    │
    ◇  What would you like to call this extension?
    │  Google Maps
    │
    ◇  What command should be run?
    │  npx -y @modelcontextprotocol/server-google-maps
    │
    ◇  Please set the timeout for this tool (in secs):
    │  300
    │
    ◇  Would you like to add a description?
    │  No
    │   
    // highlight-start
    ◆  Would you like to add environment variables?
    │  Yes 
    │
    ◇  Environment variable name:
    │  GOOGLE_MAPS_API_KEY
    │
    ◇  Environment variable value:
    │  ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
    │
    ◇  Add another environment variable?
    │  No 
    // highlight-end
    └  Added github extension
  ```  

  </TabItem>
</Tabs>

## 使用示例

goose 作为一个自主代理，跟踪配送司机的位置，实时更新顾客，并根据 Google Maps 的交通数据动态调整预计到达时间。

goose 可以：

**监控司机位置**
* goose 每隔几秒获取司机的 GPS 坐标。
* 如果司机位置明显落后于计划，goose 会重新计算预计到达时间。

**根据交通调整预计到达时间**
* goose 向 Google Maps 查询实时路况。
* 如果检测到延误，goose 会用新的预计时间更新顾客的追踪信息。

**动态顾客通知**
* 如果司机堵在路上，goose 会向顾客发送提醒：“你的司机因交通延误。更新后的预计到达时间：晚上 7:25。”
* 如果司机提前，goose 会通知餐厅更早备餐。


### goose 提示词
```
跟踪司机 ID #12345 的实时 GPS 位置。向 Google Maps 查询实时交通数据，如果延误超过 5 分钟，就调整预计送达时间。如果预计到达时间发生变化，更新顾客的实时追踪并发送短信通知。如果延误超过 20 分钟，检查 1 英里半径内是否有另一位司机可以接手配送。
```

### goose 输出

:::note CLI
好的，我将跟踪司机 #12345，向 Google Maps 查询交通数据，调整预计到达时间，并通知顾客。

**跟踪司机的 GPS 位置**

*   **司机 ID：** #12345
*   **起点：** 1955 Broadway, Suite 600, Oakland, CA 94612

司机 #12345 的移动：

```
2025-02-23 08:20:00: Latitude: 37.8074, Longitude: -122.2697 (Starting point)
2025-02-23 08:21:00: Latitude: 37.8080, Longitude: -122.2690
2025-02-23 08:22:00: Latitude: 37.8090, Longitude: -122.2680
2025-02-23 08:23:00: Latitude: 37.8100, Longitude: -122.2670
```


**对目的地地址进行地理编码**

*   **顾客地址：** 2111 Mission Street, San Francisco, CA

我将把这个地址转换成地理坐标：


`─── maps_geocode | googlemaps ──────────────────────────`

address: 2111 Mission Street, San Francisco, CA

```
Latitude: 37.7631446
Longitude: -122.4192073
```


**获取初始路线和预计到达时间**

我将获取从司机起点到顾客地址的初始路线和预计到达时间。


`─── maps_directions | googlemaps ──────────────────────────`

destination: 2111 Mission St, San Francisco, CA
mode: driving
origin: ...

```
Distance: 12.1 miles
Initial ETA: 21 minutes
Estimated arrival at: 08:41 AM
```


**监控交通并调整预计到达时间**

我将监控交通更新，并定期重新计算预计到达时间。

```
Remaining Distance: 8 miles
Updated ETA: 15 minutes
Estimated arrival at: 08:45 AM
```

没有明显延误。

*上午 8:35：* 发生了交通事件。


`─── maps_directions | googlemaps ──────────────────────────`

destination: 2111 Mission St, San Francisco, CA
mode: driving
origin: Latitude: 37.8100, Longitude: -122.2670


抱歉，我无法在请求中使用经纬度。我将改用名称调用 Google Maps API。

`─── maps_directions | googlemaps ──────────────────────────`

destination: 2111 Mission St, San Francisco, CA
mode: driving
origin: ...

```
Remaining Distance: 7 miles
Updated ETA: 26 minutes
Estimated arrival at: 08:46 AM
```


预计到达时间比原来的上午 8:41 增加了 5 分钟。路线现在包含一条信息：“Expect delays due to congestion.”

**更新顾客并发送短信**

[... 使用了其他扩展（例如 Webhooks、MySQL、ClickSend）...]

*   **更新实时追踪：** 顾客的实时追踪界面已更新为新的预计到达时间上午 8:46。
*   **发送短信通知：** _“你的配送现在预计大约在上午 8:46 送达，原因是交通。不便之处，敬请谅解。”_
:::
