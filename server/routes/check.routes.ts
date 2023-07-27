import express from "express";
const check = express.Router();
import database from "../Utils/database";

check.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const products = (
      await database.execute(
        `SELECT id_product FROM udemy.checkout where register_id =${id}`
      )
    )[0];
    console.log(products);

    res.json({
      message: "success",
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
});

check.post("/", async (req, res) => {
  const {
    checkout_address,
    checkout_name,
    checkout_number,
    id_product,
    register_id,
  } = req.body;

  console.log(req.body);

  try {
    await database.execute(
      "INSERT INTO udemy.checkout (checkout_address, checkout_name, checkout_number, id_product, register_id) VALUES (?, ?, ?, ?, ?)",
      [
        checkout_address,
        checkout_name,
        checkout_number,
        id_product,
        register_id,
      ]
    );

    res.status(200).json({
      status: 200,
      message: "Đã thêm thông tin khách hàng thành công",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: 500,
      message: "Đã xảy ra lỗi khi thêm thông tin khách hàng",
      err: error,
    });
  }
});

check.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { id_product } = req.body;

  try {
    await database.execute(
      "UPDATE udemy.checkout SET id_product = ?  WHERE register_id = ?",
      [id_product, id]
    );
    res.json({ status: 200, message: "Cập nhật thành công" });
  } catch (error) {
    console.log(error);
  }
});

export default check;
