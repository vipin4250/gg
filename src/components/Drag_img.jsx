import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import './Drag_img.css';

const Drag_img = () => {
 const [files, setFiles] = useState([]);

 useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
 }, [files]);

 const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    })));
 };

 const handleRemoveFile = (file) => {
    URL.revokeObjectURL(file.preview);
    setFiles(files.filter(f => f !== file));
 };

 return (
    <>
    <div className="container">
      <Dropzone onDrop={handleDrop} accept="image/*" className="dropzone">
        {({ getRootProps, getInputProps }) => (
          <section className='dropzone_2'>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      <aside className='output_screen'>
        <h4>Files:</h4>
        <ul className="file-list">{files.map(file => (
          <li key={file.name}>
            <img src={file.preview} alt={file.name} />
            <p>{file.name} - {file.size} bytes</p>
            <button onClick={() => handleRemoveFile(file)}>Remove</button>
          </li>
        ))}</ul>
      </aside>
    </div>

    <div class="parameter"> 
            <p> this is a paragraph section </p>
    </div>

    </>
 );
};

export default Drag_img;