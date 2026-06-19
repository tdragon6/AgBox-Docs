# 顶部菜单
顶部菜单常驻，提供一些常用的快捷操作
<Image src="/AgBox-Docs/images/usage/navbar/navbar.png" />

## 新建任务
顶部菜单提供了快捷的新建任务按钮，可以在任何浏览位置快速新建任务

### 优先级选择
排队中的任务会根据优先级情况优先进入执行队列，任务创建后可在 `pending` 阶段随时修改

### 会话任务
Tab页切换至 `会话任务`，选择对应数字员工和对应会话后即可新建 `会话任务`
<Image src="/AgBox-Docs/images/usage/tasks/create/tasks_create_session_select.png" />

### 项目任务
Tab页切换至 `项目任务`，选择协调器类型和对应项目后即可新建 `项目任务`
<Image src="/AgBox-Docs/images/usage/tasks/create/tasks_create_project_select.png" />

### 任务输入
- `@` 可选择任务需提及的数字员工，此功能仅在 `项目任务` 中有效，例如：`@back 让该员工开发一个xxx后端代码`，协调器仅会委派任务给被提及的数字员工
<Image src="/AgBox-Docs/images/usage/tasks/create/tasks_create_mention_robots.png" />
- `#` 可选择需提及的工作空间已有文件，此功能默认过滤了`.git`、`.worktrees`和`.pastes` 等目录和文件，例如：`#xxx.txt 读取这个文件的内容`，AgBox处理时会自动识别被提及的文件及其路径，光标悬浮时可查看完整文件相对路径
<Image src="/AgBox-Docs/images/usage/tasks/create/tasks_create_mention_file.png" />
- `/` 斜杠命令提供常用的快捷命令
    - `clear`：清空当前输入框
<Image src="/AgBox-Docs/images/usage/tasks/create/tasks_create_mention_slash.png" />
- 截图或剪贴版图片可直接在输入框中粘贴，图片会上传至工作空间的 `.pastes` 目录，图片上传成功后会在输入框上方显示图片预览，同时输入框会自动插入图片文件提及，光标悬浮可放大预览图片
<Image src="/AgBox-Docs/images/usage/tasks/create/tasks_create_paste.png" />

### 底部操作
- 点击 `发送` 或输入框内回车即可提交任务
- `清空` 图标可清空当前输入框内容
- `文件夹` 图标可打开工作空间

### 工作空间
- 工作空间提供了完整的文件系统，可以在其中管理项目文件，包括查看、新建、重命名、编辑、删除、移动、上传和下载等，工作空间各文件类操作与 `技能管理` 中一致，详情请参考 [技能管理 - 查看技能](/usage/skills.md#查看技能)
<Image src="/AgBox-Docs/images/usage/tasks/create/tasks_create_workspace.png" />
- 工作空间左上角刷新按钮旁下载按钮可以 `zip` 压缩包形式导出整个项目空间至本地
- 工作空间支持图片预览
<Image src="/AgBox-Docs/images/usage/tasks/workspace/tasks_workspace_image.png" />
- 工作空间支持 gif 预览
<Image src="/AgBox-Docs/images/usage/tasks/workspace/tasks_workspace_gif.gif" />
- 工作空间支持视频预览
<Image src="/AgBox-Docs/images/usage/tasks/workspace/tasks_workspace_video.gif" />
- 工作空间目录路径为：`~/.agbox_workspace`

### 队列说明
为了确保会话和项目文件的一致性，满足一定条件的任务同一时间只能存在一个在运行中
- `会话任务`：同一数字员工同一会话同一时间只能有一个任务在运行，后续下发的任务会依次排队等待
- `项目任务`：同一项目同一时间只能有一个任务在运行（同步和异步协调器共享队列），后续下发的任务会依次排队等待

## 收件箱
顶部菜单提供收件箱快捷查看、跳转和未读消息个数提醒，点击后可快速跳转至收件箱对应数字员工消息页面，详情请参考 [收件箱](/usage/inbox.md)
<Image src="/AgBox-Docs/images/usage/inbox/inbox_navbar.png" />

## 杂项
- `切换语言`：提供中文和英语两种语言，可自由切换
- `切换主题`：提供亮色和暗色两种主体，可自由切换
- `全屏模式`：提供全屏模式
- `头像下拉菜单`：点击后可访问相关链接和注销