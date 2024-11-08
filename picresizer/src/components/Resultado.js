import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Resultado = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state?.formData;


    if (!formData) {
        return (
            <div>
                <p>No se encontraron datos. Redirigiendo al formulario...</p>
                <button onClick={() => navigate('/contacto')}>Ir al formulario de contacto</button>
            </div>
        );
    }

    return (
        <div  class="formulario" >
            <h2 class="titulo-respuesta"> Resultado del Formulario de Contacto</h2>
            <div  class="respuestas" >
                <p class="respuesta"><strong>Nombre:</strong> {formData.nombre}</p>
                <p class="respuesta"><strong>Apellido:</strong> {formData.apellido}</p>
                <p class="respuesta"><strong>Email:</strong> {formData.email}</p>
                <p class="respuesta"><strong>Teléfono:</strong> {formData.telefono}</p>
                <p class="respuesta"><strong>Método de contacto preferencial:</strong> {formData.metodoContacto}</p>
                <p class="respuesta"><strong>Mensaje:</strong> {formData.mensaje}</p>
            </div>
            <button class="boton-respuesta" onClick={() => navigate('/Contact')}>Volver al formulario</button>
        </div>
    );
};

export default Resultado;
