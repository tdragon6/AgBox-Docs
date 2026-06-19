# Community Ecosystem
This document introduces the AgBox digital employee community ecosystem.

## Employee Format
The `AgBox` digital employee community ecosystem defines a relatively universal digital employee directory organization structure and file format.
- The root directory name must be the same as the digital employee name
- Must contain a `skills` directory; if no skills are needed, the directory can be empty
- Must contain a `memories` directory with a `MEMORY.md` file inside; initially no memory, content is empty
- Must contain a `SOUL.md` file, which records the rules and behaviors the digital employee should follow
- May contain an `avatar.png` file for the digital employee avatar
- Must contain a `robots.json` file, which records the digital employee information, including name, description, author, department, rank, quality, experience, creation time, and update time. When the author field does not exist, the author will be displayed as `Anonymous` after importing the digital employee. Experience is initially 0.
```json
{
    "name": "back",
    "description": "Backend Development",
    "author": "tdragon6",
    "department": "agbox",
    "rank": "L1",
    "quality": "common",
    "exp": 0,
    "created_time": "2026-06-09 09:46:57",
    "updated_time": "2026-06-09 09:46:57"
}
```
- Must contain a `LICENSE` file, which records the license information of the digital employee, and the license of the digital employee must be `MIT License` for the official marketplace to distribute the digital employee.
- If any third-party `LICENSE` information is involved, it must be recorded in the `THIRD_PARTY_LICENSES.md` file.
- May contain a `README.md` file, which records the digital employee's related information
- The complete directory structure example is as follows:
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

## Employee Marketplace
Currently, all marketplaces use `Github` repositories for hosting.
### Official Marketplace
Refer to [Employee Marketplace](/en/usage/robots/market).
- Official digital employee marketplace: [https://github.com/tdragon6/AgBox-Market](https://github.com/tdragon6/AgBox-Market). Community contributions of digital employees are welcome. To ensure security, reviewed digital employees will be merged into the marketplace repository.
- `Index List`: The `robots.json` file in the repository root directory records the search information of all digital employees merged into the official marketplace, including name, description, author, department, rank, quality, experience, creation time, update time, digital employee repository address, and avatar address.
- When contributing digital employees to the community, the repository directory organization structure and file format described in `Employee Format` should be satisfied.

### Community Marketplace
- You can maintain your own digital employee marketplace for community use, just by satisfying the organization form of the `Official Marketplace` (i.e., the `robots.json` index file in the repository root directory and each digital employee repository).
- The directory organization structure and file format of a single digital employee repository should meet the requirements described in `Employee Format`.
- The `robots.json` index file format in the root directory should be the same as the `robots.json` index file format in the `Official Marketplace` root directory.
- Users only need to modify `AGBOX_ROBOTS_MARKET_URL` in the `.env` file to the community marketplace repository address.

### Single Employee Distribution
Single employee distribution is always designed based on the `Github` repository form.
- You can host your own digital employees in any `Github` repository, just by satisfying the repository directory organization structure and file format described in `Employee Format`.
- When using, enter the corresponding digital employee repository address in the `Import from Github` function, and submit to import. Refer to [Digital Employees - Import Employee](/en/usage/robots/manage#import-employee)
