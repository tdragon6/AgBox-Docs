# Field Description
This document introduces the field meanings and descriptions of each module.

## Inbox
- `Employee Name`: The source of the notification message, i.e., the digital employee/coordinator name.
- `Notification Type`:
    - `Employee Upgrade`: Notification message when a digital employee's rank or quality is upgraded.
    - `Task Completion`: Notification message when a task is completed. Notifications are sent when tasks end with `finished`, `interrupt`, and `failed` statuses.
- `Task Message`: The task input message that triggered the notification.
- `Task/Upgrade Status`: `Employee Upgrade` type messages are divided into `Employee Rank` and `Employee Quality`. `Task Completion` type messages display the corresponding `Task Status`.
- `Whether Read`: Initially unread, updated to read after viewing.
- `Creation Time`: Notification message creation time.
- `Update Time`: Initially the creation time, updated after being read.

## Digital Employee
- `Employee Name`: The name and avatar of the digital employee.
- `Employee Description`: Digital employee description. The coordinator will determine whether to delegate tasks to this digital employee based on this description.
- `Employee Author`: Digital employee author. If this field does not exist when reading, it will be displayed as `Anonymous`. When creating a digital employee, it is automatically set to the currently configured username.
- `Employee Department`: The department the digital employee belongs to.
- `Employee Rank`: `L1` - `L9`, ranks gradually increase from left to right.
- `Employee Quality`: `Common`, `Advanced`, `Rare`, `Epic`, and `Legendary`. Quality gradually increases from left to right.
- `Creation Time`: Digital employee creation time.
- `Update Time`: Digital employee update time.

## Task Management
### Task List
- `Task Message`: The input prompt message of the task.
- `Priority`: `P1`, `P2`, `P3`, `P4`. Priority gradually decreases from left to right.
- `Trigger Source`:
    - `user`: Tasks dispatched by users.
    - `scheduler`: Tasks dispatched by the scheduler.
- `Task Status`:
    - `pending`: Waiting (queued tasks)
    - `running`: Running
    - `finished`: Completed
    - `interrupt`: Task interrupted (usually tasks cancelled manually or during service shutdown cleanup process)
    - `failed`: Task failed
- `Creation Time`: Empty when the task is created, updated to the current time when the task starts executing.
- `Update Time`: Task update time.
- `Task Type`: This field is not displayed on the `Session Task` page, and search and sorting are not supported on the `Session Task` page either.
    - `Session Task`: Session-type tasks
    - `Synchronous Coordinator`: Project-type tasks planned by the synchronous coordinator
    - `Asynchronous Coordinator`: Project-type tasks planned by the asynchronous coordinator
- `Employee Name`: All digital employees involved in task execution. This field is not displayed on the `Session Task` page, and search and sorting are not supported on the `Session Task` page either.

### Task Message
- `Task Message`: Each step message during task execution.
- `Message Role`:
    - `user`: Messages input by users/external sources
    - `assistant`: Result-type messages returned by the model
    - `tool`: Tool call type messages
- `Creation Time`: Message creation time.
- `Reasoning Content`: Model reasoning content.

## Project List
- `Project Name`: Project name.
- `Project Description`: Project description.
- `Project Involved Digital Employees`: Digital employees involved in the current project.
- `Project Historical Involved Digital Employees`: Digital employees historically involved in the project, including those removed from the project.
- `Creation Time`: Project creation time.
- `Update Time`: Project update time.

## Scheduled Task
- `Task Name`: Task name.
- `Task Description`: Task description.
- `Employee Name`: Digital employees/coordinators participating in the scheduled task.
- `Mount Target`: The object the scheduled task is mounted to, project or session.
- `Task Message`: The input prompt message when the scheduled task executes.
- `Priority`: The execution priority of the scheduled task.
- `Project Task`: Whether this scheduled task is a project task.
- `Paused`: Whether the scheduled task is in a paused state.
- `Scheduled Time`: The execution time period expression of the scheduled task, compatible with linux crontab expressions, format is `* * * * *`, from left to right: second, minute, hour, day, month, week.
- `Creation Time`: Scheduled task creation time.
- `Update Time`: Scheduled task update time.
- `Next Time`: The next execution time of the scheduled task.

## Skill List
- `Skill Name`: Skill name.
- `Skill Description`: Skill description. The model will determine whether to use this skill based on this description.
- `Skill Category`: The category the skill belongs to.
- `Has Script`: Whether the skill has a script.

## Skill Marketplace
- Table fields:
    - `Skill Name`: Skill name.
    - `Author`: Skill author.
    - `Skill Description`: Skill description. The model will determine whether to use this skill based on this description.
    - `Github Address`: Skill source Github repository address.
    - `Source Address`: Skill source address.
    - `Likes`: Skill like count.
    - `Update Time`: Skill update time.
- Search fields:
    - `Keyword`: Skill search keyword.
    - `Skill Category`: The category the skill belongs to, corresponding to the `category` field of `skillsmp`.
    - `Occupation Category`: The occupation category the skill belongs to, corresponding to the `occupation` field of `skillsmp`.
- For field details, refer to: [skillsmp api documentation](https://skillsmp.com/docs/api){target="_self"}
