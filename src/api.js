const API_URL = 'http://localhost:5000/api';

export const fetchTrades = async () => {
  const response = await fetch(`${API_URL}/trades`);
  if (!response.ok) throw new Error('Failed to fetch trades');
  return response.json();
};

export const createTrade = async (trade) => {
  const response = await fetch(`${API_URL}/trades`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trade),
  });
  if (!response.ok) throw new Error('Failed to create trade');
  return response.json();
};

export const deleteTrade = async (id) => {
  const response = await fetch(`${API_URL}/trades/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete trade');
  return response.json();
};
