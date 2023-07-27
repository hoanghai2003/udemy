import express from "express";
const app = express();
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

// sử dụng router
import subJect from "./routes/subjectlist.routes";
import register from "./routes/register.routes";
import carts from "./routes/cart.routes";
import check from "./routes/check.routes";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use(morgan("dev"));

// sử dụng

app.use("/api/v1/subject", subJect);
app.use("/api/v1/register", register);
app.use("/api/v1/carts", carts);
app.use("/api/v1/check", check);

app.listen(3004, () => {
  console.log("http://localhost:3004/api/v1/subject");
  console.log("http://localhost:3004/api/v1/register");
  console.log("http://localhost:3004/api/v1/carts");
  console.log("http://localhost:3004/api/v1/check");
});
