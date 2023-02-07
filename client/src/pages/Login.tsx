import { useEffect, useState } from "react";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user.password && user.email) {
      await fetch("http://localhost:1333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          localStorage.setItem("token", res.data);
          location.href = "/"
        });
    }
  }
  useEffect(() => {
    const user = localStorage.getItem("token")
    if(user) {
      location.href = "/"
    }
  })
  return (
    <div>
      <form onSubmit={(e) => login(e)}>
        <h1>Login</h1>

        <div>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => {
              setUser({
                ...user,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              setUser({
                ...user,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>{" "}
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}
