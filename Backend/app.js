import express from "express"
import bookRouter from "./routers/bookRouters.js";
import cors from "cors"

const app=express();
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
})) 
app.use(express.json());

app.use("/api",bookRouter)


app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

export default app