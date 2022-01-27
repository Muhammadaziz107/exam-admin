import "./category.css";
import Sidebar from "../sidebar/sidebar";
import { useEffect, useState } from "react";

function Category() {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const res = await fetch("http://localhost:4000/category", {
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
    <div className="categories">
      <Sidebar />
      <table>
        <thead>
          <tr>
            <th>Category id</th>
            <th>Category name</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(e => (
              <tr key={e.category_id}>
                <td>{e.category_id}</td>
                <td>{e.category_name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Category;
