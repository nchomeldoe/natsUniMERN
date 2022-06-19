Simple university admin site built with the MERN stack (MongoDB, Express, React and Node).

Local setup:
npm run watch in the root folder and npm start in the client folder to run locally.

You will need to create a MongoDB database with a students collection and a subjects collection either locally or in the cloud.

You will need to make a root .env file with the following config var:
DB_URI=[your MongoDB database connection]

You will also need to create a cognito user pool and make a client .env file with the following config vars: REACT_APP_REGION=[your cognito region]
REACT_APP_USER_POOL_ID=[your cognito user pool id]
REACT_APP_USER_POOL_WEB_CLIENT_ID=[your cognito app client id]
