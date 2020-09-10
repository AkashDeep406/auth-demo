const SIGNUP_URL = "http://localhost:5000/auth/signup";
const SIGNIN_URL = "http://localhost:5000/auth/signin";
const BASE_URL = "http://localhost:5000/";
export const signup = async (body) => {
  try {
    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return Promise.reject(response.status);
    }
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (body) => {
  try {
    const response = await fetch(SIGNIN_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return Promise.reject(response.status);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addNotes = async (body) => {
  try {
    const response = await fetch(`${BASE_URL}api/v1/notes`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.token}`,
      },
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return Promise.reject(response.status);
    }
  } catch (error) {
    console.log("addNotes ERROR: ", error);
  }
};
