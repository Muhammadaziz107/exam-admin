import "./users.css";
import Sidebar from "../sidebar/sidebar";
import { useEffect, useState } from "react";

function Users() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const res = await fetch("http://localhost:4000/users", {
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
            <th>User id</th>
            <th>User name</th>
            <th>User password</th>
            <th>User phone</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(e => (
              <tr key={e.user_id}>
                <td>{e.user_id}</td>
                <td>{e.user_name}</td>
                <td>{e.user_password}</td>
                <td>{e.user_phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
