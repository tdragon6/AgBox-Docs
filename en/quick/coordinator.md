# Coordinator
This document introduces the working principles of two coordinators: the `Synchronous Coordinator` and the `Asynchronous Coordinator`. They are the core components that make up the OPC framework.

## Overview
- The coordinator is a task execution hub. It does not perform the actual execution of tasks, but plans tasks, delegates corresponding tasks to the appropriate digital employees for execution, and coordinates the collaboration and context between various digital employees during execution. When all tasks are completed, the coordinator summarizes the task execution results and returns them to the user.
- The coordinator is essentially a special digital employee, with its own sessions, context, configuration, and memory.
- Project tasks are scheduled and executed through the coordinator entry point.
- The coordinator can autonomously decompose a complex task into multiple specialized sub-tasks, then assign them to specialized digital employees. The sessions, context, configuration, and memory between the coordinator and digital employees are all independent.

## Synchronous Coordinator
The `Synchronous Coordinator` simulates the scenario where humans actually schedule various digital employees to collaborate, using a simple self-implemented `loop` to simulate the entire process of humans directing AI multiple times until the task is completed.
<Image src="/images/quick/coordinator/sync_coordinator_workflow_en.png" />
### Overview
- Location:
    - Agents directory: `store/coordinator/agbox-coordinator-sync`
    - Scheduling implementation: `backend/services/tasks/loop.py`
- Contains one `skill`: `planning-with-files`
- The input of the coordinator is in json format:
```json
{
    "name": {
        "type": "string" | null,
        "description": "null indicates a user message; otherwise it is the digital employee name, indicating a message replied by the digital employee"
    },
    "message": {
        "type": "string",
        "description": "Message content, user message or digital employee reply message content"
    }
}
```
- The output of the coordinator is in json format:
```json
{
    "name": {
        "type": "string" | null,
        "description": "null indicates a reply to the user; otherwise it is the digital employee name, indicating a task assignment to a digital employee"
    },
    "message": {
        "type": "string",
        "description": "The result content replied to the user or the task content assigned to a digital employee"
    },
    "finished": {
        "type": "boolean",
        "description": "Whether the current user task has been completed"
    }
}
```
- The `loop` scheduling handles the json format repair issue, ensuring the correct json format for input and output. If incorrect, it will call back to the previous digital employee/coordinator for inspection and modification.

