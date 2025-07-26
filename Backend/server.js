import app from "./app.js";
import dotenv from "dotenv"

dotenv.config()

app.listen(7002, () => {
  console.log(`Book Management Server running on port ${7002}`);
});