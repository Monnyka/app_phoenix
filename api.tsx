const API_URL: any = "https://uat.monnyka.top/api/v1/login"; // Replace 'your-api-url' with your actual API URL

const callLoginApi = async (email: any, password: any) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log(data);

    return data; // Assuming your API returns some data upon successful login
  } catch (error) {
    throw new Error("Login failed");
  }
};

export default callLoginApi;
