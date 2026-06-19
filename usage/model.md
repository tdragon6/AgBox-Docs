# 模型配置
此页面提供完整的模型配置
<Image src="/AgBox-Docs/images/usage/model/model.png" />

## 模型配置卡片
模型配置卡片展示了已有模型配置的 `配置名称`、`提供商名称`、`模型名称`、`在线状态` 和 `更新时间` 信息。

## 搜索
- 支持关键词搜索和在线状态筛选
- 关键词匹配 `模型配置 id`、`模型配置名称`、`提供商 id`、`提供商名称`、`模型名称`、`base_url`

## 新建/编辑模型配置
新建/编辑模型配置提供了步骤引导
### 第一步：输入模型配置名称
<Image src="/AgBox-Docs/images/usage/model/model_config_step_1.png" />

### 第二步：选择提供商
支持搜索
<Image src="/AgBox-Docs/images/usage/model/model_config_step_2.png" />

### 第三步：输入 `base_url` 和 `api_key`
<Image src="/AgBox-Docs/images/usage/model/model_config_step_3.png" />

### 第四步：选择模型
支持搜索
<Image src="/AgBox-Docs/images/usage/model/model_config_step_4.png" />

## 删除模型配置
删除按钮可删除已有模型配置，不会影响已配置模型的数字员工/协调器

## 模型配置初始化
- 进入 `仪表盘 - 工作台` 时若不存在任何模型配置，会弹出模型新建引导
- 若 `AgBox` 服务启动环境的用户目录下存在 `.hermes` 目录且存在在线的模型配置时，系统会自动生成一个模型配置，名称为 `default_local_load`
- 首次设置模型配置时（手动或自动检测），会自动将模型配置应用至两个协调器

