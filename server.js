const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encode

app.listen(port, () => console.log(`Listening on port ${port}`));

// FETCH USERS
app.get('/api/v1/users', (req, res) => {
  res.send({
    "users": [
      {
        "id": 1,
        "username": "marymeeker",
        "real_name": "Mary Meeker",
        "verified": true
      },
      {
        "id": 2,
        "username": "ConanOBrien",
        "real_name": "Conan O'Brien",
        "verified": true
      },
      {
        "id": 3,
        "username": "baratunde",
        "real_name": "Baratunde",
        "verified": false
      }
    ],
  });
});

app.get('/api/v1/users/:id', function (req, res, next) {
  const users =
    [
      {
        "id": 1,
        "username": "marymeeker",
        "real_name": "Mary Meeker",
        "verified": true
      },
      {
        "id": 2,
        "username": "ConanOBrien",
        "real_name": "Conan O'Brien",
        "verified": true
      },
      {
        "id": 3,
        "username": "baratunde",
        "real_name": "Baratunde",
        "verified": false
      }
    ]
  const foundUser = users.find(user => {
    if (parseInt(req.params.id) === user.id) {
      return user;
    }
  });
  res.send({
    foundUser
  })
})

app.get('/api/v1/user/:username', function (req, res, next) {
  const usersList =
    [
      {
        "id": 1,
        "username": "marymeeker",
        "real_name": "Mary Meeker",
        "verified": true
      },
      {
        "id": 2,
        "username": "ConanOBrien",
        "real_name": "Conan O'Brien",
        "verified": true
      },
      {
        "id": 3,
        "username": "baratunde",
        "real_name": "Baratunde",
        "verified": false
      }
    ]
  const foundUser = usersList.find(user => {
    if (req.params.username === user.username) {
      return user;
    }
  });
  res.send({
    foundUser
  })
})

// app.param('/api/v1/user', function (req, res, next, id) {
//   // try to get the user details from the User model and attach it to the request object
//   User.find(id, function (err, user) {
//     if (err) {
//       next(err)
//     } else if (user) {
//       req.user = user
//       next()
//     } else {
//       next(new Error('failed to load user'))
//     }
//   })
// })

// FETCH POSTS
app.get('/api/v1/posts', (req, res) => {
  res.send({
    "posts": [
      {
        "id": 2374237842,
        "user": 1,
        "message": "Spotify has grown to more than 60 million monthly active users, 15 million of whom are paying subscribers.",
        "ts": 1337774582
      },
      {
        "id": 2374272076,
        "user": 2,
        "message": "If I were in prison, I wouldn't ruin my spoon trying to tunnel out, because going without morning yogurt is its own prison.",
        "ts": 1337968739
      },
      {
        "id": 4545435344,
        "user": 3,
        "message": "Something beautiful happened in Cornwall. https://media.better.com/microblog/cornwall.jpg",
        "ts": 1461607139
      },
      {
        "id": 4629293242,
        "user": 2,
        "message": "Love this shot. Reminds me of the first time someone found me at the end of a rainbow holding a pot of gold.",
        "ts": 1478942943
      }
    ]
  });
});

// POST TO POSTS
app.post('/api/v1/posts', function (req, res) {
  // res.send('POST request to the homepage')
})


app.post('/api/v1/posts', function(req, res) {
    let user_id = req.body.user;
    let message = req.body.message;
    let ts = req.body.ts;
    let id = req.body.id;
    console.log("GOT IN")

    res.send(user_id + ' ' + message + ' ' + ts);
});

app.get('/express_backend', (req, res) => {
  res.send({ "express": 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT',
 });
});
