import { useRef } from "react";
import { useNavigate } from "react-router";

import "./login.css";

function Login() {
  const elName = useRef(null);
  const elPassword = useRef(null);

  const navigate = useNavigate();

  async function handleLogin(evt) {
    evt.preventDefault();

    const res = await fetch("http://localhost:4000/admin", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: elName.current.value,
        password: elPassword.current.value,
      }),
    });

    if (res.status === 200) {
      const { token } = await res.json();
      window.localStorage.setItem("token", JSON.stringify(token));
      navigate("/");
    }
  }

  return (
    <div className="login__body">
      <div className="login-page">
        <div className="login">
          <h1 className="login__heading">Login</h1>
          <form onSubmit={handleLogin}>
            <input
              className="login__email"
              type="text"
              placeholder="username"
              name="name"
              ref={elName}
            />
            <input
              className="login__passwrod"
              type="password"
              placeholder="password"
              name="password"
              ref={elPassword}
            />
            <button type="submit" className="login__btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
