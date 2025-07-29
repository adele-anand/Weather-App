interface tempParams {
  latitude: number;
  longitude: number;
}

async function getCurrentTemp(params: tempParams): Promise<Response> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');

  const queryParams = new URLSearchParams();
  queryParams.append('latitude', params.latitude.toString());
  queryParams.append('longitude', params.longitude.toString());

  queryParams.append('current', 'temperature_2m');
  queryParams.append('forecast_days', '1');

  url.search = queryParams.toString();
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Response = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
