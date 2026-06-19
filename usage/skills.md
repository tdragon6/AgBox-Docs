# 技能管理
此页面提供完整的技能管理
<Image src="/AgBox-Docs/images/usage/skills/skills.png" />

## 字段说明
参考 [字段说明 - 技能列表](/usage/key#技能列表)

## 界面布局
- 左侧显示技能分类列表
- 右侧为已选择技能分类下的技能列表

## 搜索排序
- 支持按 `技能名称`、`技能描述` 和 `是否存在脚本` 字段搜索
- 支持按 `技能名称` 和 `是否存在脚本` 字段排序

## 技能分类列表
- 常驻默认分类 `default`，没有分类的技能会归档至此处
- `+` 图标可新建技能分类，点击后弹出新建技能分类界面，填写技能分类名称后即可新建分类，同名技能分类无法新建
<Image src="/AgBox-Docs/images/usage/skills/skills_category_create.png" />
- 光标悬浮可显示编辑和删除按钮
    - 编辑按钮可重命名技能分类名称，回车或光标失焦自动保存，Esc 丢弃编辑，同名技能分类无法重命名
    - 删除按钮删除分类，当技能分类下存在技能时无法删除
<Image src="/AgBox-Docs/images/usage/skills/skills_category_rename.png" />
- 技能库和各数字员工间技能分类均互相独立

## 技能列表
### 导入技能
- 同名（不区分技能分类，确保模型加载时技能唯一）的技能无法导入，导入覆盖行为和格式错误的技能根据 [系统设置 - 技能列表](/usage/settings.md#技能列表) 中的配置决定导入行为
- 从本地上传技能压缩包文件导入，仅支持 `zip` 格式，自动识别压缩包内所有符合格式的技能
<Image src="/AgBox-Docs/images/usage/skills/skills_import_local.png" />

### 技能市场
- 目前技能市场集成 `skillsmp`
- `字段说明` 参考 [字段说明 - 技能市场](/usage/key#技能市场)
- 点击 `下载` 按钮可直接从技能市场安装技能，技能安装所在分类为当前已选择的技能分类
<Image src="/AgBox-Docs/images/usage/skills/skills_import_market.png" />

### 查看技能
技能查看提供了与工作空间一样完整的文件系统，可以在其中管理技能文件，包括查看、新建、重命名、编辑、删除、移动、上传和下载等，点击目录树右侧选项按钮可以进行对应操作，不同的节点类型支持不同的操作：
- `根目录`：支持新建目录、新建文件和上传文件
- `子目录`：支持新建目录、新建文件、重命名、移动、上传文件和删除
- `文件`：支持重命名、下载、移动和删除
- `SKILL.md` 技能管理下的 `SKILL.md` 文件只允许下载，且保存内容时会校验格式
#### 查看文件
- 点击文件可查看文件内容
    - 文本文件会直接用 `vscode` 风格编辑器打开
    - 图片、gif和视频文件可在页面中预览
    - 不支持其他二进制文件查看
- 右侧为文件内容显示区域，文本文件支持编辑保存，保存支持 `Ctrl + C` 或 `Command + C` 快捷键
<Image src="/AgBox-Docs/images/usage/skills/skills_view.png" />

#### 目录操作
<Image src="/AgBox-Docs/images/usage/skills/skills_view_dir_operator.png" />

#### 新建目录
<Image src="/AgBox-Docs/images/usage/skills/skills_view_dir_create.png" />

#### 移动操作
<Image src="/AgBox-Docs/images/usage/skills/skills_view_drag.png" />

#### 文件操作
<Image src="/AgBox-Docs/images/usage/skills/skills_view_file_operator.png" />

#### 新建文件
<Image src="/AgBox-Docs/images/usage/skills/skills_view_file_create.png" />

#### 重命名
<Image src="/AgBox-Docs/images/usage/skills/skills_view_file_rename.png" />

#### 上传文件
<Image src="/AgBox-Docs/images/usage/skills/skills_view_dir_upload.png" />

### 删除技能
支持删除/批量删除技能（技能库与各数字员工独立）

### 导出技能
支持导出技能至本地，为 `zip` 压缩格式