import express from "express";
const carts = express.Router();
import database from "../Utils/database";
import { OkPacket } from "mysql2/promise";

////////////////////////////////////////////

carts.get("/", async (req, res) => {
  try {
    const result = await database.execute("SELECT * FROM udemy.carts");
    res.json({
      mess: "Đọc thành công",
      data: result[0], // Dữ liệu từ câu truy vấn SELECT * FROM udemy.carts
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình xử lý" });
  }
});

carts.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = await database.execute(
      `
        select c.register_id,c.id_product,c.date_cart,
        p.product_img,p.product_name,p.product_author,p.product_price,
        p.product_oldprice,p.product_star,p.product_vote,p.review_product,p.product_seller
        from carts as c
        join register as r on r.register_id = c.register_id
        join product as p on p.id_product = c.id_product
        where c.register_id = ${id}     
        `
    );

    return res.status(201).json({
      mess: "Đọc thành công",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình xử lý" });
  }
});

carts.post("/post", async (req, res) => {
  const { register_id, id_product, date_cart } = req.body;

  try {
    const result = await database.execute(
      `INSERT INTO udemy.carts (register_id, id_product, date_cart) VALUES (${register_id}, ${id_product}, "${date_cart}")`
    );

    console.log(result);

    res.status(201).json({
      mess: "Thêm khoá học thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình xử lý" });
  }
});

carts.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let result = await database.execute(
      `select * from udemy.carts where carts_id = ${id}`
    );
    res.json({ mess: "doc thành công", data: result[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình xử lý" });
  }
});

carts.get("/register/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let result = await database.execute(
      `select * from udemy.carts where register_id = ${id}`
    );
    res.json({ mess: "doc thành công", data: result[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình xử lý" });
  }
});

// API để xoá nhiều sản phẩm theo ID
carts.delete("/delete-multi/cart", async (req, res) => {
  const { ids } = req.body;

  // Kiểm tra nếu không có ID nào được gửi lên
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ message: "Vui lòng cung cấp danh sách ID sản phẩm để xoá." });
  }

  try {
    // Tạo câu truy vấn xoá các sản phẩm theo ID
    const query = `DELETE FROM carts WHERE carts_id IN (${ids
      .map((id) => database.escape(id))
      .join(",")})`;

    // Thực hiện truy vấn xoá
    const [result]: any = await database.query(query);

    // Kiểm tra xem có sản phẩm nào được xoá thành công không
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để xoá." });
    }

    res.json({ status: 200, message: "Đã xoá sản phẩm thành công." });
  } catch (error) {
    console.error("Lỗi truy vấn MySQL: ", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi xoá sản phẩm." });
  }
});

export default carts;
