---
title: Repomix 扩展
description: 把 Repomix MCP 服务器添加为 goose 扩展
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeShortEmbed from '@site/src/components/YouTubeShortEmbed';
import GooseDesktopInstaller from '@site/src/components/GooseDesktopInstaller';
import CLIExtensionInstructions from '@site/src/components/CLIExtensionInstructions';

<YouTubeShortEmbed videoUrl="https://www.youtube.com/embed/69h4LLkIg_E" />


本教程介绍如何把 [Repomix MCP 服务器](https://github.com/yamadashy/repomix) 添加为 goose 扩展，以实现自动化仓库打包、代码库分析、架构摘要、测试生成和代码探索。同时它会压缩代码库，以减少 token 用量，并留在大模型的上下文限制之内。

:::tip 快速安装
<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  [启动安装程序](goose://extension?cmd=npx&arg=-y&arg=repomix&arg=--mcp&id=repomix-mcp&name=Repomix&description=Pack%20repositories%20into%20AI-friendly%20formats%20for%20goose)
  </TabItem>
  <TabItem value="cli" label="goose CLI">
  **命令**
  ```sh
  npx -y repomix --mcp
  ```
  </TabItem>
</Tabs>
:::

## 配置

:::info
运行此命令需要系统已安装 [Node.js](https://nodejs.org/)，因为会用到 `npx`。
:::

<Tabs groupId="interface">
  <TabItem value="ui" label="goose Desktop" default>
  <GooseDesktopInstaller
    extensionId="repomix-mcp"
    extensionName="Repomix"
    description="Pack repositories into AI-friendly formats for goose"
    command="npx"
    args={["-y", "repomix", "--mcp"]}
  />
</TabItem>
  <TabItem value="cli" label="goose CLI">
    <CLIExtensionInstructions
      name="Repomix"
      description="Pack repositories into AI-friendly formats for goose"
      command="npx -y repomix --mcp"
    />
  </TabItem>
</Tabs>

## 使用示例

这个示例演示如何用 goose 和 Repomix 扩展分析压缩后的 Axios 仓库。goose 会聚焦 `lib/core/Axios.js`，解释它在架构中的角色，找出缺失的测试，编写新的单元测试，并建议如何改进测试策略和代码可维护性。

把整个代码库压缩成对 AI 友好的格式后，Repomix 帮助 goose 留在 token 限制内，同时给出针对具体文件的详细见解。

### goose 提示词

> 审查 Axios 仓库中的 lib/core/Axios.js，找出要充分覆盖其核心函数和类还缺哪些单元测试。解释这个文件在整个 Axios 架构中的角色、它如何与其他模块集成，以及目前的测试情况。编写新的单元测试以提高覆盖率，并建议如何改进测试策略，或指出能让代码更易维护的重构机会。


### goose 输出

:::note 命令行

我来分析 Axios.js 核心文件及其测试覆盖。分成这几步：

1. 先用 repomix 获取并查看 Axios 仓库
2. 再分析这个具体文件和相关测试
3. 最后给出建议和新的单元测试

先获取仓库：

--- Pack Remote Repository ---

现在读取核心 Axios.js 及其相关测试文件：

--- Read Repomix Output ---

根据对 Axios 代码库的分析，我先给出项目结构的整体概览，并创建一份改进后的 README。按部分说明：

**在 Axios 架构中的角色**

`Axios.js` 是 Axios 库最关键的核心组件之一。它承担几个重要作用：

1. 请求处理：包含处理并分发 HTTP 请求的主 `Axios` 类
2. 配置管理：把默认配置与请求专用配置合并
3. 拦截器管理：管理请求和响应拦截器
4. HTTP 方法便捷接口：为不同 HTTP 动词（get、post 等）提供便捷方法

该文件通过这些核心模块与其他部分集成：

- `InterceptorManager` 处理请求和响应拦截器
- `dispatchRequest` 发起实际的 HTTP 请求
- `mergeConfig` 处理配置
- `buildFullPath` 解析 URL
- `AxiosHeaders` 管理请求头

**当前测试覆盖分析**

Axios.js 目前的测试覆盖相当不错，但仍有缺口。相关测试文件：

1. `test/unit/core/Axios.js`：主要关注错误处理，尤其是不可写的错误栈
2. `test/specs/api.spec.js`：测试公开 API 表面
3. `test/specs/interceptors.spec.js`：测试拦截器功能
4. `test/specs/instance.spec.js`：测试实例创建和配置

**缺失的测试覆盖**
1. 错误处理：

```js
// Missing tests for error propagation in request chain
_request(configOrUrl, config) {
  // Error handling here needs more coverage
}
```

2. 配置处理：

```js
// Missing edge cases for config validation
request(configOrUrl, config) {
  // Config validation edge cases not fully tested
}
```

3. 方法别名：

```js
// Missing tests for all HTTP method aliases with various parameter combinations
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  // Missing tests for these methods with different data types
});
```

4. 拦截器链：

```js
// Missing tests for complex interceptor chains and error scenarios
const chain = [dispatchRequest.bind(this), undefined];
chain.unshift.apply(chain, requestInterceptorChain);
chain.push.apply(chain, responseInterceptorChain);
```

**新的单元测试**
下面是用于提高覆盖率的新单元测试：

```js
describe('core::Axios', function() {
  describe('request method', function() {
    it('should handle null/undefined config values', function(done) {
      const instance = new Axios({});
      
      instance.request({
        url: '/foo',
        params: null,
        data: undefined
      }).then(function(response) {
        expect(response.config.params).toBeNull();
        expect(response.config.data).toBeUndefined();
        done();
      }).catch(done);
    });

    it('should properly merge nested config objects', function(done) {
      const instance = new Axios({
        headers: {
          common: {
            'X-Common': 'common'
          },
          get: {
            'X-Method': 'get'
          }
        }
      });

      instance.request({
        method: 'get',
        headers: {
          'X-Custom': 'custom'
        }
      }).then(function(response) {
        expect(response.config.headers['X-Common']).toBe('common');
        expect(response.config.headers['X-Method']).toBe('get');
        expect(response.config.headers['X-Custom']).toBe('custom');
        done();
      }).catch(done);
    });
  });

  describe('interceptor chain', function() {
    it('should handle async interceptors correctly', async function() {
      const instance = new Axios({});
      const order = [];

      instance.interceptors.request.use(async function(config) {
        await new Promise(resolve => setTimeout(resolve, 100));
        order.push(1);
        return config;
      });

      instance.interceptors.request.use(async function(config) {
        await new Promise(resolve => setTimeout(resolve, 50));
        order.push(2);
        return config;
      });

      instance.interceptors.response.use(async function(response) {
        await new Promise(resolve => setTimeout(resolve, 100));
        order.push(3);
        return response;
      });

      await instance.request('/foo');
      expect(order).toEqual([2, 1, 3]); // Interceptors should execute in correct order
    });

    it('should handle interceptor errors properly', function(done) {
      const instance = new Axios({});
      const error = new Error('Interceptor Error');

      instance.interceptors.request.use(function() {
        throw error;
      });

      instance.request('/foo').catch(function(e) {
        expect(e).toBe(error);
        done();
      });
    });
  });

  describe('HTTP method aliases', function() {
    it('should handle various data types in post/put/patch', function(done) {
      const instance = new Axios({});
      const testCases = [
        {method: 'post', data: {foo: 'bar'}},
        {method: 'put', data: 'string data'},
        {method: 'patch', data: new URLSearchParams('foo=bar')},
        {method: 'post', data: new FormData()},
        {method: 'put', data: new Blob(['test'])},
        {method: 'patch', data: null}
      ];

      Promise.all(testCases.map(({method, data}) => {
        return instance[method]('/foo', data).then(response => {
          expect(response.config.data).toEqual(data);
          return response;
        });
      })).then(() => done()).catch(done);
    });
  });
});
```

**测试策略建议**

1. 模块化测试：

- 把测试拆成更小、更聚焦的单元
- 分别测试每个 HTTP 方法别名
- 为配置处理、拦截器和错误处理建立专门的测试套件

2. 模拟集成点：

- 用依赖注入提高隔离性
- 一致地模拟外部依赖
- 创建可复用的 mock 工厂

3. 错误处理：

- 为错误情况增加更多测试
- 测试错误在拦截器链中的传播
- 校验错误对象的属性和继承关系

4. 配置处理：

- 测试复杂的配置合并场景
- 确认默认值被正确应用
- 测试配置校验的边界情况

5. 拦截器测试：

- 测试复杂的拦截器链
- 校验异步拦截器行为
- 测试拦截器的错误处理

**重构机会**

1. 错误处理：
```js
// Current
_request(configOrUrl, config) {
  try {
    return this.request(configOrUrl, config);
  } catch (err) {
    // Error handling
  }
}

// Suggested
async _request(configOrUrl, config) {
  try {
    return await this.request(configOrUrl, config);
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err;
    }
    throw AxiosError.from(err);
  }
}
```
2. 配置处理：

```js
// Current
request(configOrUrl, config) {
  // Config processing
}

// Suggested
request(configOrUrl, config) {
  const normalizedConfig = this._normalizeConfig(configOrUrl, config);
  this._validateConfig(normalizedConfig);
  return this._processRequest(normalizedConfig);
}
```

3. 拦截器链：

```js
// Current
// Interceptor chain building mixed with request logic

// Suggested
class InterceptorChain {
  constructor(request, config) {
    this.request = request;
    this.config = config;
    this.chain = [];
  }

  addRequestInterceptors(interceptors) {
    // Add request interceptors
  }

  addResponseInterceptors(interceptors) {
    // Add response interceptors
  }

  execute() {
    // Execute chain
  }
}
```

这些改进会让代码更易维护、更易测试，同时改进错误处理和关注点分离。

当前测试覆盖不错，但在这些具体方面还可以加强，以确保功能更稳健。建议的新测试和重构机会有助于抓住边界情况，并让代码更易维护。
:::
