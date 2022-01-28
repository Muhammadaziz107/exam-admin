import "./orders.css";
import Sidebar from "../sidebar/sidebar";
import { useEffect, useState } from "react";

function Orders() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const res = await fetch("http://localhost:4000/orders", {
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
    <div className="users">
      <Sidebar />
      <table>
        <thead>
          <tr>
            <th>Order id</th>
            <th>User name</th>
            <th>Order address</th>
            <th>User phone</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(e => (
              <tr key={e.order_id}>
                <td>{e.order_id}</td>
                <td>{e.user_name}</td>
                <td>{e.order_address}</td>
                <td>{e.user_phone}</td>
                <td>
                  <button className="restaurants__delete-btn" data-id={e.restaurant_id}>
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
