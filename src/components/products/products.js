import "./products.css";
import Sidebar from "../sidebar/sidebar";
import { useEffect, useState, useRef } from "react";
import closeBtn from "../../assets/images/icon7.png";

function Products() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const elName = useRef(null);
  const elPrice = useRef(null);
  const elSelectCategory = useRef(null);
  const elSelectRestaurant = useRef(null);
  const message = useRef(null);
  const elDiv = useRef(null);
  const elImg = useRef(null);

  //all products
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

  //new product
  async function handleCreateNew(evt) {
    evt.preventDefault();

    const res = await fetch("http://localhost:4000/newProduct", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: elName.current.value,
        price: elPrice.current.value,
        categoryID: elSelectCategory.current.value,
        restaurantID: elSelectRestaurant.current.value,
        img: elImg.current.value,
      }),
    });

    if (res.status === 200) {
      message.current.textContent = "created successfully✅";
    }
  }

  //category

  useEffect(async () => {
    const res = await fetch("http://localhost:4000/category", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      const request = await res.json();
      setCategory(request);
    }
  }, []);

  useEffect(() => {}, [category]);

  //restaurant

  useEffect(async () => {
    const res = await fetch("http://localhost:4000/allrestaurants", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      const request = await res.json();
      setRestaurant(request);
    }
  }, []);

  useEffect(() => {}, [restaurant]);

  //modal
  const openModal = () => {
    elDiv.current.classList.add("modal--active");
  };
  const handleCloseModal = () => {
    elDiv.current.classList.remove("modal--active");
  };

  //delete product

  async function handleDeleteProduct(evt) {
    const res = await fetch("http://localhost:4000/deleteProduct", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        productId: evt.target.dataset.id,
      }),
    });
  }

  return (
    <>
      <div className="users">
        <Sidebar />
        <button className="newRestaurant" onClick={openModal}>
          New
        </button>
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
                    <button
                      className="restaurants__delete-btn"
                      type="button"
                      onClick={handleDeleteProduct}
                      data-id={e.product_id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ========= */}

      <div className="modal modal__product" ref={elDiv}>
        <form className="modal__form" onSubmit={handleCreateNew}>
          <button className="closeBtn" type="button" onClick={handleCloseModal}>
            <img src={closeBtn} alt="closebtn icon" width={20} height={20} />
          </button>
          <h2 className="modal__form__heading">New Product</h2>
          <h3 className="modal__form__message" ref={message}></h3>
          <select className="modal__form__select" ref={elSelectCategory}>
            {category &&
              category.map(e => (
                <option key={e.category_id} value={e.category_id}>
                  {e.category_name}
                </option>
              ))}
          </select>
          <select className="modal__form__select" ref={elSelectRestaurant}>
            {restaurant &&
              restaurant.map(e => (
                <option key={e.restaurant_id} value={e.restaurant_id}>
                  {e.restaurant_name}
                </option>
              ))}
          </select>
          <input
            className="modal__form__input"
            type="text"
            placeholder="name"
            ref={elName}
          />
          <input
            className="modal__form__input"
            type="text"
            placeholder="price"
            ref={elPrice}
          />
          <input
            className="modal__form__input"
            type="text"
            placeholder="img url"
            ref={elImg}
          />
          <button className="modal__form__btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default Products;
