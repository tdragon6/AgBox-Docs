# env 配置
此文档介绍了 `.env` 文件配置相关说明，文件位置为 `backend/env/.env`

## 字段说明
| 字段                                        | 说明                                |
| --------------------------------------------- | ------------------------------------- |
| AGBOX_HOST                                    | 服务启动地址                    |
| AGBOX_PORT                                    | 服务启动端口                    |
| AGBOX_DEBUG                                   | 是否开启调试模式              |
| AGBOX_TOKEN_EXPIRE_HOUR                       | 认证Token过期时间               |
| AGBOX_USERNAME                                | 用户名                             |
| AGBOX_PASSWORD                                | 密码（加密存储，为空时无法登录AgBox） |
| AGBOX_ROBOTS_MARKET_URL                       | 员工市场索引文件 URL                      |
| AGBOX_SKILLSMP_API_URL                        | skillsmp 技能市场 URL             |
| AGBOX_MAX_IMAGE_SIZE                          | 图片上传大小限制              |
| AGBOX_MAX_FILE_SIZE                           | 文件上传大小限制              |
| AGBOX_LANG                                    | 语言配置（请求类逻辑优先识别前端的语言配置） |
| AGBOX_SKILLS_OVERWRITE                        | 覆盖已存在的技能              |
| AGBOX_SKILLS_FORMAT_CHECK                     | 检查技能格式                    |
| AGBOX_ROBOTS_OVERWRITE                        | 覆盖已存在的数字员工        |
| AGBOX_ROBOTS_FORMAT_CHECK                     | 检查数字员工格式              |
| AGBOX_ROBOTS_CREATE_IMPORT_HERMES_SELF_SKILLS | 导入数字员工时是否安装Hermes官方技能 |
| AGBOX_SCHEDULER_MAX_JOBS                      | 定时器最大任务数              |
| AGBOX_SCHEDULER_COALESCE                      | 定时器处理错过的任务        |
| AGBOX_SCHEDULER_MAX_INSTANCES                 | 定时器单任务最大实例数     |