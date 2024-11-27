import React, { useRef, useEffect, useState } from "react";
import ImageFilters from "./ImageFilters";

const Home = () => {
    const fileInputRef = useRef(null);
    const previewImageRef = useRef(null);
    const anchoInputRef = useRef(null);
    const altoInputRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [savedImages, setSavedImages] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('none');

    // Recupera las imágenes guardadas de localStorage cuando la aplicación se carga
    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
        setSavedImages(storedImages);
    }, []);

    useEffect(() => {
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imgURL = e.target.result;
                    const previewImage = previewImageRef.current;
                    previewImage.src = imgURL;
                    previewImage.onload = function () {
                        const imageWidth = previewImage.naturalWidth;
                        const imageHeight = previewImage.naturalHeight;
                        anchoInputRef.current.value = imageWidth;
                        altoInputRef.current.value = imageHeight;
                        previewImage.classList.add('image-loaded');
                    };
                };
                reader.readAsDataURL(file);
            }
        };

        const fileInput = fileInputRef.current;
        fileInput.addEventListener('change', handleFileChange);

        return () => {
            fileInput.removeEventListener('change', handleFileChange);
        };
    }, []);

    useEffect(() => {
        const handleWheel = (event) => {
            event.preventDefault();
            let newScale = scale;
            if (event.deltaY < 0) {
                newScale += 0.1;
            } else {
                newScale -= 0.1;
            }
            setScale(newScale);
            previewImageRef.current.style.transform = `scale(${newScale})`;
        };

        const imageContainer = document.getElementById('imageContainer');
        imageContainer.addEventListener('wheel', handleWheel);

        return () => {
            imageContainer.removeEventListener('wheel', handleWheel);
        };
    }, [scale]);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleDeleteClick = () => {
        const previewImage = previewImageRef.current;
        previewImage.src = '';
        fileInputRef.current.value = '';
        setScale(1);
        previewImage.style.transform = `scale(${scale})`;
        previewImage.style.width = 'auto';
        previewImage.style.height = 'auto';
        anchoInputRef.current.value = '0';
        altoInputRef.current.value = '0';
        previewImage.classList.remove('image-loaded');
        setCurrentFilter('none');
    };

    const handleDownloadClick = () => {
        const formatSelect = document.querySelector('select');
        const format = formatSelect.value.toLowerCase();
        const ancho = parseInt(anchoInputRef.current.value);
        const alto = parseInt(altoInputRef.current.value);
        if (isNaN(ancho) || isNaN(alto) || ancho <= 0 || alto <= 0) {
            alert('Por favor, introduce un ancho y alto válidos.');
            return;
        }
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = ancho;
        canvas.height = alto;
        ctx.filter = currentFilter;
        ctx.drawImage(previewImageRef.current, 0, 0, canvas.width, canvas.height);
        ctx.filter = 'none';
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL(`image/${format}`);
        downloadLink.download = `imagen.${format}`;
        downloadLink.click();
    };

    const handleAnchoInput = () => {
        if (document.getElementById('checkboxMantener').checked) {
            const aspectRatio = previewImageRef.current.naturalWidth / previewImageRef.current.naturalHeight;
            altoInputRef.current.value = Math.round(anchoInputRef.current.value / aspectRatio);
        }
        if (anchoInputRef.current.value > 0) {
            previewImageRef.current.style.width = `${anchoInputRef.current.value}px`;
        }
        if (altoInputRef.current.value > 0) {
            previewImageRef.current.style.height = `${altoInputRef.current.value}px`;
        }
    };

    const handleAltoInput = () => {
        if (document.getElementById('checkboxMantener').checked) {
            const aspectRatio = previewImageRef.current.naturalWidth / previewImageRef.current.naturalHeight;
            anchoInputRef.current.value = Math.round(altoInputRef.current.value * aspectRatio);
        }
        if (anchoInputRef.current.value > 0) {
            previewImageRef.current.style.width = `${anchoInputRef.current.value}px`;
        }
        if (altoInputRef.current.value > 0) {
            previewImageRef.current.style.height = `${altoInputRef.current.value}px`;
        }
    };

    const handleSaveClick = () => {
        const imgSrc = previewImageRef.current.src;
        const ancho = anchoInputRef.current.value;
        const alto = altoInputRef.current.value;

        if (imgSrc) {
            const newImages = [
                ...savedImages,
                { src: imgSrc, ancho: parseInt(ancho), alto: parseInt(alto), filter: currentFilter }
            ];
            setSavedImages(newImages);
            localStorage.setItem("savedImages", JSON.stringify(newImages));
            handleDeleteClick();
        }
    };

    const handleSelectSavedImage = (image) => {
        previewImageRef.current.src = image.src;
        anchoInputRef.current.value = image.ancho;
        altoInputRef.current.value = image.alto;
        previewImageRef.current.onload = function () {
            const previewImage = previewImageRef.current;
            previewImage.classList.add('image-loaded');
            previewImage.style.width = `${image.ancho}px`;
            previewImage.style.height = `${image.alto}px`;
        };
        previewImageRef.current.style.filter = image.filter;
        setCurrentFilter(image.filter);
    };

    const handleDeleteSavedImage = (index) => {
        const newImages = savedImages.filter((_, i) => i !== index);
        setSavedImages(newImages);
        localStorage.setItem("savedImages", JSON.stringify(newImages));
    };

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
        previewImageRef.current.style.filter = filter;
    };

    return (
        <div className="home-page">
            <main>
                <section className="container">
                    <div className="panels">
                        <article className="panel-left">
                            <h2>Cargar Imagen</h2>
                            <button id="btnUpload" className="btn-upload" onClick={handleUploadClick}>
                                Seleccionar Archivo <i className="fas fa-file-upload"></i>
                            </button>
                            <input type="file" id="archivo" accept="image/*" style={{ display: "none" }} ref={fileInputRef} />
                            <h2>Tipo de Imagen</h2>
                            <select>
                                <option value="PNG">PNG</option>
                                <option value="JPG">JPG</option>
                            </select>
                            <button className="btn-download" onClick={handleDownloadClick}>
                                Descargar <i className="fas fa-download"></i>
                            </button>
                            <button className="btn-save" onClick={handleSaveClick}>
                                Guardar <i className="fas fa-save"></i>
                            </button>
                        </article>
                        <article className="panel-center">
                            <div className="image-container" id="imageContainer">
                                <img id="preview" ref={previewImageRef} style={{ maxWidth: "100%", maxHeight: "100%", transform: `scale(${scale})`, filter: currentFilter }} />
                            </div>
                            <ImageFilters onFilterChange={handleFilterChange} currentFilter={currentFilter} />
                        </article>
                        <article className="panel-right">
                            <h2>Ancho</h2>
                            <label>
                                <input className="input_numeros" type="number" name="ancho" defaultValue="0" ref={anchoInputRef} onInput={handleAnchoInput} /> px
                            </label>
                            <h2>Alto</h2>
                            <label>
                                <input type="number" name="alto" defaultValue="0" ref={altoInputRef} onInput={handleAltoInput} /> px
                            </label>
                            <label>
                                <input type="checkbox" name="mantener_relacion" id="checkboxMantener" defaultChecked />
                                Mantener Relación de Aspecto
                            </label>
                            <button className="btn-delete" onClick={handleDeleteClick}>
                                Eliminar <i className="fas fa-trash"></i>
                            </button>
                        </article>
                    </div>
                    <section className="saved-images">
                        <h2>Imágenes Guardadas</h2>
                        {savedImages.length > 0 ? (
                            <ul>
                                {savedImages.map((image, index) => (
                                    <li key={index}>
                                        <img src={image.src} alt={`Imagen guardada ${index + 1}`} style={{ width: '100px', height: 'auto', filter: image.filter }} />
                                        <button className="btn-select-save" onClick={() => handleSelectSavedImage(image)}>Seleccionar</button>
                                        <button className="btn-delete-save" onClick={() => handleDeleteSavedImage(index)}>Eliminar</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay imágenes guardadas.</p>
                        )}
                    </section>
                </section>
            </main>
        </div>
    );    
};

export default Home;

