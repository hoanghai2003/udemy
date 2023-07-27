import express from "express";

const subject = express.Router();
import database from "../Utils/database";

subject.get("/", async (req, res) => {
  try {
    const products = (await database.execute("SELECT * FROM udemy.product"))[0];
    console.log(products);

    res.json({
      message: "success",
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
});

subject.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = (
      await database.execute(
        `SELECT * FROM udemy.product WHERE id_product=${id}`
      )
    )[0];

    if (product) {
      res.json({
        message: "success",
        product: product,
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
});

subject.post("/single", async (req, res) => {
  const {
    product_img,
    product_name,
    product_author,
    product_price,
    product_oldprice,
    product_star,
    product_vote,
    review_product,
    product_seller,
  } = req.body;
  try {
    await database.execute(
      "INSERT INTO `udemy`.`product` (`product_img`, `product_name`, `product_author`, `product_price`, `product_oldprice`,`product_star`,`product_vote`, `review_product`, `product_seller`) VALUES (?, ?, ? , ?, ?, ?, ?, ?, ?)",
      [
        product_img,
        product_name,
        product_author,
        product_price,
        product_oldprice,
        product_star,
        product_vote,
        review_product,
        product_seller,
      ]
    );
    res.json("Post Thanh cong");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
});

subject.put("/:id", (req, res) => {
  try {
    res.json({ mess: "Update Thanh cong" });
  } catch (error) {
    console.log(error);
  }
});

subject.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await database.execute(
      `DELETE FROM udemy.product WHERE (id_product = ${id})`
    );
    res.json({ mess: "Delete thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
});

// API để xoá nhiều sản phẩm theo ID
subject.delete("/products", (req, res) => {
  const { ids } = req.body;
});

export default subject;
