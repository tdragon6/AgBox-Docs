# 会话任务
此页面提供完整的会话任务管理
<Image src="/AgBox-Docs/images/usage/tasks/session/tasks_session.png" />

## 字段说明
参考 [字段说明 - 任务列表](/usage/key#任务列表)

## 界面布局
- 左侧显示已选择数字员工的所有会话（不包含项目任务中协调器调度数字员工执行的会话）
- 右侧为已选择数字员工对应会话的 `任务列表`、`任务消息`、`模型消耗` 内容，可通过Tab页切换

## 搜索排序
- 支持按 `任务消息`、`优先级`、`触发来源`、`任务状态`、`创建时间` 和 `更新时间` 字段搜索，`优先级`、`触发来源` 和 `任务状态` 可多选
<Image src="/AgBox-Docs/images/usage/tasks/session/tasks_session_task_search_status.png" />
<Image src="/AgBox-Docs/images/usage/tasks/session/tasks_session_task_search_trigger.png" />
- 支持按 `优先级`、`触发来源`、`任务状态`、`创建时间` 和 `更新时间` 字段排序

## 会话列表
- `+` 图标可新建会话
- 下拉菜单可选择需查看会话的数字员工，支持搜索
<Image src="/AgBox-Docs/images/usage/tasks/session/tasks_session_robots_select.png" />
- 搜索输入框支持搜索会话标题
- 光标悬浮可显示编辑和删除按钮
    - 编辑按钮可重命名会话名称，回车或光标失焦自动保存，Esc 丢弃编辑
    - 删除按钮删除会话并清理对应工作目录
    - 运行/等待任务和存在定时任务挂载的会话无法删除
<Image src="/AgBox-Docs/images/usage/tasks/session/tasks_session_rename.png" />

## 任务列表
### 新建任务
- 使用参考 [顶部菜单 - 新建任务](/usage/navbar.md#新建任务)
- 此处自动识别对应数字员工和会话，省去了快捷新建任务框中 `会话任务` 和 `项目任务` 的选择
<Image src="/AgBox-Docs/images/usage/tasks/session/tasks_session_task_create.png" />

### 修改优先级
若任务在 `pending` 状态时，表格中 `优先级` 列会出现编辑图标，可修改此任务的优先级
<Image src="/AgBox-Docs/images/usage/tasks/session/tasks_session_task_update_priority.png" />

### 查看任务
查看任务分为 `任务结果` 和 `任务消息`，可通过Tab页切换查看
#### 任务结果
查看此次任务的执行结果，渲染为 `markdown` 格式
<Image src="/AgBox-Docs/images/usage/tasks/session/tasks_session_task_view_result.png" />

#### 任务消息
此处显示对应数字员工、对应会话、对应任务的消息列表（当次任务）
- 字段含义参考 [字段说明 - 任务消息](/usage/key#任务消息)
- 支持 `消息角色` 和 `任务消息` 搜索，其中 `消息角色` 可多选
<Image src="/AgBox-Docs/images/usage/tasks/session/tasks_session_task_view_message.png" />

### 取消任务
支持取消/批量取消任务，只有处于 `pending` 或 `running` 状态的任务才可取消
- `pending`：直接删除任务纪录
- `running`：发送信号停止所有涉及的进程组，更新任务状态为：`interrupt`

## 任务消息
此处显示对应数字员工、对应会话的全部消息列表（所有任务）
- 字段含义参考 [字段说明 - 任务消息](/usage/key#任务消息)
- 支持 `消息角色` 和 `任务消息` 搜索，其中 `消息角色` 可多选
<Image src="/AgBox-Docs/images/usage/tasks/session/tasks_session_message.png" />

## 模型消耗
统计对应数字员工、对应会话的模型消耗总和
<Image src="/AgBox-Docs/images/usage/tasks/session/tasks_session_cost.png" />

## 工作空间
右上角 `文件夹` 图标可打开当前数字员工、当前会话的工作空间，使用参考 [顶部菜单 - 新建任务 - 工作空间](/usage/navbar.md#工作空间)
<Image src="/AgBox-Docs/images/usage/tasks/session/tasks_session_workspace.png" />