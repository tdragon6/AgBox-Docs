# Env Configuration
This document introduces the configuration details of the `.env` file. The file location is `backend/env/.env`.

## Field Description
| Field                                        | Description                                |
| --------------------------------------------- | ------------------------------------- |
| AGBOX_HOST                                    | Service startup address                    |
| AGBOX_PORT                                    | Service startup port                    |
| AGBOX_DEBUG                                   | Whether to enable debug mode              |
| AGBOX_TOKEN_EXPIRE_HOUR                       | Authentication Token expiration time               |
| AGBOX_USERNAME                                | Username                             |
| AGBOX_PASSWORD                                | Password (encrypted storage, cannot log in to AgBox when empty) |
| AGBOX_ROBOTS_MARKET_URL                       | Employee marketplace index file URL                      |
| AGBOX_SKILLSMP_API_URL                        | skillsmp skill marketplace URL             |
| AGBOX_MAX_IMAGE_SIZE                          | Image upload size limit              |
| AGBOX_MAX_FILE_SIZE                           | File upload size limit              |
| AGBOX_LANG                                    | Language configuration (request logic prioritizes the frontend language configuration) |
| AGBOX_SKILLS_OVERWRITE                        | Overwrite existing skills              |
| AGBOX_SKILLS_FORMAT_CHECK                     | Check skill format                    |
| AGBOX_ROBOTS_OVERWRITE                        | Overwrite existing digital employees        |
| AGBOX_ROBOTS_FORMAT_CHECK                     | Check digital employee format              |
| AGBOX_ROBOTS_CREATE_IMPORT_HERMES_SELF_SKILLS | Whether to install Hermes official skills when importing digital employees |
| AGBOX_SCHEDULER_MAX_JOBS                      | Maximum number of scheduler tasks              |
| AGBOX_SCHEDULER_COALESCE                      | Whether the scheduler processes missed tasks        |
| AGBOX_SCHEDULER_MAX_INSTANCES                 | Maximum number of instances per scheduler task     |
