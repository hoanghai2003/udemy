import express from "express";
const register = express.Router();
import database from "../Utils/database";
import checkExitsEmail from "../middleware/middleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, Application } from "express";

register.post("/login", async (req: Request, res: Response) => {
  try {
    const { register_email, password } = req.body;
    console.log(register_email);

    let users: any | null = null;
    const [rows] = await database.execute<any[]>(
      "SELECT * FROM register where register_email= ?",
      [register_email]
    );
    console.log(rows);

    if (rows.length === 0) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không đúng !!!!",
      });
    }

    users = rows[0];

    const isMatch = await bcrypt.compare(password, users.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không đúng !",
      });
    } else {
      const token = jwt.sign({ id: users.register_id }, "your_secret_key", {
        expiresIn: "1h",
      });

      return res.status(200).json({
        status: 200,
        message: "Đăng nhập thành công",
        data: users,
        token,
      });
    }
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
});

// dang nhap

register.post("/", checkExitsEmail, async (req, res) => {
  try {
    const { full_name, register_email, password, roles } = req.body;
    console.log(req.body);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = [full_name, register_email, passwordHash, roles];

    const query =
      "INSERT INTO udemy.register (full_name, register_email, password, roles) VALUES (?, ?, ?, ?)";
    await database.execute(query, newUser);

    return res.status(201).json({
      status: 201,
      message: "Đăng kí thành công",
    });
  } catch (error: unknown) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Đã xảy ra lỗi trong quá trình xử lý" });
  }
});

////////////////////////////////////////////

register.get("/", async (req, res) => {
  try {
    const result = await database.execute("SELECT * FROM udemy.register");
    res.json({
      mess: "Đọc thành công",
      data: result[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
});

register.put("/:id", (req, res) => {
  try {
    res.json({ mess: "Update Thanh cong" });
  } catch (error) {
    console.log(error);
  }
});

register.delete("/:id", (req, res) => {
  try {
    res.json({ mess: "Delete thanh cong " });
  } catch (error) {
    console.log(error);
  }
});

export default register;
