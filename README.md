# watch-service
This service manages the streams that registered users are currently watching

## installation instructions
1. Clone the repo
2. `cd watch-service`
3. Build the docker image `docker build -t watch-service-app .`
4. Run the docker image `docker run -p 3000:5000 -d watch-service-app`

## running the unit and integration tests
1. `cd watch-service`
2. Run the following command in the terminal `npm run test-all`

## setup notes
The app will have the following users and streams hardcoded. The key reperesents the id to use when testing.

### users
```
{
    1: {
        name: 'Thanos'
    },
    2: {
        name: 'Iron man'
    },
    3: {
        name: 'Spiderman'
    }
};
```

### streams
```
{
    1: {
        name: 'UFC 229'
    },
    2: {
        name: 'Anthony Joshua vs Tyson Fury'
    },
    3: {
        name: 'UFC 230'
    },
    4: {
        name: 'Premier League: Chelsea vs Liverpool'
    },
    5: {
        name: 'Ashes First Test day 3'
    }
};
```

## testing instructions
In postman - call the following endpoints

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

## architecture notes
In a real production system. This app would connect to external services to get the users and streams data.

Also it would access an external database to access and store the watching details. At the moment this is stored locally within the app. 

Considering the above 2 points this should allow the app to be completley stateless and fully scalable.

As a result at present it can not be scaled. Also it will not be able to handle effectively concurrent requests that update the state of the internal database.
