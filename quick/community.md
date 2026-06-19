# 社区生态
此文档介绍了AgBox的数字员工社区生态

## 员工格式
`AgBox` 数字员工社区生态定义了一套相对通用的数字员工目录组织结构和文件格式
- 根目录名称必须与数字员工名称相同
- 必须包含 `skills` 目录，若不需要技能，目录为空
- 必须包含 `memories` 目录，内部包含 `MEMORY.md` 文件，初始无记忆，内容为空
- 必须包含 `SOUL.md` 文件，这里记录数字员工应遵循的规则和行为
- 可包含 `avatar.png` 文件，放置数字员工头像
- 必须包含 `robots.json` 文件，这里记录数字员工的信息，包括名称、描述、作者、部门、等级、品质、经验、创建时间、更新时间，作者字段不存在时导入数字员工后显示作者为 `Anonymous`，经验初始为 0
```json
{
    "name": "back",
    "description": "后端开发",
    "author": "tdragon6",
    "department": "agbox",
    "rank": "L1",
    "quality": "common",
    "exp": 0,
    "created_time": "2026-06-09 09:46:57",
    "updated_time": "2026-06-09 09:46:57"
}
```
- 必须包含 `LICENSE` 文件，这里记录数字员工的许可证信息，官方市场中的数字员工许可证必须为 `MIT License`，方便社区分发使用
- 若有涉及的第三方 `LICENSE` 信息，则必须在 `THIRD_PARTY_LICENSES.md` 文件中记录
- 可包含 `README.md` 文件，这里记录数字员工的相关说明
- 完整目录结构示例如下：
```plaintext
./
├── avatar.png
├── memories
│   └── MEMORY.md
├── robot.json
├── skills
│   └── back-skills
├── SOUL.md
├── LICENSE
├── THIRD_PARTY_LICENSES.md
└── README.md
```

## 员工市场
目前所有市场均使用 `Github` 仓库托管
### 官方市场
参考 [员工市场](/usage/robots/market)
- 官方数字员工市场：[https://github.com/tdragon6/AgBox-Market](https://github.com/tdragon6/AgBox-Market)，欢迎社区贡献数字员工，为确保安全，经过审核的数字员工会被合入市场仓库
- `索引清单`：仓库根目录下的 `robots.json` 文件记录所有已合入官方市场数字员工的检索信息，包括名称、描述、作者、部门、等级、品质、经验、创建时间、更新时间、数字员工仓库地址和头像地址
- 社区贡献数字员工时应满足 `员工格式` 说明的仓库目录组织结构和文件格式

### 社区市场
- 您可以维护自己的数字员工市场，提供给社区使用，只需满足 `官方市场` 的组织形式即可（即仓库根目录下的 `robots.json` 索引文件和各个数字员工仓库）
- 其中单个数字员工仓库的目录组织结构和文件格式应满足 `员工格式` 说明的要求
- 其中根目录下的 `robots.json` 索引文件格式应与 `官方市场` 根目录下的 `robots.json` 索引文件格式相同
- 用户使用时只需修改 `.env` 文件中的 `AGBOX_ROBOTS_MARKET_URL` 为社区市场仓库地址即可

### 单员工分发
单员工分发设计时永远都基于 `Github` 仓库形式
- 您可以在任何 `Github` 仓库中托管自己的数字员工，只需满足 `员工格式` 说明的仓库目录组织结构和文件格式即可
- 用户使用时在 `从 Github 导入` 功能处输入对应数字员工的仓库地址，提交后即可导入，参考 [数字员工 - 导入员工](/usage/robots/manage#导入员工)
