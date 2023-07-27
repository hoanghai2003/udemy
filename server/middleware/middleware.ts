import express, { Request, Response } from "express";
import database from "../Utils/database";
import bodyParser from "body-parser";

const register = express.Router();
register.use(bodyParser.json());
register.use(bodyParser.urlencoded({ extended: true }));

// Validate sigup các trường dữ liệu trong bảng user
const checkExitsEmail = async (req: Request, res: Response, next: any) => {
  const { register_email } = req.body;

  console.log("email-body", register_email);

  try {
    // Sử dụng database để lấy về toàn bộ user
    const email: any[] = await database.execute(
      `SELECT * FROM udemy.register where register_email = "${register_email}"`
    );

    if (email[0].length > 0) {
      return res.status(400).json({
        status: 400,
        message: "Email đã tồn tại trong hệ thống",
      });
    } else {
      next();
    }
  } catch (error: unknown) {
    res.status(500).json({
      error: (error as Error).message,
    });
  }
};

// validate login các ô input

export default checkExitsEmail;
