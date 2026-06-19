# 协调器
此文档介绍了两个协调器：`同步协调器` 和 `异步协调器` 的工作原理，它们是组成 OPC 框架的核心组件

## 概述
- 协调器是一个任务执行中枢，它不进行任务具体的执行工作，而是规划任务，委派对应任务给相应的数字员工执行，同时在执行过程中协调各个数字员工之间的协作和上下文，当所有任务执行完成后，协调器会总结任务执行结果并返回给用户
- 协调器本质是特殊的数字员工，也存在自身的会话、上下文、配置和记忆
- 项目任务均通过协调器入口进行任务调度和执行
- 协调器任务执行可以自主地把一个复杂的任务分解为多个专业领域的子任务，然后交给专业的数字员工工作，并且协调器和数字员工之间的会话、上下文、配置和记忆等都是独立的

## 同步协调器
`同步协调器` 模拟人类真实调度各个数字员工协作的场景，用一个简单自实现的 `loop` 来模拟人类多次指挥AI直到任务完成的全过程
<Image src="/AgBox-Docs/images/quick/coordinator/sync_coordinator_workflow.png" />
### 概述
- 所处位置：
    - Agents 目录：`store/coordinator/agbox-coordinator-sync`
    - 调度实现：`backend/services/tasks/loop.py`
- 包含一个 `skills`：`planning-with-files`
- 协调器的输入为 json 格式：
```json
{
    "name": {
        "type": "string" | null,
        "description": "null 表示用户消息，其他情况为数字员工名称，表示数字员工回复的消息"
    },
    "message": {
        "type": "string",
        "description": "消息内容，用户消息或数字员工回复的消息内容"
    }
}
```
- 协调器的输出为 json 格式：
```json
{
    "name": {
        "type": "string" | null,
        "description": "null 表示回复用户结果，其他情况为数字员工名称，表示分配任务给某个数字员工"
    },
    "message": {
        "type": "string",
        "description": "回复用户的结果内容或分配给某个数字员工的任务内容"
    },
    "finished": {
        "type": "boolean",
        "description": "当前用户的任务是否已经完成"
    }
}
```
- `loop` 调度处理了 json 的格式修复问题，确保输入输出的 json 格式正确，若不正确，会回调给上一个数字员工/协调器进行检查修改

