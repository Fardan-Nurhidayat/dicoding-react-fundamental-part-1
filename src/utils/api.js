const BASE_URL = "https://notes-api.dicoding.dev/v1";
const REGISTER_URL = `${BASE_URL}/register`;

export async function registerUser({ name, email, password }) {
  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to register user");
  }
  return data;;
}