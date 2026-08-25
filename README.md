# CFF (Chat for Faculty)

CFF is an AI-powered educational assistant that helps students explore universities, faculties, admissions, academic paths, and career planning. Its assistant, CollegeAI, combines a React chat interface with an Express API backed by Google Gen AI.

## Overview

CFF is a two-part application for students seeking practical guidance about higher education. The backend exposes an AI chat endpoint, while the frontend provides a bilingual English/Egyptian Arabic chat experience with light and dark themes, local conversation persistence, Markdown rendering, and responsive layouts.

The AI instructions focus CollegeAI on university and college advising, current-information awareness, personalized recommendations, academic roadmaps, and transparent uncertainty. The assistant is advisory only and is not an official university representative or admission authority.

The current implementation is intentionally small: the backend has one AI feature module, and there is no user authentication, authorization, database, or server-side conversation storage.

## Features

### Implemented

- AI chat endpoint for generating responses through Google Gen AI.
- CollegeAI guidance focused on universities, faculties, admissions, academic programs, career paths, and learning roadmaps.
- Google Search configuration on Gemini requests for questions that require current information.
- Fallback across up to four Google API keys when a request is rate-limited with HTTP 429.
- Prompt validation in the service layer.
- Centralized asynchronous error forwarding and an Express error middleware.
- React chat interface with:
  - English and Egyptian Arabic translations.
  - Automatic left-to-right or right-to-left document direction.
  - Light and dark themes.
  - Markdown and GitHub-Flavored Markdown rendering for assistant responses.
  - Local browser persistence of chat history through `localStorage`.
  - Clear-chat control.
  - Responsive desktop and mobile layouts.
  - Loading and typing indicators while a response is generated.

### Not implemented

- User accounts, authentication, or authorization.
- Database persistence or conversation synchronization across devices.
- Admin, faculty, vendor, product, order, search, or user-management features.
- Automated tests.
- A server-side Swagger UI route.

## Tech Stack

### Backend

- Node.js with ECMAScript modules.
- Express 5.
- `cors` for Cross-Origin Resource Sharing.
- `dotenv` for environment configuration.
- `@google/genai` for Gemini API access.

### Frontend

- React and React DOM.
- Vite.
- Axios client configuration.
- `react-i18next` and `i18next` for English and Arabic translations.
- `react-markdown` with `remark-gfm` for assistant message rendering.
- `lucide-react` for interface icons.

### Documentation

- OpenAPI 3.0 YAML is included at [`Back-end/src/swagger.yaml`](Back-end/src/swagger.yaml).

### Development Tools

- Nodemon is listed as a backend development dependency, but no npm script currently invokes it.

## Architecture

The backend uses a small feature-based, layered structure with dependency injection:

```text
Client
  |
  v
Express route: POST /api/v1/ai/chat
  |
  v
AI controller
  |
  v
AI service
  |
  v
AI repository
  |
  v
Google Gen AI
```

- **Routes** register the `/chat` endpoint.
- **Controller** extracts `req.body.prompt` and sends the request through the async wrapper.
- **Service** validates the prompt and delegates AI generation.
- **Repository** owns the Google Gen AI SDK call, model selection, search configuration, and API-key retry behavior.
- **Container** constructs and injects the repository into the service, controller, and routes.

The frontend currently imports [`Front-end/src/mock/chatData.js`](Front-end/src/mock/chatData.js) directly from `App.jsx`. That helper posts to the backend using Axios, so the UI's chat flow is wired for the API through that client module, while the module name reflects its current mock-oriented location.

## Project Structure

```text
CFF (Chat for Faculty)/
├── Back-end/
│   ├── index.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── container.js
│       ├── swagger.yaml
│       ├── config/                 # Currently empty
│       ├── data/                   # Currently empty
│       ├── middlewares/            # Currently empty
│       ├── modules/
│       │   └── ai/
│       │       ├── ai.controller.js
│       │       ├── ai.repository.js
│       │       ├── ai.routes.js
│       │       └── ai.service.js
│       └── utils/
│           ├── AppError.js
│           ├── catchAsync.js
│           └── gerror.js
└── Front-end/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── i18n.js
        ├── main.jsx
        ├── features/chat/components/
        │   ├── ChatInput.jsx
        │   ├── ConversationList.jsx
        │   └── MessageBubble.jsx
        ├── mock/chatData.js
        └── styles/global.css
```

## Security

The current source implements only a limited set of security-related controls:

- API keys are read from environment variables rather than hard-coded in the repository.
- CORS middleware is enabled in Express.
- The service rejects missing or non-string prompts with an `AppError`.
- Async controller failures are forwarded to the error middleware.

The application does **not** currently implement JWTs, password hashing, cookies, authentication, authorization, rate limiting, Helmet/security headers, or NoSQL injection protection. Although the repository rotates through configured keys after a Google 429 response, there is no application-level rate limiter.

## API Documentation

An OpenAPI 3.0 document is available at [`Back-end/src/swagger.yaml`](Back-end/src/swagger.yaml). The Express application does not currently mount Swagger UI or expose the YAML through an HTTP route, so the file must be viewed directly or loaded into an OpenAPI-compatible tool.

The backend base URL is `http://localhost:3000` by default. The implemented endpoint is:

```text
POST /api/v1/ai/chat
```

The OpenAPI file describes the relative path `/chat`; when used with the running Express application, the mounted route includes the `/api/v1/ai` prefix.

## Installation

Install dependencies independently for the backend and frontend:

```bash
git clone <repository-url>
cd "CFF (Chat for Faculty)"

cd Back-end
npm install

cd ../Front-end
npm install
```

Replace `<repository-url>` with the repository's actual clone URL.

## Environment Variables

