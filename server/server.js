const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const cors = require('cors');



// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const plantRouter = require('./routes/plant.router');
const followerRouter = require('./routes/follower.router');
const noteRouter = require('./routes/note.router');
const messageRouter = require('./routes/message.router');
const commentRouter = require('./routes/comment.router');

// Express Middleware
app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({extended: true, limit: '100mb'}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/plant', plantRouter);
app.use('/api/follower', followerRouter);
app.use('/api/note', noteRouter);
app.use('/api/message', messageRouter);
app.use('/api/comment', commentRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
