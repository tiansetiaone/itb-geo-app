const BASE_URL = "http://localhost:5000/api"; // Sesuaikan dengan backend

// Fungsi umum untuk menangani request
const fetchAPI = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Terjadi kesalahan pada server");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    return { error: error.message };
  }
};

export const createBuilding = async (buildingData, token) => {
  return fetch(`${BASE_URL}/buildings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(buildingData),
  }).then((res) => res.json());
};


// GET all buildings
export const getBuildings = async () => {
  return fetchAPI(`${BASE_URL}/buildings`);
};

// GET building by ID
export const getBuildingById = async (id) => {
  if (!id) {
    console.error("ID tidak valid untuk fetch building");
    return { error: "ID tidak valid" };
  }

  const response = await fetch(`${BASE_URL}/buildings/${id}`);
  const data = await response.json();

  if (!response.ok) {
    console.error(`Error mengambil data bangunan (ID: ${id}):`, data.message);
  }

  return data;
};


// PUT update building status (Perlu token)
export const updateBuilding = async (id, updatedData, token) => {
  return fetchAPI(`${BASE_URL}/buildings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
};

// DELETE building (Perlu token)
export const deleteBuilding = async (id, token) => {
  return fetchAPI(`${BASE_URL}/buildings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// GET weather by coordinates
export const getWeatherByCoords = async (lat, lon) => {
  return fetchAPI(`${BASE_URL}/buildings/weather/${lat}/${lon}`);
};

// Register user
export const registerUser = async (userData) => {
  return fetchAPI(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json(); // Pastikan membaca respons sebagai JSON

    console.log("Response dari server:", data); // Debugging respons

    if (!response.ok) {
      throw new Error(data.message || "Login gagal.");
    }

    return data;
  } catch (error) {
    console.error("Error saat login:", error.message);
    return { error: error.message };
  }
};


