![](https://lh3.googleusercontent.com/aT2zAV_NR3aKU81uGBpydc4C15MEfs_8LOeTdpXD8-VFv4fpVu3JtvLZBSp7_IW8GlYUXAnKey8YBhr9ZaTy7e7aU9Zjn-ukJiFti127_2rQaf0PT4eFi2S79gzpSAN_0xqAXpdxo_6EXillxJAtUpRhWdI9ji0ZniZnyQIyx0cQKOJPaZNFS8q87Z43Ctx_EVbCa2u9Jp1WeacPlZ2vpuD2ZUPkrq_OJqwPMHn4kctWmFnl5ptPI0ukWrKw_dZHLDXGVzYYBix5c8Jngq4dPCixe6fLMITyBJMBRRBrt3rgXj9x5mDXUvBgcvPAdPSNvGNgqdLXqXZePxnP3j10XfTYPSIiv4qX9wCRlxk5Q8GcuUxkpDLxMwgzjJbSNSRSuG2NgId_0nBzCoR22tD61Jjd5qjEq17jMLsfv0b4_zIrraBXGtPjWFbfz6qgSE-yuET06HAk7_4f2a14LmteDrne0T4l6-MaSb_L5EyUs1w8tIlmPXfgu4QqPa8ve88XvKfBGdWyi6TMDLAV25AlsjSIIN2aw6P39FvIGy_n3tAbk5GM1vwg-aBhq6-cW8xqme6FWoVdYp9xCbkhGQ-t2OrYvhzVboIeA9NGUee6vOpAOiNh2JG0GfHKZWd9ZyK_gwQoFfZYF4cOh99h47NbGD6gUQzcGqn71X_eb9BDaMgr2ve6ML57YgnqsBRQboeJSsKEy3QB428-jBo8YgcYzh0=w1237-h348-no?authuser=3 'MoveAmerica - Logo')

# Schedule-Sync

Schedule-sync creates a connection between Acuity accounts- syncing their appointment data into parent/child appointments.

## Getting Started

- `git clone local-scheduling-sync-file`
- `npm i`
- `cd ./client && npm i` (if front-end client directory is present)
- `cd ../ && npm start`

### File Structure

The current file structure of the project's root goes as follows:

```
- client
	- public
		- index.html
	- src
		- App.js
		- components
		- actions
		- reducers
		- store.js
	- package.json (for ./client)
- config
	- acuity.js
	- config.env (This will need to be added locally, see below for required variables)
- middleware
- models
- routes
	- acuity
		- -acuity.js
	- api
		- accounts.js
		- endpoints.js
		- calendars.js
		- mapping.js
- test
- package.json
- server.js
```

### Required ENV Variables

```
PORT=?
NODE_ENV=?

ACUITY_USER_ID_DEV_1=?
ACUITY_API_KEY_DEV_1=?
ACUITY_USER_ID_DEV_2=?
ACUITY_API_KEY_DEV_2=?
ACUITY_USER_ID_PROD=?
ACUITY_API_KEY_PROD=?
MONGO_URI=?
```

> Acuity API Keys and UserID's can be aquired from each individual Acuity instance (endpoint).
>
> The MongoDB URI can be aquired from either your local instance of mongoDB, or wherever your cloud DB host stores the connect string.

### MongoDB Models

There are currently four MongoDB models in this project, including: Account, Calendar, Endpoint, and Mapping. Please see the [repository](https://github.com/WillKoste/Personal-Sync/tree/main/models) for a full list of the fields/types/properties.

### Routes

> The schedule-sync application uses an Express server to call the Acuity API with the required credentials. View the API documentation [here](https://developers.acuityscheduling.com/reference).

```
GET:
	/api/v1/acuity/appointments = Get all appointments
	/api/v1/acuity/appointments/:appointmentId = Get appointment by ID
	/api/v1/acuity/blocks = Get all blocks
	/api/v1/acuity/blocks/:blockId = Get block by ID
POST:
	/api/v1/acuity/appointments/create = Create child appointment from origin Webhook
```

### Other

-- The app is currently using Bootstrap as its front-end framework, is also set up for custom SASS or CSS.

-- The Acuity API will accept a direct request if it contains a basic authorization header. Will need the API Key and User ID.

-- The `Procfile` located in the root of the project is for Heroku - it give directions upon deployment, include:

```
web: npm install
web: npm start
```

-- In a `.gitignore` file located in root, include:

```
node_modules
*.env
config/config.env
client/build/
```
