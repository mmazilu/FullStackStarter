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
         * GET /users : provides back an array of users from the mongo collection
         * POST /users : creates a new user in the mongo collection
         
   


