# Project Task
This page provides complete project task management.
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project.png" />

## Field Description
Refer to [Field Description - Task List](/en/usage/key#task-list)

## Interface Layout
- The left side displays the project list with advanced filtering support.
- The right side displays the `Task List`, `Task Message`, and `Model Consumption` content of the selected project, switchable via tabs.

## Search & Sort
- For search and sorting, refer to [Session Task - Search & Sort](/en/usage/dashboard/tasks/session#search-sort).
- Search additionally supports `Task Type` and `Employee Name` fields, both support multiple selection.
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_search_task_type.png" />
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_search_robots_select.png" />
- Sorting additionally supports `Task Type`.

## Project List
### Create Project
- The `+` icon can create a new project. Click to pop up the create project interface. Fill in the corresponding fields to create a new project.
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_create.png" />
- You can add digital employees to the project or remove digital employees from the project.
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_create_robots_add.png" />

### Edit Project
When hovering the cursor, an edit icon is displayed. Click to pop up the edit project interface. Modify the corresponding fields to edit the project.
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_edit.png" />

### Delete Project
- When hovering the cursor, a delete icon is displayed. Click to delete the project. When deleting, the following will be synchronized:
    - Delete historical digital employee/coordinator sessions
    - Delete task records
    - Delete project records
    - Clean up corresponding working directories
    - Projects with running/waiting tasks or mounted scheduled tasks cannot be deleted.

### Advanced Search
- The `Filter` icon can open the advanced search interface to query the project list based on conditions.
- For `Field Description`, refer to [Field Description - Project List](/en/usage/key#project-list).
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_search.png" />

## Task List
### Employee Selection
- The dropdown menu can select the digital employee/coordinator to view information (messages and model consumption, etc.) for the current project.
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_robots_select.png" />

### Create Task
- For usage, refer to [Top Menu - Create Task](/en/usage/navbar.md#create-task).
- This automatically identifies the corresponding project, eliminating the need to select between `Session Task` and `Project Task` in the quick create task box.
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_create.png" />
- In project tasks, you can mention digital employees, for example, have `back` output hi.
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_create_mention.png" />
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_sync_view_result_mention.png" />

### Modify Priority
Refer to [Session Task - Modify Priority](/en/usage/tasks/session#modify-priority).

### View Task
- Refer to [Session Task - View Task](/en/usage/tasks/session#view-task).
- Project tasks add options and information viewing for both coordinators.
#### Case Display
<br>

##### Asynchronous Coordinator
- The task input is `Implement a simple front-end and back-end separated student management system`. The digital employees are `back` (backend development), `front` (frontend development), `test` (functional testing).
- The coordinator will asynchronously delegate corresponding tasks to the appropriate digital employees for execution, and finally aggregate the results.
- Task result:
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_async_view_result.png" />
- Coordinator message (current task):
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_async_view_message.png" />
- `back` message (current task):
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_async_view_message_back.png" />
- `front` message (current task):
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_async_view_message_front.png" />
- `test` message (current task):
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_async_view_message_test.png" />

##### Synchronous Coordinator
- The task input is `Implement a simple front-end and back-end separated library management system`. The digital employees are `back` (backend development), `front` (frontend development), `test` (functional testing).
- The coordinator will synchronously delegate corresponding tasks to the appropriate digital employees for execution, and finally aggregate the results.
- Task result:
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_sync_view_result_1.png" />
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_task_sync_view_result_2.png" />



### Cancel Task
Refer to [Session Task - Cancel Task](/en/usage/tasks/session#cancel-task).

## Task Message
This displays the full message list (all tasks) of the corresponding project and corresponding digital employee.
- For field meanings, refer to [Field Description - Task Message](/en/usage/key#task-message).
- Supports `Message Role` and `Task Message` search, where `Message Role` supports multiple selection.
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_sync_message.png" />

## Model Consumption
Statistics of the total model consumption for the corresponding project and corresponding digital employee.
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_sync_cost.png" />

## Workspace
The `Folder` icon in the upper right corner can open the workspace of the current project. For usage, refer to [Top Menu - Create Task - Workspace](/en/usage/navbar.md#workspace).
<Image src="/AgBox-Docs/images/usage/tasks/project/tasks_project_workspace.png" />
