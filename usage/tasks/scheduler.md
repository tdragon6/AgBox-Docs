# 定时任务
此页面提供完整的定时任务管理
<Image src="/AgBox-Docs/images/usage/tasks/scheduler/tasks_scheduler.png" />

## 字段说明
参考 [字段说明 - 定时任务](/usage/key#定时任务)

## 搜索排序
- 支持按 `任务名称`、`任务描述`、`员工名称`、`挂载对象`、`优先级`、`项目任务`、`任务消息`、`暂停`、`创建时间`、`更新时间` 和 `下次时间` 字段搜索，`优先级` 可多选
- 支持按 `任务名称`、`员工名称`、`挂载对象`、`优先级`、`项目任务`、`暂停`、`创建时间`、`更新时间` 和 `下次时间` 字段排序

## 新建定时任务
填写相应字段，选择挂载对象（项目/任务）即可新建定时任务
<Image src="/AgBox-Docs/images/usage/tasks/scheduler/tasks_scheduler_create.png" />

## 查看定时任务
可随时查看和编辑定时任务信息
<Image src="/AgBox-Docs/images/usage/tasks/scheduler/tasks_scheduler_edit.png" />

## 暂停定时任务
可随时暂停或恢复定时任务，
<Image src="/AgBox-Docs/images/usage/tasks/scheduler/tasks_scheduler_paused.png" />

## 删除定时任务
支持删除/批量删除定时任务，运行/等待任务中的定时任务无法删除

## 定时任务执行
- 定时器会按照设置的信息和挂载的对象定时执行任务，任务执行会在 `会话任务` 或 `项目任务` 中显示，`触发来源` 为 `scheduler`
- 例如设置每分钟执行一次任务：`输出 nice`，挂载至 `back` 数字员工的 `test` 会话任务，`会话任务` 显示如下：
<Image src="/AgBox-Docs/images/usage/tasks/scheduler/tasks_scheduler_task.png" />
<Image src="/AgBox-Docs/images/usage/tasks/scheduler/tasks_scheduler_task_result.png" />


## 高级设置
参考 [系统设置 - 定时任务](/usage/settings.md#定时任务)