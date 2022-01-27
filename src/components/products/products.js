import "./products.css";
import Sidebar from "../sidebar/sidebar";
import { useEffect, useState, useRef } from "react";
import closeBtn from "../../assets/images/icon7.png";

function Products() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const res = await fetch("http://localhost:4000/allProducts", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      const request = await res.json();
      setData(request);
    }
  }, []);

  useEffect(() => {}, [data]);

  return (
    <>
      <div className="users">
        <Sidebar />
        <button className="newRestaurant">New</button>
        <table>
          <thead>
            <tr>
              <th>Product id</th>
              <th>Product name</th>
              <th>Product price</th>
              <th>Restaurant name</th>
              <th>Category name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map(e => (
                <tr key={e.product_id}>
                  <td>{e.product_id}</td>
                  <td>{e.product_name}</td>
                  <td>{e.product_price} so'm</td>
                  <td>{e.restaurant_name}</td>
                  <td>{e.category_name}</td>
                  <td>
                    <button className="restaurants__delete-btn" type="button">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ========= */}

      <div className="modal ">
        <form className="modal__form">
          <button className="closeBtn" type="button">
            <img src={closeBtn} alt="closebtn icon" width={20} height={20} />
          </button>
          <h2 className="modal__form__heading">New Restaurant</h2>
          <h3 className="modal__form__message"></h3>
          <select className="modal__form__select">
            {/* {datas &&
              datas.map(e => (
                <option key={e.category_id} value={e.category_id}>
                  {e.category_name}
                </option>
              ))} */}
          </select>
          <input className="modal__form__input" type="text" placeholder="name" />
          <button className="modal__form__btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default Products;
