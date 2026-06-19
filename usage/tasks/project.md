# 项目任务
此页面提供完整的项目任务管理
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project.png" />

## 字段说明
参考 [字段说明 - 任务列表](/usage/key#任务列表)

## 界面布局
- 左侧显示项目列表，支持高级筛选
- 右侧为已选择项目对应的 `任务列表`、`任务消息`、`模型消耗` 内容，可通过Tab页切换

## 搜索排序
- 搜索和排序参考 [会话任务 - 搜索排序](/usage/tasks/session#搜索排序)
- 搜索增加支持 `任务类型` 和 `员工名称` 字段，均可多选
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_search_task_type.png" />
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_search_robots_select.png" />
- 排序增加支持 `任务类型`

## 项目列表
### 新建项目
- `+` 图标可新建项目，点击后弹出新建项目界面，填写相应字段后即可新建项目
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_create.png" />
- 可添加数字员工加入项目或移除项目中的数字员工
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_create_robots_add.png" />

### 编辑项目
光标悬浮时显示编辑图标，点击后弹出编辑项目界面，修改相应字段后即可编辑项目
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_edit.png" />

### 删除项目
- 光标悬浮时显示删除图标，点击后可以删除项目，删除时会同步：
    - 删除历史数字员工/协调器会话
    - 删除任务记录
    - 删除项目记录
    - 清理对应工作目录
    - 运行/等待任务和存在定时任务挂载的项目无法删除

### 高级搜索
- `过滤器` 图标可以打开高级搜索界面，根据条件查询项目列表
- `字段说明` 参考 [字段说明 - 项目列表](/usage/key#项目列表)
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_search.png" />

## 任务列表
### 员工选择
- 下拉菜单可选择当前项目需查看信息（消息和模型消耗等）的数字员工/协调器
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_robots_select.png" />

### 新建任务
- 使用参考 [顶部菜单 - 新建任务](/usage/navbar.md#新建任务)
- 此处自动识别对应项目，省去了快捷新建任务框中 `会话任务` 和 `项目任务` 的选择
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_create.png" />
- 项目任务中可提及数字员工，例如让 `back` 输出 hi
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_create_mention.png" />
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_sync_view_result_mention.png" />

### 修改优先级
参考 [会话任务 - 修改优先级](/usage/tasks/session#修改优先级)

### 查看任务
- 参考 [会话任务 - 查看任务](/usage/tasks/session#查看任务)
- 项目任务增加两个协调器的选项和信息查看
#### 案例展示
<br>

##### 异步协调器
- 任务输入为 `实现一个简单的前后端分离学生管理系统`，数字员工为 `back`（后端开发）、`front`（前端开发）、`test`（功能测试）
- 协调器会异步委派相应任务给对应的数字员工执行，并最终汇总结果
- 任务结果：
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_async_view_result.png" />
- 协调器消息（当前任务）：
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_async_view_message.png" />
- `back` 消息（当前任务）：
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_async_view_message_back.png" />
- `front` 消息（当前任务）：
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_async_view_message_front.png" />
- `test` 消息（当前任务）：
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_async_view_message_test.png" />

##### 同步协调器
- 任务输入为 `实现一个简单的前后端分离图书管理系统`，数字员工为 `back`（后端开发）、`front`（前端开发）、`test`（功能测试）
- 协调器会同步委派相应任务给对应的数字员工执行，并最终汇总结果
- 任务结果：
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_sync_view_result_1.png" />
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_sync_view_result_2.png" />



### 取消任务
参考 [会话任务 - 取消任务](/usage/tasks/session#取消任务)

## 任务消息
此处显示对应项目、对应数字员工的全部消息列表（所有任务）
- 字段含义参考 [字段说明 - 任务消息](/usage/key#任务消息)
- 支持 `消息角色` 和 `任务消息` 搜索，其中 `消息角色` 可多选
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_sync_message.png" />

## 模型消耗
统计对应项目、对应数字员工的模型消耗总和
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_sync_cost.png" />

## 工作空间
右上角 `文件夹` 图标可打开当前项目的工作空间，使用参考 [顶部菜单 - 新建任务 - 工作空间](/usage/navbar.md#工作空间)
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_workspace.png" />
