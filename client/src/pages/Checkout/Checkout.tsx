import { useNavigate, useParams } from "react-router-dom";
import assImages from "../../assets/image";
import "./Checkout.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";

interface ProductData {
  id_product: number;
  product_name: string;
  product_img: string;
  product_price: number;
}

interface UserData {
  register_id: number;
}

interface CartData {
  carts_id: number;
}

function Checkout() {
  const UserLocal: UserData | null = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [isCreditCardSelected, setIsCreditCardSelected] = useState(false);
  const { id } = useParams();
  const [proCheck, setProCheck] = useState<ProductData[]>([]);
  const [cartsId, setCartId] = useState<CartData[]>([]);
  const [userLocal, setUserLocal] = useState<ProductData[]>([]);
  const navigate = useNavigate();
  const [pushs, setPushs] = useState<number[]>([]);

  useEffect(() => {
    const ids = cartsId.map((item) => item.carts_id);
    setPushs(ids);
  }, [cartsId]);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/api/v1/subject/${id}`)
      .then((res) => res?.data?.product[0])
      .catch((err) => console.log(err));
  }, [cartsId]);

  const [address, setAddress] = useState("");
  const [nameCart, setNameCart] = useState("");
  const [numBer, setNumber] = useState("");

  const totalPrice: number = proCheck.reduce(
    (accumulator: number, current: ProductData) => {
      return accumulator + current.product_price;
    },
    0
  );
  const totalPriceUSer: number = userLocal.reduce(
    (accumulator: number, current: ProductData) => {
      return accumulator + current.product_price;
    },
    0
  );
  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleCreditCardClick = () => {
    setIsCreditCardSelected((prevValue) => !prevValue);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3004/api/v1/subject/${id}`)
      .then((res) => setProCheck(res.data.product))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (UserLocal) {
      axios
        .get(`http://localhost:3004/api/v1/carts/user/${UserLocal.register_id}`)
        .then((res) => setUserLocal(res.data.data))
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (UserLocal && UserLocal.register_id) {
      axios
        .get(
          `http://localhost:3004/api/v1/carts/register/${UserLocal.register_id}`
        )
        .then((res) => setCartId(res.data.data))
        .catch((err) => console.log(err));
    }
  }, []);

  const handleAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddress(e.target.value);
  };

  const handleNameCart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameCart(e.target.value);
  };

  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = e.target.value;
    if (inputPhoneNumber.length <= 10) {
      const isNumeric = /^[0-9]*$/.test(inputPhoneNumber);
      if (isNumeric || inputPhoneNumber === "") {
        setNumber(inputPhoneNumber);
      }
    }
  };

  const idProducts = userLocal?.map((item: ProductData) => item.id_product);

  const NewUser = {
    checkout_address: address,
    checkout_name: nameCart,
    checkout_number: numBer,
    id_product: idProducts?.join(", "),
    register_id: UserLocal?.register_id,
  };

  const handlePust = async () => {
    if (!nameCart || !numBer) {
      notification.error({
        message: "Lỗi",
        description: "Mời nhập đầy đủ thông tin để tiếp tục đặt hàng",
      });
      return;
    } else if (numBer.length < 10) {
      notification.error({
        message: "Lỗi",
        description: "Mời nhập đầy đủ số điện thoại",
      });
      return;
    } else if (numBer.length > 10) {
      notification.error({
        message: "Lỗi",
        description: "Số điện thoại sai",
      });
      return;
    }
    await axios
      .post("http://localhost:3004/api/v1/check", NewUser)
      .then((data) => {
        if (data.status === 200) {
          notification.success({
            message: "Thành công",
            description: "Mua Khoá Học Thành công",
          });
          setTimeout(() => {
            navigate("/learning");
          }, 2000);
        }
      })
      .catch((err) => console.log(err));

    await axios
      .delete("http://localhost:3004/api/v1/carts/delete-multi/cart", {
        data: { ids: pushs },
      })
      .then((res) => {
        if (res.data.status === 200) {
        }
      })
      .catch((err: unknown) => console.log(err));
  };

  return (
    <>
      <div className="pts-checkout">
        <div className="header-checkout">
          <div className="m-hd-checkout">
            <a href="/">
              <img className="img-logo" src={assImages.Logo} alt="Udemy" />
            </a>
            <a href={"shopping"}>
              <span>Cancel</span>
            </a>
          </div>
        </div>
        <div className="body-m-check">
          <div className="body-checkout">
            <div style={{ width: "100%", display: "flex" }}>
              <div className="left-check">
                <div className="check-h2">
                  <h2>Checkout</h2>
                </div>
                <section className="section1">
                  <h3>Billing address</h3>
                  <div className="m-select">
                    <label htmlFor="">
                      <b>Country</b>
                      <span>Required</span>
                    </label>
                    <div className="select-optt">
                      <i className="fa-solid fa-globe"></i>
                      <div className="select-opt">
                        <select name="" id="" onChange={handleAddress}>
                          <option> chọn địa chỉ</option>
                          <option value={1}>Ngũ kiên</option>
                          <option value={2}>Vĩnh Phúc</option>
                          <option value={3}>Hà Nội</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="tt-select">
                    <p>
                      Udemy is required by law to collect applicable transaction
                      taxes for purchases made in certain tax jurisdictions.
                    </p>
                  </div>
                </section>

                <section className="section2">
                  <div className="radio-check">
                    <h4>Payment method</h4>
                    <div className="radio-lock">
                      <span>Secured connection</span>
                      <i className="fa-solid fa-lock"></i>
                    </div>
                  </div>
                  <div className="btn-radio">
                    <label htmlFor="payment">
                      <div className="displ-fl">
                        <input
                          type="radio"
                          id="payment"
                          onClick={handleCreditCardClick}
                        />
                        <div className="btn-cartt">
                          <i className="fa-solid fa-credit-card"></i>
                        </div>
                        <span className="credit">Credit/Debit Cart</span>
                      </div>
                      <div className="displ-fl cart-m-fz">
                        <div>
                          <i className="fa-solid fa-credit-card"></i>
                        </div>
                        <div>
                          <i className="fa-solid fa-credit-card"></i>
                        </div>
                        <div>
                          <i className="fa-solid fa-credit-card"></i>
                        </div>
                        <div>
                          <i className="fa-solid fa-credit-card"></i>
                        </div>
                      </div>
                    </label>
                    {isCreditCardSelected && (
                      <div className="new-div">
                        <div className="card-name">
                          <div>
                            <span>Name on card</span>
                            <span className="span1">Required</span>
                          </div>
                          <input
                            type="text"
                            placeholder="Name on card"
                            onChange={handleNameCart}
                          />
                        </div>
                        <div className="card-name">
                          <div>
                            <span>Card number</span>
                            <span className="span1">Required</span>
                          </div>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            onChange={handleNumber}
                            value={numBer}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                <section className="section3">
                  <h4>Order details</h4>
                  {id ? (
                    <>
                      {proCheck.map((check: ProductData, index) => (
                        <div className="cart-link" key={index}>
                          <div className="displ-fl img-link">
                            <div>
                              <img
                                style={{ width: "32px", height: "32px" }}
                                src={check.product_img}
                                alt=""
                              />
                            </div>
                            <a href="">
                              <span>{check.product_name}</span>
                            </a>
                          </div>
                          <span className="price-cart">
                            {formatCurrency(check.product_price)}
                          </span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {userLocal.map((u: ProductData, index) => (
                        <div className="cart-link" key={index}>
                          <div className="displ-fl img-link">
                            <div>
                              <img
                                style={{ width: "32px", height: "32px" }}
                                src={u.product_img}
                                alt=""
                              />
                            </div>
                            <a href="">
                              <span>{u.product_name}</span>
                            </a>
                          </div>
                          <span className="price-cart">
                            {formatCurrency(u.product_price)}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </section>
              </div>
              <div className="right-check">
                <div className="ctn-check">
                  <h2>Summary</h2>
                  {id ? (
                    <>
                      <div>
                        <div className="dpl-fl-m">
                          <div className="div1">
                            <span>Original Price:</span>
                            <span>{formatCurrency(totalPrice)}</span>
                          </div>
                        </div>
                        <div className="divh3">
                          <h3>Total:</h3>
                          <h3>{formatCurrency(totalPrice)}</h3>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="dpl-fl-m">
                          <div className="div1">
                            <span>Original Price:</span>
                            <span>{formatCurrency(totalPriceUSer)}</span>
                          </div>
                        </div>
                        <div className="divh3">
                          <h3>Total:</h3>
                          <h3>{formatCurrency(totalPriceUSer)}</h3>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="linkspan">
                    <span>
                      By completing your purchase you agree to these
                      <a href="">Terms of Service.</a>
                    </span>
                  </div>
                  <button className="btn-checkout" onClick={handlePust}>
                    Compelete Checkout
                  </button>
                  <div className="date">
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
