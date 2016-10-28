# FullStackStarter
A starter kit to allow combining various backend and frontend starter projects doing very basic operations

Requirements: NodeJs latest (6.7 at the time this was built)
MongoDB : external requirement

* <b>NodeJS</b>
   A very basic nodeJS server which connects to a mongoDB
   - Setup steps:
      * cd NodeJS
      * npm install
      * node bin/www
   - Provided functionality
      * access on port 4000
      * provides two api endpoints:
         * GET /api/users : provides back an array of users from the mongo collection
         * POST /api/users : creates a new user in the mongo collection

* <b>ReactClient</b>
   A very basic react client build with
      - material UI library for UI elements
      - redux for managing the React flow
   - Setup steps
      * cd NodeJS
      * npm install
   - Build (this will create the packaged app in the dist folder within the app):
      * npm run build
   - Develop
      * npm start (this will start a webpack bundler which repackages the app while it's being developed - app is served from port 3000)
      
