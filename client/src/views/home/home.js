import React from "react";

const Home = (props) => {
  const onSignIn = () => {
    props.history.push("/signin");
  };

  const onSignUp = () => {
    props.history.push("/signup");
  };

  return (
    <div>
      {/**Container Main */}
      <div class="jumbotron container">
        <h1 class="display-3">Hello, world!</h1>
        <p class="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr class="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <div class="d-flex flex-row justify-content-center">
          <p class="lead mr-2">
            <button class="btn btn-primary btn-lg" onClick={onSignIn}>
              Sign In
            </button>
          </p>
          <p class="lead mr-2">
            <button class="btn btn-primary btn-lg" onClick={onSignUp}>
              Sign Up
            </button>
          </p>
        </div>
      </div>

      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  );
};

export default Home;