Create `Back-end/.env` for the server and `Front-end/.env` for the Vite client as needed.

| Variable | Used by | Description |
| --- | --- | --- |
| `PORT` | Backend | Port for the Express server. Defaults to `3000` when unset. |
| `GOOGLE_API_KEY` | Backend | Google Gen AI API key. |
| `GOOGLE_API_KEY2` | Backend | Optional additional Google Gen AI API key. |
| `GOOGLE_API_KEY3` | Backend | Optional additional Google Gen AI API key. |
| `GOOGLE_API_KEY4` | Backend | Optional additional Google Gen AI API key. |
| `VITE_API_URL` | Frontend | Axios base URL used before the `/api/v1/ai/chat` path is appended. |

Example backend environment file:

```dotenv
PORT=3000
GOOGLE_API_KEY=your_google_api_key
GOOGLE_API_KEY2=
GOOGLE_API_KEY3=
GOOGLE_API_KEY4=
```

Example frontend environment file:

```dotenv
VITE_API_URL=http://localhost:3000
```

Do not commit real API keys or other secrets. The backend's key list is created when the repository module is loaded, so environment variables should be present before starting the server.

## Running the Project

Start the backend from `Back-end`:

```bash
node index.js
```

The server listens on `PORT`, or on port `3000` if `PORT` is not set.

Start the frontend from `Front-end`:

```bash
npm run dev
```

The Vite development server prints its local URL in the terminal. Ensure `VITE_API_URL` points to the running backend.

The frontend also provides these package scripts:

```bash
npm run build    # Create a production build
npm run preview  # Preview the production build locally
```

The backend package currently has no `start`, `dev`, or build script. Its `test` script is a placeholder that exits with an error because testing has not been configured.

## Testing

Automated tests are not currently implemented. The backend `test` script is:

```text
echo "Error: no test specified" && exit 1
```

## API Examples

### Generate an AI response

**Request**

```http
POST http://localhost:3000/api/v1/ai/chat
Content-Type: application/json

{
  "prompt": "What is the difference between Computer Science and Information Systems?"
}
```

Authentication is not required by the current route.

**Successful response**

The controller returns the text produced by Gemini directly as a JSON string:

```json
"<generated response text>"
```

**Invalid prompt**

An absent or non-string `prompt` is rejected by the service. The current global error middleware responds with HTTP 500 and an object containing `success: false` and error details, even though the service creates this validation error with status code 400.

```json
{
  "success": false,
  "error": {
    "message": "Please provide a valid prompt",
    "name": "Error",
    "statusCode": 400
  }
}
```

The exact error object can include a stack trace in the current implementation. Do not expose that detail in production responses without reviewing the error middleware.

## Application Flow

### Chat flow

```text
Student enters a question
  |
  v
React stores the user message in local state
  |
  v
The frontend serializes chat history and POSTs it as `prompt`
  |
  v
Express parses JSON and routes the request
  |
  v
Controller -> Service validation -> AI Repository
  |
  v
Google Gen AI generates a response
  |
  v
The frontend renders the response as Markdown
  |
  v
Chat history is saved to browser `localStorage`
```

The active frontend helper sends serialized chat history as the `prompt` value rather than sending only the newest message. The backend accepts that value as a string and passes it to the AI repository, where it is included in the model instruction block.

## Database

No database is configured or used by the current implementation. There are no models, schemas, migrations, collections, or database connection code. Chat history is stored only in the browser's `localStorage` under the `chatHistory` key.

## Error Handling

- `catchAsync.js` forwards rejected promises from controller handlers to Express `next`.
- `AppError.js` provides an error message, status code, status classification, and operational flag.
- `ai.service.js` validates the prompt and converts repository failures into `AppError` instances.
- `gerror.js` is registered as the final Express middleware and returns a JSON error payload.

There is an important current behavior to be aware of: `gerror.js` always sends HTTP 500 and includes the error stack, so the status code created by `AppError` is not currently used as the HTTP response status.

## Code Quality & Design Decisions

- The AI feature is isolated in its own module rather than placing provider logic in the route handler.
- Dependency injection in `container.js` keeps the controller and service dependent on abstractions supplied at composition time.
- The service layer owns input validation and delegates provider work to the repository.
- The repository layer isolates Google Gen AI SDK usage and API-key fallback behavior.
- Shared async and error utilities keep request handling consistent.
- The frontend separates the main application shell, chat input, message rendering, translations, and styles into focused modules.

These boundaries make the provider integration easier to replace and provide a natural foundation for adding persistence, authentication, or further feature modules later.

## Future Improvements

Potential next steps, clearly separate from the current implementation, include:

- Add automated unit and integration tests for validation, error handling, routing, and AI-provider behavior.
- Correctly preserve `AppError.statusCode` in the global error response and avoid returning stack traces in production.
- Add request validation with a dedicated schema-validation library and define a stable response contract.
- Mount Swagger UI and align the OpenAPI response schema with the controller's actual raw-text response.
- Add authenticated user accounts and server-side conversation persistence.
- Connect the frontend directly to a clearly named API client module and add user-facing handling for backend configuration failures.
- Add rate limiting, security headers, structured logging, monitoring, and deployment configuration.
- Add CI checks for formatting, linting, tests, and production builds.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Commit your changes.
5. Push the branch.
6. Open a Pull Request.

Please keep changes focused and update the documentation when behavior or setup changes.

## License

No project-level `LICENSE` file is present. The backend `package.json` declares the `ISC` license metadata; the frontend package does not declare a license. Confirm the intended project-wide license before distributing the project.

## Author

The project identifies its developer in the AI configuration as **Mena Emad**, Software Developer.

Portfolio: [menaemad.vercel.app](https://menaemad.vercel.app)