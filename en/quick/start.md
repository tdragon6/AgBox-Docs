> **Since English is not the author's native language, the English documentation has been AI-assisted translated and may contain errors. If you find the English documentation difficult to understand, please refer to the Chinese version and use translation tools or AI to help with translation and understanding.**

# Quick Start
This document guides you from scratch to quickly set up and use `AgBox`.

## Prerequisites
- Operating System: Linux (`AgBox` was developed with cross-platform considerations, and theoretically can run on any operating system, but has only been tested on Ubuntu 22.04. Other platforms may have compatibility issues.)
- Prerequisites: `git`. Just ensure `git` is installed on the system. The `AgBox` installation script will automatically handle `uv`, `Python`, and other dependencies (completely independent, will not affect the existing environment).
- In the `Asynchronous Coordinator` project task，digital employees/coordinators use the `worktrees` mechanism during execution. It is recommended to set global `email` and `name` for `git`. If this configuration does not exist, the `worktrees` mechanism will be affected. `AgBox` does not automatically configure these settings. (As it may interfere with users' normal git usage, and any changes would be made without the user's awareness.)
```bash
git config --global user.email "<your_email@example.com>"
git config --global user.name "<your_name>"
```
- Network Environment: Ensure your network environment is normal and can access the internet and `Github` properly.

## Install `AgBox`
### One-Click Deployment
Install with a single command, fully automated, finally installed in the `~/.agbox` directory.
```bash
curl -fsSL https://raw.githubusercontent.com/tdragon6/AgBox/refs/heads/main/install.sh | bash
```
- After installation is complete, you can use the `agbox` command to start the `AgBox` service.
<Image src="/AgBox-Docs/images/quick/start/quick_start_agbox.png" />


### Docker Deployment
- Clone the repository to local `~/.agbox`
```bash
git clone https://github.com/tdragon6/AgBox.git ~/.agbox
```
- Enter the `~/.agbox` directory and use `docker.sh` to start the docker service
```bash
cd ~/.agbox
chmod +x docker.sh
./docker.sh --help
```
- The image has built-in common dependencies and environments for Agents to perform routine operations in the container. See `Dockerfile` for details.
- `Docker` mode is only for initial use and experience. The container may lack certain tools or dependencies that the Agent can call. For in-depth use:
    - Modify `Dockerfile` to rebuild an environment that meets your needs
    - Use `One-Click Deployment` or `Manual Deployment` to ensure the runtime environment is local
- Image name: `tdragon6/agbox:latest`
- Note：When starting in Docker mode, if you are not running as the `root` user, you need to run `sudo chown -R 777 <local mounted directory>` each time before you operate the mounted directory, otherwise you may encounter permission issues.

### Manual Deployment
- Ensure `Python` version: `3.11.15` or above
- Clone the repository to local `~/.agbox`
```bash
git clone https://github.com/tdragon6/AgBox.git ~/.agbox
```
- Install `Python` dependencies
```bash
cd ~/.agbox/backend
uv sync     # or pip install -r requirements.txt
```
- Start the `AgBox` service
```bash
cd ~/.agbox/backend
python cli.py --help
```
- Optional: Install the `AgBox` command, refer to the `install_command` function of `install.sh`

### Update `AgBox`
Enter the `~/.agbox` directory and execute `git pull` to update the code
```bash
cd ~/.agbox
git pull
```

## Using `AgBox`
### Set Language
```bash
agbox lang                      # agbox command
./docker.sh lang                # docker mode
python cli.py lang              # manual mode
agbox lang --lang <lang>        # non-interactive mode
```
<Image src="/AgBox-Docs/images/quick/start/quick_start_lang_2.png" />
- The default language is `zh-CN`, supporting both `zh-CN` and `en-US` languages.
<Image src="/AgBox-Docs/images/quick/start/quick_start_lang_1.png" />
- Request logic prioritizes the frontend language configuration.

### Set Username
```bash
agbox username                          # agbox command
./docker.sh username                    # docker mode
python cli.py username                  # manual mode
agbox username --username <username>    # non-interactive mode
```
<Image src="/AgBox-Docs/images/quick/start/quick_start_username.png" />
- The default username is `tdragon6`.

### Set Password
```bash
agbox password                          # agbox command
./docker.sh password                    # docker mode
python cli.py password                  # manual mode
agbox password --password <password>    # non-interactive mode
```
<Image src="/AgBox-Docs/images/quick/start/quick_start_password.png" />
- The default password is empty. You cannot log in to `AgBox` without setting a password.
- The password is encrypted and stored in `backend/env/.env`.

### Start Service
```bash
agbox start                          # agbox command
./docker.sh start                    # docker mode
python cli.py start                  # manual mode
```
- When starting in the foreground, the current configuration information will be printed.
<Image src="/AgBox-Docs/images/quick/start/quick_start_run_1.png" />
<Image src="/AgBox-Docs/images/quick/start/quick_start_run_2.png" />
- `--daemon/-d` parameter: Start the service in background mode without blocking the current terminal.
```bash
agbox start -d
```
- Docker mode does not support the `--daemon/-d` parameter of `AgBox`. Use docker's own background mode.
```bash
./docker.sh -d start
```
<Image src="/AgBox-Docs/images/quick/start/quick_start_run_daemon.png" />

### Stop Service
- In foreground mode, `Ctrl+C` or `Command+C` can stop the service.
- In background mode, use the `stop` subcommand to stop the service (a cleanup process will be performed before exit).
```bash
agbox stop                          # agbox command
python cli.py stop                  # manual mode
```
- Docker background mode uses the container stop command and does not support the `stop` subcommand of `AgBox`.
```bash
docker stop <container_id>
```
- The cleanup process will sequentially:
    - Stop the scheduler
    - Cancel running or waiting tasks
    - Clear the `pid` file
    - Stop the service
