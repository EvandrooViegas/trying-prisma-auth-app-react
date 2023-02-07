import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("No Data")
  const [isLoading, setIsLoading] = useState(false)
  const user = localStorage.getItem("token")
  if(!user) location.href = "/login"
  useEffect(() => {

    setIsLoading(true)
    fetch("http://localhost:1333/users")
    .then(res => res.json())
    .then(res => {
      setIsLoading(false)
      setData(res.data)
    })
  }, [])

  if(isLoading) {
    return (
      <>
      <p>Loading Data...</p>
      </>
    )
  }
  console.log(data)
  return (
    <div>
      {data.map((user) => (
        <>
        <p>Name: {user.name}</p>  
        <p>Email: {user.email}</p>  
        <p>Password: {user.password}</p>  
        <hr />
        </>
      ))}
    </div>
  )
}
