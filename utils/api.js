export async function fetchAPI(endpoint, options = {}) {
    const res = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TOKEN}`,
        ...options.headers,
      },
    });
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
  
    const data = await res.json();
    return data;
  }