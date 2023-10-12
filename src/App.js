import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const CifradoCesar = () => {
  const [textoEntrada, setTextoEntrada] = useState('');
  const [textoCifrado, setTextoCifrado] = useState('');
  const [textoDescifrado, setTextoDescifrado] = useState('');
  const [error, setError] = useState('');

  const esLetraValida = (caracter) => {
    return /^[a-zA-Z]+$/.test(caracter);
  };

  const cesar = (alfabeto, entrada, desplazamiento) => {
    let resultado = "";
    for (let i = 0; i < entrada.length; i++) {
      const caracter = entrada[i];
      if (esLetraValida(caracter)) {
        for (let j = 0; j < alfabeto.length; j++) {
          if (caracter === alfabeto[j]) {
            let nuevoIndice = (j + desplazamiento) % 26;
            if (nuevoIndice < 0) nuevoIndice += 26;
            resultado += alfabeto[nuevoIndice];
          }
        }
      } else {
        setError("¡Ingresa solo letras del alfabeto!");
        return "";
      }
      if (entrada[i] === " ") {
        resultado += " ";
      }
    }
    setError("");
    return resultado;
  };

  const manejarCambioEntrada = (e) => {
    setTextoEntrada(e.target.value);
    setError(""); // Limpiar el mensaje de error al realizar un nuevo input.
  };

  const cifrarTexto = () => {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    const resultado = cesar(alfabeto, textoEntrada.toLowerCase(), 5);
    if (resultado !== "") {
      setTextoCifrado(resultado);
    }
  };

  const descifrarTexto = () => {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    const resultado = cesar(alfabeto, textoEntrada.toLowerCase(), -5);
    if (resultado !== "") {
      setTextoDescifrado(resultado);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Cifrado/Descifrado César</h1>
      <div className="form-group">
        <label htmlFor="textoEntrada">Texto a cifrar o descifrar:</label>
        <input
          type="text"
          className="form-control mb-2"
          id="textoEntrada"
          value={textoEntrada}
          onChange={manejarCambioEntrada}
        />
      </div>
      <button className="btn btn-outline-info mr-6" onClick={cifrarTexto}>Cifrar</button>
      <button className="btn btn-outline-dark ml-2" onClick={descifrarTexto}>Descifrar</button>
      {error && <p className="text-danger mt-2">{error}</p>}
      <div className="form-group mt-3">
        <label>Resultado:</label>
        <p><strong>Texto Cifrado:</strong></p>
        <p>{textoCifrado}</p>
        <p><strong>Texto Descifrado:</strong></p>
        <p>{textoDescifrado}</p>
      </div>
    </div>
  );
};

export default CifradoCesar;
