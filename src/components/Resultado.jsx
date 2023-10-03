import useClima from "../hooks/useClima";

const Resultado = () => {
  const { resultado } = useClima();
  const { name } = resultado;
  return (
    <div>
      Resultado
      <h2>El clima de {name} es</h2>
    </div>
  );
};

export default Resultado;
