import React, { useState } from "react";
import { signup } from "../../api";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  // const []
  const onSubmit = (event) => {
    event.preventDefault();

    if (isValidUser) {
      const user = {
        username: username,
        password: password,
      };

      signup(user)
        .then((user) => {
          console.log("user: ", user);
          if (user) {
            props.history.push("/signin");
          }
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  };

  const isValidUser = () => {
    return username.length >= 8 && password === confirmPassword;
  };

  const onUserNameEntered = (event) => {
    setUsername(event.target.value);
  };

  const onPasswordEntered = (event) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordEntered = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div class={"container"}>
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit}>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            aria-describedby="usernamehelp"
            placeholder="Enter Username"
            required
            onChange={onUserNameEntered}
            value={username}
          />
          <small id="usernameHelp" class="text-white form-text">
            Username must be atleast 8 characters.
          </small>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            required
            onChange={onPasswordEntered}
            value={password}
          />
          <small id="passwordHelp" class="text-white form-text">
            Password must be atleast 8 characters long.
          </small>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={onConfirmPasswordEntered}
            value={confirmPassword}
          />

          <small id="confirmPasswordHelp" class="text-white form-text">
            Please Confirm your password.
          </small>
        </div>

        <button type="submit" class="btn btn-primary mt-2">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignUp;
