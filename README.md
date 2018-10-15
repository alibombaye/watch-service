# watch-service
This service manages the streams that registered users are currently watching

docker build -t watch-service-app .

docker run -p 3000:5000 -d watch-service-app

GET - localhost:3000/api/v1/watch/user/1
Returns user is not watching any stream

GET - localhost:3000/api/v1/watch/user/5 
Returns user not recognised error

POST - localhost:3000/api/v1/watch/user/1/stream/1
Returns true

POST - localhost:3000/api/v1/watch/user/8/stream/2
Returns user not recognised error

POST - localhost:3000/api/v1/watch/user/1/stream/8
Returns stream not recognised error

POST - localhost:3000/api/v1/watch/user/1/stream/2
Returns true

POST - localhost:3000/api/v1/watch/user/1/stream/3
Returns true

GET - localhost:3000/api/v1/watch/user/1
Returns user is watching streams[1, 2, 3]


POST - localhost:3000/api/v1/watch/user/1/stream/4
Returns can not watch more than 3 stream concurrently
