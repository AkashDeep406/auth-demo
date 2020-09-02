const SIGNUP_URL = "http://localhost:5000/auth/signup";
const signup = async (body) => {
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
export default signup;
