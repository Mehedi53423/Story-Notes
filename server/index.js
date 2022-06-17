import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
//import conversationRoute from './routes/conversations.js';
//import messageRoute from "./routes/messages.js";
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);
//app.use("/conversations", conversationRoute);
//app.use("/messages", messageRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
}).catch((error) => {
    console.log(`${error} did not connect`);
});

//mongoose.set('useFindAndModify', false);