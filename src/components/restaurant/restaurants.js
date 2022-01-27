import "./restaurants.css";
import Sidebar from "../sidebar/sidebar";
import { useEffect, useState, useRef } from "react";
import closeBtn from "../../assets/images/icon7.png";

function Restaurants() {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const elDiv = useRef(null);
  const elSelect = useRef(null);
  const elName = useRef(null);
  const message = useRef(null);
  const elBtn = useRef(null);

  //allrestaurant
  useEffect(async () => {
    const res = await fetch(`http://localhost:4000/allrestaurants`, {
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

  // category
  useEffect(async () => {
    const res = await fetch(`http://localhost:4000/category`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
      const request = await res.json();
      setDatas(request);
    }
  }, []);

  useEffect(() => {}, [datas]);

  // modal

  const openModal = () => {
    elDiv.current.classList.add("modal--active");
  };
  const handleCloseModal = () => {
    elDiv.current.classList.remove("modal--active");
  };

  //new restaurant
  async function handleCreateNew(evt) {
    evt.preventDefault();

    const res = await fetch("http://localhost:4000/newRestaurant", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: elName.current.value,
        categoryID: elSelect.current.value,
      }),
    });

    if (res.status === 200) {
      message.current.textContent = "created successfully✅";
    }
  }

  //delete restaurant
  async function handleDeleteRestaurant(evt) {
    const res = await fetch("http://localhost:4000/deleteRestaurant", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        restaurantId: evt.target.dataset.id,
      }),
    });
  }

  return (
    <>
      <div className="users restaurants">
        <Sidebar />
        <button className="newRestaurant" onClick={openModal}>
          New
        </button>
        <table>
          <thead>
            <tr>
              <th>Restaurant id</th>
              <th>Restaurant name</th>
              <th>Category id</th>
              <th>Category name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map(e => (
                <tr key={e.restaurant_id}>
                  <td>{e.restaurant_id}</td>
                  <td>{e.restaurant_name}</td>
                  <td>{e.category_id}</td>
                  <td>{e.category_name}</td>
                  <td>
                    <button
                      className="restaurants__delete-btn"
                      onClick={handleDeleteRestaurant}
                      ref={elBtn}
                      data-id={e.restaurant_id}
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

      <div className="modal" ref={elDiv}>
        <form className="modal__form" onSubmit={handleCreateNew}>
          <button className="closeBtn" type="button" onClick={handleCloseModal}>
            <img src={closeBtn} alt="closebtn icon" width={20} height={20} />
          </button>
          <h2 className="modal__form__heading">New Restaurant</h2>
          <h3 className="modal__form__message" ref={message}></h3>
          <select className="modal__form__select" ref={elSelect}>
            {datas &&
              datas.map(e => (
                <option key={e.category_id} value={e.category_id}>
                  {e.category_name}
                </option>
              ))}
          </select>
          <input
            ref={elName}
            className="modal__form__input"
            type="text"
            placeholder="name"
          />
          <button className="modal__form__btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default Restaurants;
