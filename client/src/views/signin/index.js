import React, { useState } from "react";
import { signin } from "../../api";

const SignIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsername = (event) => {
    setUsername(event.target.value);
  };
  const onPassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    signin(user)
      .then((user) => {
        if (user.token) {
          localStorage.token = user.token;
          props.history.push("/dashboard");
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div class={"container"}>
      <h2>Sign In</h2>
      <form onSubmit={onSubmit}>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            aria-describedby="usernamehelp"
            placeholder=" Username"
            onChange={onUsername}
            value={username}
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            onChange={onPassword}
            value={password}
            required
          />
        </div>

        <button type="submit" class="btn btn-primary mt-2">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
