export async function obteinWeather() {
  const geoRes = await fetch("http://ip-api.com/json/");
  const geoData = await geoRes.json();

  const lat = geoData.lat;
  const lon = geoData.lon;

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  const weatherData = await weatherRes.json();

  // console.log(`Ubicación: ${geoData.city}, ${geoData.country}`);
  // console.log(`Temperatura: ${weatherData.current_weather.temperature}°C`);
  return `Ubicación: ${geoData.city}, ${geoData.country} Temperatura: ${weatherData.current_weather.temperature}°C`;
}

export async function getFullWeatherData() {
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  // Obtener ubicación
  const geoRes = await fetch("http://ip-api.com/json/");
  const geoData = await geoRes.json();
  const lat = geoData.lat;
  const lon = geoData.lon;

  // Obtener datos climáticos incluyendo probabilidad de lluvia
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&daily=temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max&timezone=auto`
  );
  const weatherData = await weatherRes.json();
  const daily = weatherData.daily;

  // Función para describir nivel UV
  function descripcionUV(uv) {
    if (uv < 3) return "Bajo";
    if (uv < 6) return "Moderado";
    if (uv < 8) return "Alto";
    if (uv < 11) return "Muy alto";
    return "Extremo";
  }

  // Armar pronóstico con probabilidad de lluvia
  const forecast = daily.time.map((fechaStr, i) => {
    const fecha = new Date(fechaStr + "T12:00:00"); // evita desajuste horario
    const diaSemana = diasSemana[fecha.getDay()];
    const uv = daily.uv_index_max[i];
    const lluviaProb = daily.precipitation_probability_max[i]; // agrego probabilidad lluvia

    return {
      fecha: fechaStr,
      diaSemana: diaSemana,
      temp_max: daily.temperature_2m_max[i],
      temp_min: daily.temperature_2m_min[i],
      uv_index_max: uv,
      uv_descripcion: descripcionUV(uv),
      probabilidad_lluvia: lluviaProb, // probabilidad lluvia %
    };
  });

  return {
    ubicacion: {
      ciudad: geoData.city,
      pais: geoData.country,
      latitud: lat,
      longitud: lon,
    },
    pronostico_semanal: forecast,
  };
}

