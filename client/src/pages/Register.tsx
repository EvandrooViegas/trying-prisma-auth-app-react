import axios from "axios";
import { useEffect, useState } from "react";
import { useRoutes, redirect } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user.name && user.password && user.email) {
      await fetch("http://localhost:1333/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
        }),
      })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem("token", res.data)
        location.href = "/login"
      })
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("token")
    if(user) {
      location.href = "/"
    }
  })
  return (
    <form onSubmit={(e) => create(e)}>
      <h1>Create a account</h1>
      <div>
        <label htmlFor="name">Name: </label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => {
            setUser({
              ...user,
              [e.target.name]: e.target.value,
            });
          }}
        />
      </div>
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
  );
}