### 工作原理
举例：`实现一个简单的前后端分离图书管理系统`（项目存在三个数字员工：`back`（后端开发）、`front`（前端开发）、`test`（功能测试））
- 用户提交任务后，消息被封装为：
```json
{"name":null,"message":"实现一个简单的前后端分离图书管理系统"}
```
- 协调器识别用户需求，规划任务，先分配给 `back` 执行：
```json
{
    "name": "back", 
    "message": "请开发一个简单的前后端分离的图书管理系统的后端部分。要求如下：
        1. 技术栈：使用 Python + FastAPI 框架，结合 SQLite 数据库
        2. 实现以下 RESTful API 接口：
        - GET /books - 获取所有图书列表
        - POST /books - 新增图书（包含书名、作者、ISBN、出版日期、简介等字段）
        - GET /books/{book_id} - 获取指定图书详情
        - PUT /books/{book_id} - 更新图书信息
        - DELETE /books/{book_id} - 删除图书
        - GET /books/search?q=keyword - 按关键字搜索图书
        3. 使用 SQLAlchemy 或类似 ORM 进行数据持久化
        4. 实现数据校验和异常处理
        5. 提供自动生成的 API 文档（Swagger UI）
        6. 编写清晰的项目结构，所有代码保存在当前工作目录 /root/.agbox_workspace/20260612_171211_b9688e 下，例如 backend/ 目录
        7. 提供运行说明（README 或注释）
        完成后请告诉我后端服务的启动方式、API 文档地址，以及所有接口的详细说明，便于前端工程师对接。", 
    "finished": false
}
```
- `back` 数字员工执行完成，将结果返回给协调器：
```json
{
    "name":"back",
    "message":"---
        ## 交付总结

        ### 项目结构
        ```
        book_backend/
        ├── app/
        │   ├── __init__.py        # FastAPI 应用工厂 + 启动事件
        │   ├── main.py            # uvicorn 入口（端口 8080）
        │   ├── database.py        # SQLAlchemy 引擎 / Session / Base
        │   ├── models.py          # ORM Book 模型
        │   ├── schemas.py         # Pydantic 请求/响应模型
        │   ├── crud.py            # 数据访问层
        │   ├── exceptions.py      # 业务异常 + 统一异常处理
        │   └── routers/books.py   # /books 路由
        ├── requirements.txt
        ├── README.md
        ├── API.md
        └── .gitignore
        ```

        ### 启动方式
        ```bash
        cd /root/.agbox_workspace/20260612_171211_b9688e/book_backend
        pip install -r requirements.txt
        python3.11 -m app.main
        # 或开发模式（热重载）
        python3.11 -m uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
        ```

        > 默认端口 **8080**（8000 在当前环境被另一个容器服务占用）。如果 8080 也被占用，可改 `--port 9000`。

        ### API 文档地址
        - Swagger UI: **http://localhost:8080/docs**
        - ReDoc: **http://localhost:8080/redoc**
        - OpenAPI JSON: **http://localhost:8080/openapi.json**

        ### 验证结果
        26 个端到端测试全过（CRUD、搜索、唯一性、参数校验、错误路径、分页、OpenAPI）。已 commit 到 `master` (commit `5274bde`)。

        ### 接口清单（详见 `book_backend/API.md`）

        | 方法 | 路径 | 说明 |
        |------|------|------|
        | GET | `/books?skip=0&limit=100` | 图书列表（分页） |
        | GET | `/books/search?q=keyword` | 关键字搜索（书名/作者/ISBN/简介，模糊不区分大小写） |
        | GET | `/books/{book_id}` | 单本图书详情 |
        | POST | `/books` | 新增图书（201） |
        | PUT | `/books/{book_id}` | 局部更新 |
        | DELETE | `/books/{book_id}` | 删除图书 |
        | GET | `/` | 服务自描述 |
        | GET | `/health` | 健康检查 |

        ### 统一响应结构（前端约定）
        ```json
        { "code": 0, "message": "ok", "data": ... }
        ```
        判断成功用 `code === 0`（或 HTTP 2xx）。

        ### Book 数据模型
        | 字段 | 类型 | 必填 | 限制 |
        |------|------|------|------|
        | `id` | int | — | 主键，自增 |
        | `title` | string | 是 | 1-200 字符 |
        | `author` | string | 是 | 1-100 字符 |
        | `isbn` | string | 是 | 10-20 位 `^[0-9Xx\-]{10,20}$`，全局唯一，后端自动去短横线 |
        | `publish_date` | date \| null | 否 | `yyyy-MM-dd` |
        | `description` | string \| null | 否 | ≤ 2000 字符 |
        | `created_at` / `updated_at` | datetime | — | UTC |

        ### 错误码对照
        - 200/201 成功
        - 400 请求体为空 / 数据库错误
        - 404 图书不存在
        - 409 ISBN 重复
        - 422 参数校验失败（Pydantic，错误详情在 `data` 数组里）

        ### 前端对接要点
        - CORS 已放开 `*`，开发期无需代理
        - ISBN 输入可带短横线，后端会规范化；建议前后端展示用同一字符串
        - Swagger UI 可直接在浏览器里调试每个端点
        - 完整 curl 示例和错误响应样例都在 `API.md` 里"
}
```
- 协调器继续分配任务给 `front` 执行：
```json
{
    "name": "front", 
    "message": "请开发一个简单的前后端分离的图书管理系统的前端部分。后端已经由后端工程师完成，请基于以下信息进行对接开发：
        【后端基础信息】
        - 后端项目路径：/root/.agbox_workspace/20260612_171211_b9688e/book_backend
        - 后端服务运行在端口 8080
        - API 文档地址：http://localhost:8080/docs
        - 详细 API 文档：/root/.agbox_workspace/20260612_171211_b9688e/book_backend/API.md（请先阅读此文件了解接口细节）

        【后端 API 接口】
        - GET /books?skip=0&limit=100 - 获取图书列表（分页）
        - GET /books/search?q=keyword - 按关键字搜索（书名/作者/ISBN/简介）
        - GET /books/{book_id} - 获取图书详情
        - POST /books - 新增图书
        - PUT /books/{book_id} - 更新图书
        - DELETE /books/{book_id} - 删除图书

        【前端要求】
        1. 技术栈：建议使用 Vue 3 + Vite + Element Plus（或 React + Ant Design），请自行选择合适的方案
        2. 功能页面：
        - 图书列表页：表格展示，支持搜索、分页、新增、编辑、删除操作
        - 图书详情页/弹窗：展示完整图书信息
        - 新增/编辑图书表单：包含书名、作者、ISBN、出版日期、简介等字段，并做前端校验
        3. 统一响应结构判断：{ code: 0, message: 'ok', data: ... }，成功标志为 code === 0
        4. 错误处理：ISBN 重复(409)、参数校验失败(422)、未找到(404) 等需要友好提示
        5. UI 要求：界面美观、操作流畅、响应式布局
        6. 项目结构清晰，代码保存在当前工作目录 /root/.agbox_workspace/20260612_171211_b9688e 下，建议放在 frontend/ 目录
        7. 提供运行说明（README），包括依赖安装、启动命令、访问地址
        8. 在前端代码中通过 axios 或 fetch 配置后端 API 地址（可通过环境变量配置，默认 http://localhost:8080）

        完成后请告诉我前端项目的启动方式、访问地址，以及如何与后端联调测试。", 
    "finished": false
}
```
- `front` 数字员工执行完成，将结果返回给协调器：
```json
{
    "name":"front",
    "message":"Everything is in place. Here's the summary:
        ✅ 图书管理系统前端已开发完成并提交到 master

        **项目位置**：`/root/.agbox_workspace/20260612_171211_b9688e/book_frontend/`（16 个源文件，976 行 Vue/JS 代码）

        > 注：用户原文 "建议放在 frontend/ 目录"，但 `frontend/` 已被上一任务的学生管理系统占用，所以我新建了 `book_frontend/` 避免冲突，两个系统互不影响。

        **启动方式**

        ```bash
        # 1) 启动后端（端口 8080）
        cd /root/.agbox_workspace/20260612_171211_b9688e/book_backend
        python3 -m venv .venv && source .venv/bin/activate
        pip install -r requirements.txt
        python -m app.main

        # 2) 启动前端（新终端）
        cd /root/.agbox_workspace/20260612_171211_b9688e/book_frontend
        npm install
        npm run dev
        ```

        **访问地址**：<http://localhost:5173/>

        **联调测试**（实测通过 30/30 项 E2E 断言）

        1. 顶栏右上角应显示 **API: 已连接** 🟢（启动时主动调用 `/books?limit=1` 检测）
        2. 点击「新增图书」→ 填写表单 → 提交，列表立即刷新
        3. 搜索框输入「计算机」→ 实时搜索
        4. 点击行的「编辑」→ 修改后保存（PUT 局部更新）
        5. 点击行的「删除」→ ElMessageBox 确认 → 删除成功
        6. 新增时填一个已存在的 ISBN → 自动捕获 409，提示「ISBN 已存在」
        7. 留空必填 / ISBN 填字母 → 前端拦截，不会发请求
        8. 后端 Swagger：<http://localhost:8080/docs>

        **已验证的真实工具输出**

        | 验证项 | 结果 |
        |--------|------|
        | `npm install` | 82 packages added in 35s |
        | `npm run build` | ✓ built in 6.76s（1660 modules，49KB gzipped CSS） |
        | Vite dev server | HTTP 200 on / + 全模块图 |
        | Vite 代理 | `/api/books` → `http://localhost:8080/books` 正确转发 |
        | 端到端 E2E（真实后端） | **30/30 通过**：list / create / detail / update（局部+全量） / delete / search / 409 / 422 / 404 |
        | 字段错误回显 | 422 Pydantic 错误数组 → `fieldErrors[]` → 表单字段回显 |
        | ISBN 规范化 | 提交 `978-7-115-32131-0` → 后端存储为 `9787115321310`（已在 UI 提示用户） |

        **关键设计决策**
        - **axios 拦截器**：统一处理 `{code, message, data}`，业务码 0 → resolve data，其他 → reject 带 code & payload
        - **Vite 代理**：`/api/*` → `http://localhost:8080`，前端代码用相对路径，无需 CORS 配置
        - **环境变量**：`.env.development` 默认 `/api` 走代理；`.env.production` 直连 `http://localhost:8080`；`VITE_API_TARGET` 可覆盖代理目标
        - **错误友好提示**：422 时优先展示第一条字段错误（更精准），并自动调用 `validateField` 把后端错误回显到对应表单项
        - **统一响应式**：移动端 640px 断点，工具栏/分页自适应

        **Git 状态**
        ```
        * bd71e54 feat(book_frontend): 图书管理系统前端 SPA (Vue 3 + Vite + Element Plus)
        * 5274bde feat(book_backend): 图书管理系统后端 API (FastAPI + SQLAlchemy)
        ```
        后端 commit 在前，前端 commit 在后，master 上的两个系统（学生 + 图书）都已就绪。"
}
```
- 协调器继续分配任务给 `test` 执行：
```json
{
    "name": "test", 
    "message": "请对图书管理系统进行功能测试。后端和前端都已开发完成，请执行完整的端到端测试：
        【项目位置】
        - 后端：/root/.agbox_workspace/20260612_171211_b9688e/book_backend
        - 前端：/root/.agbox_workspace/20260612_171211_b9688e/book_frontend

        【后端服务信息】
        - 启动命令：cd book_backend && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && python -m app.main
        - 端口：8080
        - API 文档：http://localhost:8080/docs
        - 详细 API 文档：/root/.agbox_workspace/20260612_171211_b9688e/book_backend/API.md

        【前端服务信息】
        - 启动命令：cd book_frontend && npm install && npm run dev
        - 访问地址：http://localhost:5173
        - Vite 代理：/api/* → http://localhost:8080

        【测试要求】
        1. 启动后端服务，确认 8080 端口正常监听
        2. 启动前端服务，确认 5173 端口正常监听
        3. 通过 HTTP 请求测试所有后端 API 接口：
        - GET /books - 列表查询
        - POST /books - 新增图书（测试正常数据和异常数据）
        - GET /books/{id} - 详情查询
        - PUT /books/{id} - 更新图书
        - DELETE /books/{id} - 删除图书
        - GET /books/search?q=keyword - 搜索功能
        4. 测试边界场景：
        - ISBN 重复应返回 409
        - 必填字段缺失应返回 422
        - 查询不存在的 ID 应返回 404
        - ISBN 格式校验
        5. 通过浏览器或 curl 访问前端页面，确认页面能正常加载、与后端联通
        6. 生成详细的测试报告，记录每个测试用例的结果（通过/失败），包括：
        - 测试用例编号
        - 测试内容
        - 预期结果
        - 实际结果
        - 状态
        7. 如果发现 Bug，记录具体的复现步骤和错误信息

        请将测试报告保存在 /root/.agbox_workspace/20260612_171211_b9688e/test_report.md 文件中。完成后输出测试结论。", 
            "finished": false
}
```
- `test` 数字员工执行完成，将结果返回给协调器：
```json
{
    "name":"test",
    "message":"全部确认：40 行用例、两个端口已释放、报告 16KB。
        ## 测试结论

        ✅ **全部测试通过：40/40，通过率 100%**

        | 类别 | 通过/总数 |
        | --- | --- |
        | 后端基础 | 3/3 |
        | CRUD 正常流程 | 12/12 |
        | 边界与错误码 | 19/19 |
        | CORS 跨域 | 2/2 |
        | 前端 + Vite 代理 | 4/4 |

        测试覆盖：
        - 后端 6 个 API 端点的完整 CRUD 流程（GET/POST/GET-by-id/PUT/DELETE/SEARCH）
        - 边界场景：必填缺失、ISBN 格式/长度/重复、PUT 空 body、PUT 改 ISBN 冲突、不存在 id 的 GET/PUT/DELETE、search 缺 q / 空 q、title 长度越界、publish_date 格式错、非法分页参数、unsupported method、非数字 id
        - 错误码：400 / 404 / 409 / 422 / 405 全部按 API.md 文档返回
        - CORS：preflight 与实际请求都返回 ACAO
        - 前端 SPA 壳加载、Vite SFC 编译、Vite 代理透传到后端（GET 与 POST 均验证）
        - 前后端 6 个端点契约 100% 对齐

        **未发现阻塞性 Bug**。两个轻微观察项已写入报告：
        1. CORS 中间件对 preflight 回显 origin、对实际请求返回 `*`（不影响功能）
        2. OpenAPI 未在 `update_book` 装饰器中显式声明 400 响应

        **服务已停止**：8080 与 5173 端口均已释放，无遗留进程。

        **测试报告**：`/root/.agbox_workspace/20260612_171211_b9688e/test_report.md`（16 KB，6 大节，含环境说明、40 个用例详细结果表、前端验证、契约对齐表、问题列表、总体评估与结论）"
}
```
- 协调器认为任务完成，输出结果，将 `name` 设为 `null`，`finished` 设为 `true`：
```json
{
    "name": null, 
    "message": "# 图书管理系统开发完成 ✅
        前后端分离的图书管理系统已全部交付并通过完整测试。

        ## 项目结构

        工作目录：`/root/.agbox_workspace/20260612_171211_b9688e/`

        ```
        ├── book_backend/        # 后端项目（FastAPI + SQLAlchemy + SQLite）
        │   ├── app/
        │   │   ├── main.py      # 启动入口（端口 8080）
        │   │   ├── database.py  # 数据库配置
        │   │   ├── models.py    # ORM 模型
        │   │   ├── schemas.py   # Pydantic 模型
        │   │   ├── crud.py      # 数据访问层
        │   │   ├── exceptions.py
        │   │   └── routers/books.py
        │   ├── requirements.txt
        │   ├── README.md
        │   └── API.md           # 详细 API 文档
        │
        ├── book_frontend/       # 前端项目（Vue 3 + Vite + Element Plus）
        │   ├── src/
        │   ├── package.json
        │   └── README.md
        │
        └── test_report.md       # 测试报告（16KB，40个测试用例）
        ```

        ## 启动方式

        **后端**
        ```bash
        cd /root/.agbox_workspace/20260612_171211_b9688e/book_backend
        python3 -m venv .venv && source .venv/bin/activate
        pip install -r requirements.txt
        python -m app.main
        # 访问 http://localhost:8080/docs
        ```

        **前端**
        ```bash
        cd /root/.agbox_workspace/20260612_171211_b9688e/book_frontend
        npm install
        npm run dev
        # 访问 http://localhost:5173
        ```

        ## 核心功能

        - 图书列表（分页、搜索）
        - 新增 / 编辑 / 删除 / 查看详情
        - 字段：书名、作者、ISBN、出版日期、简介
        - ISBN 自动规范化、去重校验
        - 统一响应结构 `{code, message, data}`
        - 完善的错误处理（400/404/409/422）
        - 自动生成 Swagger 文档

        ## 测试结果

        ✅ 40/40 测试用例全部通过，覆盖率 100%
        - 后端 CRUD 完整流程
        - 边界场景与错误码
        - CORS 跨域
        - 前端 + Vite 代理
        - 前后端 6 个端点契约对齐

        详细的测试报告见：`/root/.agbox_workspace/20260612_171211_b9688e/test_report.md`", 
    "finished": true
}
```
- 若 `test` 测试不通过，会返回BUG描述，协调器会委派修复任务给相应数字员工
- 此过程 `同步协调器` 完全模拟了人类先让 `back` 开发后端，再让 `front` 开发前端，最后让 `test` 测试项目的AI应用流程，而此过程完全自主规划和自动完成，且各数字员工间会话、上下文、配置和记忆等完全独立

## 异步协调器
`异步协调器` 接收用户需求，规划任务，处理任务依赖关系，并委派给对应的数字员工执行（通过 `agbox-assign-task` 技能实现），同时处理 git `worktrees` 分支合并相关问题，与 `同步协调器` 的区别是：`异步协调器` 会根据任务情况自动处理任务执行的先后顺序和依赖关系，并行委派执行没有依赖关系的任务
<Image src="/AgBox-Docs/images/quick/coordinator/async_coordinator_workflow.png" />
### 概述
- 所处位置：`store/coordinator/agbox-coordinator-async`
- 包含两个 `skills`：`planning-with-files` 和 `agbox-assign-task`（委派数字员工技能）
- `异步协调器` 充分利用了原生 `Agent loop` 的框架，通过 skills 和工具调用的方式实现数字员工的任务委派和结果总结，类似动态的子Agent模式，只不过相对子Agent，除了上下文，会话、配置和记忆也都是完全独立的，模拟真实的员工

### 工作原理
举例：`实现一个简单的前后端分离学生管理系统`，存在三个数字员工：`back`（后端开发）、`front`（后端开发）、`test`（功能测试）
- 用户提交任务后，`异步协调器` 开始工作
- 规划任务后认为前端和后端可以同时开发：
```markdown
Now let me assign the tasks. I'll start the backend and frontend development in parallel since they need to coordinate on API specifications
```
- 协调器会监控委派任务的进度
```markdown
Both backend and frontend development tasks are now running in parallel. Let me check their progress:
```
- 两位数字员工开发完成后把结果返回给协调器，内容与上述 `同步协调器` 的中数字员工回复消息的 `message` 字段类似
- 协调器发现两个数字员工都已完成任务，委派测试任务给 `test` 数字员工
```markdown
Both backend and frontend are done. Now let me assign the test task:
```
- `test` 数字员工测试完成后把结果返回给协调器
- 协调器根据测试结果，判断是否需要修复BUG，若需要修复BUG则继续委派修复任务给相应数字员工
- 协调器判断任务执行完成，合并分支，清理 `worktrees`
```markdown
All three tasks are complete. Let me verify the final state and clean up worktrees:
All merges are done into master. Let me check if there are any leftover worktrees to clean up:
All files are in place. The worktree subdirectory is empty (already cleaned up by the agents). Let me check if it needs to be removed:
Empty worktrees directory has been removed. Now let me write the final completion report:
```
- 协调器整理最终结果并返回给用户
```markdown
任务全部完成。以下是任务执行总结：

═══════════════════════════════════════════
学生管理系统开发任务完成报告
═══════════════════════════════════════════

✅ 后端开发（back 工程师）
   - Python 3 + Flask + SQLite
   - 完整 CRUD RESTful API（5 个端点）
   - CORS 跨域支持、字段校验、错误处理
   - 文件：app.py、requirements.txt、API.md、README.md
   - 位置：/root/.agbox_workspace/20260612_171211_b9688e/backend/

✅ 前端开发（front 工程师）
   - HTML + CSS + JavaScript + Vue 3（CDN）
   - 玻璃感 UI、响应式设计、表单验证
   - 实现了列表展示、新增/编辑/删除、搜索筛选
   - 处理了与后端的性别字段双向翻译
   - 文件：index.html、styles.css、app.js、README.md
   - 位置：/root/.agbox_workspace/20260612_171211_b9688e/frontend/

✅ 功能测试（test 工程师）
   - 后端 API 测试：27/27 全部通过
   - 前端静态检查：HTML/CSS/JS 全部通过
   - 发现 1 个潜在问题：前端 email REQUIRED 与后端可选不一致
   - 报告：TEST_REPORT.md（12.9 KB）

✅ Git 集成
   - 所有数字员工通过独立 worktree 完成工作
   - 后端、前端已合并到 master 主分支
   - worktree 已清理

启动方式：
- 后端：cd backend && pip install -r requirements.txt && python3.11 app.py（端口 5000）
- 前端：cd frontend && python3 -m http.server 8080（端口 8080）

详细报告见：/root/.agbox_workspace/20260612_171211_b9688e/任务完成报告.md
```

## 其他说明
- `同步协调器` 和 `异步协调器` 只针对项目任务，详细使用说明和预览参考 [项目任务 - 查看任务](/usage/tasks/project#查看任务)
- `同步协调器` 执行相对慢，但相对稳定，`异步协调器` 执行相对快，但相对不稳定
