import React from "react";
import foto from "../img/sobrenosotros.jpg";

const About = () => {
    return (
        <div className="about-page">
            <main>
                <section className="about-section">
                    <section className="about-container">
                        <figure className="about-image">
                            <img src={foto} alt="Descripción de la imagen" />
                        </figure>
                        <section className="about-text">
                            <h2>¿Quiénes somos?</h2>
                            <p>Somos un equipo apasionado por la tecnología, la creatividad y el poder transformador de las imágenes. Desde nuestros inicios, hemos trabajado con un objetivo claro: poner al alcance de todos las mejores herramientas de edición de imágenes, independientemente del nivel de experiencia de cada usuario.</p>
                        </section>
                    </section>
                    
                    <section className="info-cards">
                        <article className="card">
                            <h3>Misión</h3>
                            <p>Nuestra misión es democratizar el acceso a herramientas de edición de imágenes de alta calidad.</p>
                        </article>
                        <article className="card">
                            <h3>Visión</h3>
                            <p>Ser la plataforma líder en edición de imágenes en línea, reconocida por su innovación y creatividad.</p>
                        </article>
                        <article className="card">
                            <h3>Objetivos</h3>
                            <p>Nuestros objetivos incluyen mejorar continuamente nuestras herramientas y ofrecer la mejor experiencia posible.</p>
                        </article>
                    </section>
                </section>
            </main>
        </div>
    );
}

export default About;
