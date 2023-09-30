import { useState, createContext } from "react";
import axios from "axios";
const ClimaContext = createContext();

const ClimaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  const datosBusqueda = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };
  const consultarClima = async (datos) => {
    const { ciudad, pais } = datos;
    try {
      const appid = import.meta.env.VITE_API_KEY;
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appid}`;

      const { data } = await axios(url);
      const { lat, lon } = data[0];
      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`;
      const { data: clima } = await axios(urlClima);
      console.log(clima);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ClimaContext.Provider value={{ busqueda, datosBusqueda, consultarClima }}>
      {children}
    </ClimaContext.Provider>
  );
};
export { ClimaProvider };
export default ClimaContext;
