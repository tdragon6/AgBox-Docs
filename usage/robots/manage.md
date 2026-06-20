# 员工管理
此页面提供完整的数字员工管理
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage.png" />

## 字段说明
参考 [字段说明 - 数字员工](/usage/key#数字员工)

## 搜索排序
- 支持按 `员工名称`、`员工描述`、`员工部门`、`员工等级`、`员工品质`、`员工作者`、`创建时间` 和 `更新时间` 字段搜索，`员工等级` 和 `员工品质` 可多选
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_search_quality.png" />
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_search_date.png" />
- 支持按 `员工名称`、`员工部门`、`员工等级`、`员工品质`、`员工作者`、`创建时间` 和 `更新时间` 字段排序

## 新建员工
填写相应字段并选择已有模型配置即可创建，模型配置支持搜索
- `推理程度`：`none`、`minimal`、`low`、`medium`、`high`、`xhigh`，模型推理程度从左至右逐渐增加
- `最大轮数`：设置Agent Loop时调用工具的最大轮数
- 同名数字员工无法创建
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_create.png" />

## 导入员工
导入数字员工分为 `本地导入` 和 `从 Github 导入` 两种，选择已有模型配置后即可导入，模型配置支持搜索
- 同名的数字员工无法导入，导入覆盖行为、格式错误的数字员工和导入时是否安装Hermes官方技能根据 [系统设置 - 数字员工](/usage/settings.md#数字员工) 中的配置决定导入行为
- `本地导入`：从本地上传数字员工压缩包文件导入，仅支持 `zip` 格式，自动识别压缩包内所有符合格式的数字员工
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_import_local.png" />
- `从 Github 导入`：从 Github 社区导入数字员工，输入合法的社区数字员工仓库子路径，合法的仓库子路径类似：`https://raw.githubusercontent.com/tdragon6/AgBox-Market/tree/main/code-security-audit`
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_import_github.png" />

## 查看员工
### 员工信息
可随时查看和编辑员工信息，并修改对应数字员工模型配置
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_view_detail.png" />

### 员工技能
可对员工技能进行管理并支持员工级别的技能分类（和技能库及其他数字员工独立），员工技能管理与技能库类似，参考 [技能管理](/usage/skills.md)
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_view_skills.png" />
- 支持从技能库导入/批量导入技能，从技能库导入界面上方会显示当前待导入的数字员工和目录分类，在此页面也可便捷直接操作管理技能库
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_view_skills_import.png" />

### 员工规则
数字员工工作时应当遵循的上下文规则，这里便于管理，`hermes-agent` 使用内置的 `soul.md`，支持查看和编辑，支持 `Ctrl + C` 或 `Command + C` 快捷键
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_view_rule.png" />

### 员工记忆
数字员工工作时积累的记忆内容，支持查看和编辑，支持 `Ctrl + C` 或 `Command + C` 快捷键
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_view_memory.png" />

### 员工配置
数字员工配置内容，`hermes-agent` 对应 `config.yaml`，支持查看和编辑，支持 `Ctrl + C` 或 `Command + C` 快捷键
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_view_config.png" />

### 员工环境变量
数字员工环境变量内容，`hermes-agent` 对应 `.env`，一般存放模型密钥等信息，支持查看和编辑，支持 `Ctrl + C` 或 `Command + C` 快捷键
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_view_env.png" />

## 克隆员工
输入新数字员工名称后即可复制已有数字员工，新员工会继承所有员工信息、技能、规则、记忆和配置内容
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_clone.png" />

## 删除员工
支持删除/批量删除数字员工，删除时会同步：
- 删除对应会话任务，删除会话类任务工作目录
- 删除项目类任务中的数字员工记录
- 删除项目中的数字员工记录
- 删除收件箱相关通知
- 运行/等待任务和存在定时会话任务的数字员工无法删除
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_delete.png" />

## 导出员工
支持导出数字员工至本地，为 `zip` 压缩格式，只会导出员工信息、技能、规则和记忆等非敏感配置内容，不会导出本地该数字员工的配置和env文件，导出后可安全分发

## 员工头像
支持上传数字员工头像，头像仅支持 `png` 格式，表格记录中点击数字员工头像即可打开上传页面
<Image src="/AgBox-Docs/images/usage/robots/manage/robots_manage_upload_avatar.png" />