### Working Principle
Example: `Implement a simple front-end and back-end separated library management system` (the project has three digital employees: `back` (backend development), `front` (frontend development), `test` (functional testing))
- After the user submits the task, the message is encapsulated as:
```json
{"name":null,"message":"Implement a simple front-end and back-end separated library management system"}
```
- The coordinator recognizes the user's requirements, plans the task, and first assigns it to `back` for execution:
```json
{
    "name": "back", 
    "message": "Please develop the backend part of a simple front-end and back-end separated library management system. Requirements are as follows:
        1. Tech stack: Use Python + FastAPI framework with SQLite database
        2. Implement the following RESTful API endpoints:
        - GET /books - Get all books list
        - POST /books - Add a new book (including title, author, ISBN, publish date, description, etc.)
        - GET /books/{book_id} - Get specified book details
        - PUT /books/{book_id} - Update book information
        - DELETE /books/{book_id} - Delete a book
        - GET /books/search?q=keyword - Search books by keyword
        3. Use SQLAlchemy or similar ORM for data persistence
        4. Implement data validation and exception handling
        5. Provide auto-generated API documentation (Swagger UI)
        6. Write a clear project structure, save all code in the current working directory /root/.agbox_workspace/20260612_171211_b9688e, e.g., backend/ directory
        7. Provide running instructions (README or comments)
        After completion, please tell me the backend service startup method, API documentation address, and detailed description of all endpoints for the frontend engineer to integrate.", 
    "finished": false
}
```
- The `back` digital employee completes execution and returns the result to the coordinator:
```json
{
    "name":"back",
    "message":"---
        ## Delivery Summary

        ### Project Structure
        ```
        book_backend/
        ├── app/
        │   ├── __init__.py        # FastAPI application factory + startup events
        │   ├── main.py            # uvicorn entry (port 8080)
        │   ├── database.py        # SQLAlchemy engine / Session / Base
        │   ├── models.py          # ORM Book model
        │   ├── schemas.py         # Pydantic request/response models
        │   ├── crud.py            # Data access layer
        │   ├── exceptions.py      # Business exceptions + unified exception handling
        │   └── routers/books.py   # /books routes
        ├── requirements.txt
        ├── README.md
        ├── API.md
        └── .gitignore
        ```

        ### Startup Method
        ```bash
        cd /root/.agbox_workspace/20260612_171211_b9688e/book_backend
        pip install -r requirements.txt
        python3.11 -m app.main
        # or development mode (hot reload)
        python3.11 -m uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
        ```

        > Default port **8080** (8000 is occupied by another container service in the current environment). If 8080 is also occupied, change `--port 9000`.

        ### API Documentation Address
        - Swagger UI: **http://localhost:8080/docs**
        - ReDoc: **http://localhost:8080/redoc**
        - OpenAPI JSON: **http://localhost:8080/openapi.json**

        ### Verification Results
        All 26 end-to-end tests passed (CRUD, search, uniqueness, parameter validation, error paths, pagination, OpenAPI). Committed to `master` (commit `5274bde`).

        ### Endpoint List (see `book_backend/API.md` for details)

        | Method | Path | Description |
        |------|------|------|
        | GET | `/books?skip=0&limit=100` | Book list (paginated) |
        | GET | `/books/search?q=keyword` | Keyword search (title/author/ISBN/description, fuzzy case-insensitive) |
        | GET | `/books/{book_id}` | Single book details |
        | POST | `/books` | Add a new book (201) |
        | PUT | `/books/{book_id}` | Partial update |
        | DELETE | `/books/{book_id}` | Delete a book |
        | GET | `/` | Service self-description |
        | GET | `/health` | Health check |

        ### Unified Response Structure (frontend convention)
        ```json
        { "code": 0, "message": "ok", "data": ... }
        ```
        Determine success with `code === 0` (or HTTP 2xx).

        ### Book Data Model
        | Field | Type | Required | Constraints |
        |------|------|------|------|
        | `id` | int | — | Primary key, auto-increment |
        | `title` | string | Yes | 1-200 characters |
        | `author` | string | Yes | 1-100 characters |
        | `isbn` | string | Yes | 10-20 digits `^[0-9Xx\-]{10,20}$`, globally unique, backend auto-removes hyphens |
        | `publish_date` | date \| null | No | `yyyy-MM-dd` |
        | `description` | string \| null | No | ≤ 2000 characters |
        | `created_at` / `updated_at` | datetime | — | UTC |

        ### Error Code Reference
        - 200/201 Success
        - 400 Empty request body / database error
        - 404 Book not found
        - 409 Duplicate ISBN
        - 422 Parameter validation failed (Pydantic, error details in `data` array)

        ### Frontend Integration Key Points
        - CORS has been opened with `*`, no proxy needed during development
        - ISBN input can contain hyphens, backend will normalize; recommend frontend and backend display the same string
        - Swagger UI can be used to debug each endpoint directly in the browser
        - Complete curl examples and error response samples are in `API.md`"
}
```
- The coordinator continues to assign tasks to `front` for execution:
```json
{
    "name": "front", 
    "message": "Please develop the frontend part of a simple front-end and back-end separated library management system. The backend has been completed by the backend engineer. Please develop based on the following information for integration:
        【Backend Basic Information】
        - Backend project path: /root/.agbox_workspace/20260612_171211_b9688e/book_backend
        - Backend service runs on port 8080
        - API documentation address: http://localhost:8080/docs
        - Detailed API documentation: /root/.agbox_workspace/20260612_171211_b9688e/book_backend/API.md (please read this file first to understand endpoint details)

        【Backend API Endpoints】
        - GET /books?skip=0&limit=100 - Get book list (paginated)
        - GET /books/search?q=keyword - Search by keyword (title/author/ISBN/description)
        - GET /books/{book_id} - Get book details
        - POST /books - Add a new book
        - PUT /books/{book_id} - Update a book
        - DELETE /books/{book_id} - Delete a book

        【Frontend Requirements】
        1. Tech stack: Recommend using Vue 3 + Vite + Element Plus (or React + Ant Design), please choose an appropriate solution yourself
        2. Functional pages:
        - Book list page: table display, supports search, pagination, add, edit, delete operations
        - Book detail page/dialog: display complete book information
        - Add/edit book form: includes title, author, ISBN, publish date, description and other fields, with frontend validation
        3. Unified response structure judgment: { code: 0, message: 'ok', data: ... }, success flag is code === 0
        4. Error handling: ISBN duplicate (409), parameter validation failed (422), not found (404) need friendly prompts
        5. UI requirements: beautiful interface, smooth operation, responsive layout
        6. Clear project structure, code saved in the current working directory /root/.agbox_workspace/20260612_171211_b9688e, recommended to be placed in frontend/ directory
        7. Provide running instructions (README), including dependency installation, startup commands, access address
        8. Configure backend API address in frontend code via axios or fetch (can be configured via environment variables, default http://localhost:8080)

        After completion, please tell me the frontend project startup method, access address, and how to do joint debugging testing with the backend.", 
    "finished": false
}
```
- The `front` digital employee completes execution and returns the result to the coordinator:
```json
{
    "name":"front",
    "message":"Everything is in place. Here's the summary:
        ✅ Library management system frontend has been developed and committed to master

        **Project Location**: `/root/.agbox_workspace/20260612_171211_b9688e/book_frontend/` (16 source files, 976 lines of Vue/JS code)

        > Note: The user originally suggested 'recommended to be placed in frontend/ directory', but `frontend/` was already occupied by the student management system from the previous task, so I created `book_frontend/` to avoid conflicts. The two systems do not affect each other.

        **Startup Method**

        ```bash
        # 1) Start backend (port 8080)
        cd /root/.agbox_workspace/20260612_171211_b9688e/book_backend
        python3 -m venv .venv && source .venv/bin/activate
        pip install -r requirements.txt
        python -m app.main

        # 2) Start frontend (new terminal)
        cd /root/.agbox_workspace/20260612_171211_b9688e/book_frontend
        npm install
        npm run dev
        ```

        **Access Address**: <http://localhost:5173/>

        **Joint Debugging Testing** (actually passed 30/30 E2E assertions)

        1. Top right corner of the top bar should show **API: Connected** 🟢 (actively calls `/books?limit=1` on startup to detect)
        2. Click 'Add Book' → fill in the form → submit, the list refreshes immediately
        3. Enter 'computer' in the search box → real-time search
        4. Click 'Edit' on a row → modify and save (PUT partial update)
        5. Click 'Delete' on a row → ElMessageBox confirmation → delete success
        6. Enter an existing ISBN when adding → automatically catches 409, prompts 'ISBN already exists'
        7. Leave required fields empty / enter letters for ISBN → frontend intercepts, no request sent
        8. Backend Swagger: <http://localhost:8080/docs>

        **Verified Real Tool Output**

        | Verification Item | Result |
        |--------|------|
        | `npm install` | 82 packages added in 35s |
        | `npm run build` | ✓ built in 6.76s (1660 modules, 49KB gzipped CSS) |
        | Vite dev server | HTTP 200 on / + full module graph |
        | Vite proxy | `/api/books` → `http://localhost:8080/books` correctly forwarded |
        | End-to-end E2E (real backend) | **30/30 passed**: list / create / detail / update (partial+full) / delete / search / 409 / 422 / 404 |
        | Field error display | 422 Pydantic error array → `fieldErrors[]` → form field display |
        | ISBN normalization | Submit `978-7-115-32131-0` → backend stores as `9787115321310` (user notified in UI) |

        **Key Design Decisions**
        - **axios interceptor**: Unified handling of `{code, message, data}`, business code 0 → resolve data, others → reject with code & payload
        - **Vite proxy**: `/api/*` → `http://localhost:8080`, frontend code uses relative paths, no CORS configuration needed
        - **Environment variables**: `.env.development` defaults to `/api` via proxy; `.env.production` directly connects to `http://localhost:8080`; `VITE_API_TARGET` can override proxy target
        - **Friendly error prompts**: When 422, prioritize showing the first field error (more precise), and automatically call `validateField` to display backend errors on corresponding form items
        - **Unified responsive**: Mobile 640px breakpoint, toolbar/pagination adaptive

        **Git Status**
        ```
        * bd71e54 feat(book_frontend): Library management system frontend SPA (Vue 3 + Vite + Element Plus)
        * 5274bde feat(book_backend): Library management system backend API (FastAPI + SQLAlchemy)
        ```
        Backend commit first, frontend commit second. Both systems (student + library) on master are ready."
}
```
- The coordinator continues to assign tasks to `test` for execution:
```json
{
    "name": "test", 
    "message": "Please perform functional testing on the library management system. Both backend and frontend have been developed. Please execute complete end-to-end testing:
        【Project Location】
        - Backend: /root/.agbox_workspace/20260612_171211_b9688e/book_backend
        - Frontend: /root/.agbox_workspace/20260612_171211_b9688e/book_frontend

        【Backend Service Information】
        - Startup command: cd book_backend && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && python -m app.main
        - Port: 8080
        - API documentation: http://localhost:8080/docs
        - Detailed API documentation: /root/.agbox_workspace/20260612_171211_b9688e/book_backend/API.md

        【Frontend Service Information】
        - Startup command: cd book_frontend && npm install && npm run dev
        - Access address: http://localhost:5173
        - Vite proxy: /api/* → http://localhost:8080

        【Testing Requirements】
        1. Start backend service, confirm port 8080 is listening normally
        2. Start frontend service, confirm port 5173 is listening normally
        3. Test all backend API endpoints via HTTP requests:
        - GET /books - List query
        - POST /books - Add a new book (test normal and abnormal data)
        - GET /books/{id} - Detail query
        - PUT /books/{id} - Update a book
        - DELETE /books/{id} - Delete a book
        - GET /books/search?q=keyword - Search function
        4. Test boundary scenarios:
        - Duplicate ISBN should return 409
        - Missing required fields should return 422
        - Query non-existent ID should return 404
        - ISBN format validation
        5. Access the frontend page via browser or curl, confirm the page loads normally and connects with the backend
        6. Generate a detailed test report, recording each test case result (pass/fail), including:
        - Test case number
        - Test content
        - Expected result
        - Actual result
        - Status
        7. If bugs are found, record specific reproduction steps and error messages

        Please save the test report in /root/.agbox_workspace/20260612_171211_b9688e/test_report.md. Output the test conclusion after completion.", 
            "finished": false
}
```
- The `test` digital employee completes execution and returns the result to the coordinator:
```json
{
    "name":"test",
    "message":"All confirmed: 40 test cases, both ports released, report 16KB.
        ## Test Conclusion

        ✅ **All tests passed: 40/40, pass rate 100%**

        | Category | Passed/Total |
        | --- | --- |
        | Backend Basics | 3/3 |
        | CRUD Normal Flow | 12/12 |
        | Boundary & Error Codes | 19/19 |
        | CORS Cross-Origin | 2/2 |
        | Frontend + Vite Proxy | 4/4 |

        Test coverage:
        - Complete CRUD flow for 6 backend API endpoints (GET/POST/GET-by-id/PUT/DELETE/SEARCH)
        - Boundary scenarios: missing required fields, ISBN format/length/duplicate, PUT empty body, PUT change ISBN conflict, GET/PUT/DELETE non-existent id, search missing q / empty q, title length out of bounds, publish_date format error, illegal pagination parameters, unsupported method, non-numeric id
        - Error codes: 400 / 404 / 409 / 422 / 405 all returned according to API.md documentation
        - CORS: both preflight and actual requests return ACAO
        - Frontend SPA shell loading, Vite SFC compilation, Vite proxy passthrough to backend (both GET and POST verified)
        - 6 endpoint contracts between frontend and backend 100% aligned

        **No blocking bugs found**. Two minor observations have been written into the report:
        1. CORS middleware echoes origin for preflight, returns `*` for actual requests (does not affect functionality)
        2. OpenAPI does not explicitly declare 400 response in `update_book` decorator

        **Service stopped**: Both 8080 and 5173 ports have been released, no leftover processes.

        **Test report**: `/root/.agbox_workspace/20260612_171211_b9688e/test_report.md` (16 KB, 6 major sections, including environment description, 40 test case detailed result tables, frontend verification, contract alignment table, issue list, overall assessment and conclusion)"
}
```
- The coordinator considers the task complete, outputs the result, sets `name` to `null`, and `finished` to `true`:
```json
{
    "name": null, 
    "message": "# Library Management System Development Complete ✅
        The front-end and back-end separated library management system has been fully delivered and passed complete testing.

        ## Project Structure

        Working directory: `/root/.agbox_workspace/20260612_171211_b9688e/`

        ```
        ├── book_backend/        # Backend project (FastAPI + SQLAlchemy + SQLite)
        │   ├── app/
        │   │   ├── main.py      # Startup entry (port 8080)
        │   │   ├── database.py  # Database configuration
        │   │   ├── models.py    # ORM models
        │   │   ├── schemas.py   # Pydantic models
        │   │   ├── crud.py      # Data access layer
        │   │   ├── exceptions.py
        │   │   └── routers/books.py
        │   ├── requirements.txt
        │   ├── README.md
        │   └── API.md           # Detailed API documentation
        │
        ├── book_frontend/       # Frontend project (Vue 3 + Vite + Element Plus)
        │   ├── src/
        │   ├── package.json
        │   └── README.md
        │
        └── test_report.md       # Test report (16KB, 40 test cases)
        ```

        ## Startup Method

        **Backend**
        ```bash
        cd /root/.agbox_workspace/20260612_171211_b9688e/book_backend
        python3 -m venv .venv && source .venv/bin/activate
        pip install -r requirements.txt
        python -m app.main
        # Access http://localhost:8080/docs
        ```

        **Frontend**
        ```bash
        cd /root/.agbox_workspace/20260612_171211_b9688e/book_frontend
        npm install
        npm run dev
        # Access http://localhost:5173
        ```

        ## Core Features

        - Book list (pagination, search)
        - Add / Edit / Delete / View details
        - Fields: title, author, ISBN, publish date, description
        - ISBN auto-normalization, deduplication validation
        - Unified response structure `{code, message, data}`
        - Comprehensive error handling (400/404/409/422)
        - Auto-generated Swagger documentation

        ## Test Results

        ✅ 40/40 test cases all passed, coverage 100%
        - Backend CRUD complete flow
        - Boundary scenarios and error codes
        - CORS cross-origin
        - Frontend + Vite proxy
        - 6 endpoint contracts between frontend and backend aligned

        See detailed test report: `/root/.agbox_workspace/20260612_171211_b9688e/test_report.md`", 
    "finished": true
}
```
- If the `test` fails, it will return a BUG description, and the coordinator will delegate the fix task to the corresponding digital employee.
- This process `Synchronous Coordinator` fully simulates the AI application flow where humans first let `back` develop the backend, then let `front` develop the frontend, and finally let `test` test the project. This process is completely autonomously planned and automatically completed, and the sessions, context, configuration, and memory between digital employees are completely independent.

## Asynchronous Coordinator
The `Asynchronous Coordinator` receives user requirements, plans tasks, manages task dependencies and execution order, and delegates them to corresponding digital employees for execution (implemented through the `agbox-assign-task` skill), while handling git `worktrees` branch merging issues. The difference from the `Synchronous Coordinator` is: the `Asynchronous Coordinator` will automatically handle the execution order and dependency relationships of tasks based on the task situation, and delegate tasks without dependencies for parallel execution.
<Image src="/images/quick/coordinator/async_coordinator_workflow_en.png" />
### Overview
- Location: `store/coordinator/agbox-coordinator-async`
- Contains two `skills`: `planning-with-files` and `agbox-assign-task` (delegate digital employee skill)
- The `Asynchronous Coordinator` fully utilizes the native `Agent loop` framework, implementing digital employee task delegation and result summarization through skills and tool calls, similar to a dynamic sub-Agent mode. However, compared to sub-Agents, in addition to context, the sessions, configuration, and memory are also completely independent, simulating real employees.

### Working Principle
Example: `Implement a simple front-end and back-end separated student management system`, with three digital employees: `back` (backend development), `front` (backend development), `test` (functional testing).
- After the user submits the task, the `Asynchronous Coordinator` starts working.
- After planning the task, it determines that the frontend and backend can be developed simultaneously:
```markdown
Now let me assign the tasks. I'll start the backend and frontend development in parallel since they need to coordinate on API specifications
```
- The coordinator will monitor the progress of delegated tasks:
```markdown
Both backend and frontend development tasks are now running in parallel. Let me check their progress:
```
- After both digital employees complete development, they return the results to the coordinator. The content is similar to the `message` field of the digital employee reply messages in the `Synchronous Coordinator` above.
- The coordinator finds that both digital employees have completed their tasks and delegates the testing task to the `test` digital employee:
```markdown
Both backend and frontend are done. Now let me assign the test task:
```
- After the `test` digital employee completes testing, it returns the result to the coordinator.
- The coordinator determines whether BUG fixes are needed based on the test results. If BUG fixes are needed, it continues to delegate fix tasks to the corresponding digital employees.
- The coordinator determines that the task execution is complete, merges branches, and cleans up `worktrees`:
```markdown
All three tasks are complete. Let me verify the final state and clean up worktrees:
All merges are done into master. Let me check if there are any leftover worktrees to clean up:
All files are in place. The worktree subdirectory is empty (already cleaned up by the agents). Let me check if it needs to be removed:
Empty worktrees directory has been removed. Now let me write the final completion report:
```
- The coordinator organizes the final result and returns it to the user:
```markdown
All tasks completed. Here is the task execution summary:

═══════════════════════════════════════════
Student Management System Development Task Completion Report
═══════════════════════════════════════════

✅ Backend Development (back engineer)
   - Python 3 + Flask + SQLite
   - Complete CRUD RESTful API (5 endpoints)
   - CORS cross-origin support, field validation, error handling
   - Files: app.py, requirements.txt, API.md, README.md
   - Location: /root/.agbox_workspace/20260612_171211_b9688e/backend/

✅ Frontend Development (front engineer)
   - HTML + CSS + JavaScript + Vue 3 (CDN)
   - Glass-morphism UI, responsive design, form validation
   - Implemented list display, add/edit/delete, search filtering
   - Handled bidirectional translation of gender field with backend
   - Files: index.html, styles.css, app.js, README.md
   - Location: /root/.agbox_workspace/20260612_171211_b9688e/frontend/

✅ Functional Testing (test engineer)
   - Backend API testing: 27/27 all passed
   - Frontend static checks: HTML/CSS/JS all passed
   - Found 1 potential issue: frontend email REQUIRED inconsistent with backend optional
   - Report: TEST_REPORT.md (12.9 KB)

✅ Git Integration
   - All digital employees completed work via independent worktrees
   - Backend, frontend merged to master branch
   - worktree cleaned up

Startup method:
- Backend: cd backend && pip install -r requirements.txt && python3.11 app.py (port 5000)
- Frontend: cd frontend && python3 -m http.server 8080 (port 8080)

Detailed report at: /root/.agbox_workspace/20260612_171211_b9688e/Task Completion Report.md
```

## Other instructions
- The `synchronous coordinator` and `asynchronous coordinator` are only applicable to project tasks. For detailed usage instructions and previews, please refer to [Project Tasks - View Tasks](/en/usage/tasks/project#View Tasks).
- The `synchronous coordinator` executes relatively slowly but is relatively stable, while the `asynchronous coordinator` executes relatively quickly but is relatively unstable.
