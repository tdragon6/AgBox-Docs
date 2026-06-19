# Skill Management
This page provides complete skill management.
<Image src="/AgBox-Docs/images/usage/skills/skills.png" />

## Field Description
Refer to [Field Description - Skill List](/en/usage/key#skill-list)

## Interface Layout
- The left side displays the skill category list.
- The right side displays the skill list under the selected skill category.

## Search & Sort
- Supports searching by `Skill Name`, `Skill Description`, and `Has Script` fields.
- Supports sorting by `Skill Name` and `Has Script` fields.

## Skill Category List
- The default category `default` is persistent. Skills without a category will be archived here.
- The `+` icon can create a new skill category. Click to pop up the create skill category interface. Fill in the skill category name to create a new category. Categories with the same name cannot be created.
<Image src="/AgBox-Docs/images/usage/skills/skills_category_create.png" />
- Hover the cursor to display edit and delete buttons.
    - The edit button can rename the skill category. Press Enter or lose focus to auto-save. Press Esc to discard editing. Categories with the same name cannot be renamed.
    - The delete button deletes the category. Categories with skills cannot be deleted.
<Image src="/AgBox-Docs/images/usage/skills/skills_category_rename.png" />
- Skill categories in the skill library and each digital employee are independent of each other.

## Skill List
### Import Skill
- Skills with the same name (case-insensitive for skill categories, ensuring skill uniqueness when loaded by the model) cannot be imported. Import overwrite behavior and incorrectly formatted skills are determined by the configuration in [System Settings - Skill List](/en/usage/settings.md#skill-list).
- Upload skill archive files from local to import. Only `zip` format is supported. All skills that conform to the format in the archive will be automatically identified.
<Image src="/AgBox-Docs/images/usage/skills/skills_import_local.png" />

### Skill Marketplace
- Currently, the skill marketplace integrates `skillsmp`.
- For `Field Description`, refer to [Field Description - Skill Marketplace](/en/usage/key#skill-marketplace).
- Click the `Download` button to install skills directly from the skill marketplace. The skill will be installed in the currently selected skill category.
<Image src="/AgBox-Docs/images/usage/skills/skills_import_market.png" />

### View Skill
Skill viewing provides a complete file system just like the workspace, where you can manage skill files, including view, create, rename, edit, delete, move, upload, and download. Click the option button on the right side of the directory tree to perform the corresponding operation. Different node types support different operations:
- `Root Directory`: Supports creating directories, creating files, and uploading files.
- `Subdirectory`: Supports creating directories, creating files, renaming, moving, uploading files, and deleting.
- `File`: Supports renaming, downloading, moving, and deleting.
- `SKILL.md` The `SKILL.md` file under skill management only allows downloading, and the format will be validated when saving content.
#### View File
- Click a file to view its content.
    - Text files will be opened directly with a `vscode`-style editor.
    - Image, gif, and video files can be previewed in the page.
    - Other binary file viewing is not supported.
- The right side is the file content display area. Text files support editing and saving. Saving supports `Ctrl + C` or `Command + C` shortcuts.
<Image src="/AgBox-Docs/images/usage/skills/skills_view.png" />

#### Directory Operations
<Image src="/AgBox-Docs/images/usage/skills/skills_view_dir_operator.png" />

#### Create Directory
<Image src="/AgBox-Docs/images/usage/skills/skills_view_dir_create.png" />

#### Move Operation
<Image src="/AgBox-Docs/images/usage/skills/skills_view_drag.png" />

#### File Operations
<Image src="/AgBox-Docs/images/usage/skills/skills_view_file_operator.png" />

#### Create File
<Image src="/AgBox-Docs/images/usage/skills/skills_view_file_create.png" />

#### Rename
<Image src="/AgBox-Docs/images/usage/skills/skills_view_file_rename.png" />

#### Upload File
<Image src="/AgBox-Docs/images/usage/skills/skills_view_dir_upload.png" />

### Delete Skill
Supports deleting/batch deleting skills (skill library and each digital employee are independent).

### Export Skill
Supports exporting skills to local in `zip` archive format.
