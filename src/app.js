import express from "express"
import cors from "cors"
import { createUser, signIn } from "./routes/usercontroller.js";
import router from "./routes/chats/protectedRoutes.js"
import { verifyToken } from "./middlewares/authMiddleware.js";
import { globalLimiter } from "./middlewares/limitsetterMiddleware.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(globalLimiter)

app.post('/signup', createUser);
app.post('/signin', signIn);
app.use('/api' ,router);


app.get("/", (req, res) => {
  res.send("API is running ")
})


export default app