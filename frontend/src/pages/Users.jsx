import { useEffect, useState } from "react"
import axios from "axios"

const Users = () => {
  const [isLoading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    console.log("effect")
    let query = searchText ? `?username=${searchText}` : ""
    axios.get(`http://localhost:5000/api/auth/users${query}`).then((res) => {
      setUsers(res.data.users)
      setLoading(false)
    })
  }, [searchText])

  const onChange = (e) => {
    setSearchText(e.target.value)
  }

  // const searchOnClick = () => {
  //   setLoading(true)
  //   axios
  //     .get(`http://localhost:5000/api/auth/users?username=${searchText}`)
  //     .then((res) => {
  //       setUsers(res.data.users)
  //       setLoading(false)
  //     })
  // }

  return (
    <main>
      <div>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search Username"
          className="p-2 m-2 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-dark-red focus:bg-white caret-dark-red"
          onChange={onChange}
        />
        {/* <button onClick={searchOnClick}>search</button> */}
      </div>
      {isLoading ? (
        <div>Loading ....</div>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default Users
