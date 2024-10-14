import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: "", name: "" });

  // Fetch users on component mount
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((json) => setUsers(json))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Create a new user
  const createUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const createdUser = await response.json();
      setUsers([...users, createdUser]);
      setNewUser({ id: "", name: "" }); // Clear input fields
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <div>
      <h1>Fetch Data</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} {user.name}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={newUser.id}
          onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="User Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default App;
