const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());

const cors = require('cors');
app.use(cors());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const articleRouter = require('./routers/article');
app.use('/api/article',articleRouter);

const userRouter = require('./routers/user');
app.use('/user',userRouter);

const uploadRoutes = require('./routers/upload');
app.use('/photo', uploadRoutes); // أو '/upload' حسب المسار لديك

const commentRouter = require('./routers/comments');
app.use('/comment',commentRouter)

const emailRouter = require('./routers/email');
app.use('/contact',emailRouter);

app.get('/',(req,res)=>{
    res.send("done");
});

const port = 7000;
app.listen(port ,()=>{
    console.log('work on port http://localhost:7000');
})