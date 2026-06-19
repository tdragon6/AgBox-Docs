# Scheduled Task
This page provides complete scheduled task management.
<Image src="/AgBox-Docs/images/usage/tasks/scheduler/tasks_scheduler.png" />

## Field Description
Refer to [Field Description - Scheduled Task](/en/usage/key#scheduled-task)

## Search & Sort
- Supports searching by `Task Name`, `Task Description`, `Employee Name`, `Mount Target`, `Priority`, `Project Task`, `Task Message`, `Paused`, `Creation Time`, `Update Time`, and `Next Time` fields. `Priority` supports multiple selection.
- Supports sorting by `Task Name`, `Employee Name`, `Mount Target`, `Priority`, `Project Task`, `Paused`, `Creation Time`, `Update Time`, and `Next Time` fields.

## Create Scheduled Task
Fill in the corresponding fields and select the mount target (project/task) to create a scheduled task.
<Image src="/AgBox-Docs/images/usage/tasks/scheduler/tasks_scheduler_create.png" />

## View Scheduled Task
You can view and edit scheduled task information at any time.
<Image src="/AgBox-Docs/images/usage/tasks/scheduler/tasks_scheduler_edit.png" />

## Pause Scheduled Task
You can pause or resume scheduled tasks at any time.
<Image src="/AgBox-Docs/images/usage/tasks/scheduler/tasks_scheduler_paused.png" />

## Delete Scheduled Task
Supports deleting/batch deleting scheduled tasks. Scheduled tasks in running/waiting status cannot be deleted.

## Scheduled Task Execution
- The scheduler will execute tasks periodically according to the settings and the mounted object. Task execution will be displayed in `Session Task` or `Project Task`, with `Trigger Source` as `scheduler`.
- For example, set a task to execute every minute: `output nice`, mounted to the `test` session task of the `back` digital employee. The `Session Task` displays as follows:
<Image src="/AgBox-Docs/images/usage/tasks/scheduler/tasks_scheduler_task.png" />
<Image src="/AgBox-Docs/images/usage/tasks/scheduler/tasks_scheduler_task_result.png" />


## Advanced Settings
Refer to [System Settings - Scheduled Task](/en/usage/settings.md#scheduled-task)
