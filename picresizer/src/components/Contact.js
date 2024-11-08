import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        metodoContacto: '',
        mensaje: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/Resultado', { state: { formData } });
    };

    return (
        <div className="contenedor">
            <div className="form-container">
                <h2 className="titulo-contacto">Contáctanos:</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="apellido"
                            placeholder="Apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="telefono"
                            placeholder="Teléfono"
                            value={formData.telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <select
                            name="metodoContacto"
                            value={formData.metodoContacto}
                            onChange={handleChange}
                        >
                            <option value="">Método de contacto preferencial?</option>
                            <option value="Email">Email</option>
                            <option value="Telefono">Teléfono</option>
                        </select>
                    </div>
                    <textarea
                        name="mensaje"
                        placeholder="Mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                    ></textarea>
                    <button type="submit">ENVIAR</button>
                </form>
            </div>
            <div className="contact-info">
                <h3>Información de Contacto</h3>
                <p>Av. Tte Gral Juan Domingo Perón 2444, Valentín Alsina (Lanús)</p>
                <p>+54 9 11 2272-6053</p>
                <p>checasacas@gmail.com</p>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
