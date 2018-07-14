# BSA-Node.js

## User: 

```

GET: /api/user/

GET: /api/user/:id

GET: /api/user/:id/penfriends

POST: /api/user/
BODY: {
  name: String,
  email: String
}

PUT: /api/user/:id
BODY: {
  name: String,
  email: String
}

DELETE: /api/user/:id

```

## Message: 

```
GET: /api/message/

GET: /api/message/:id

POST: /api/message/
BODY: {
  senderId: Number,
  receiverId: Number,
  text: String
}

PUT: /api/message/:id
BODY: {
  senderId: Number,
  receiverId: Number,
  text: String
}

DELETE: /api/message/:id

```
