// FormInput Component
import React from 'react';

import styles from './formcomponents.module.css';
import Dropzone from '@/app/helper/components/basecomponents/filehandlers/dropzone';

export const FormInput = ({ label, value, onChange, required }) => (
    <label>
        {label}:
        <input type="text" value={value} onChange={onChange} required={required} />
    </label>
);

// SelectInput Component
export const SelectInput = ({ label, value, onChange, options, required }) => (
    <label>
        {label}:
        <select value={value} onChange={onChange} required={required}>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </label>
);

// TextAreaInput Component
export const TextAreaInput = ({ label, value, onChange, required }) => (
    <label>
        {label}:
        <textarea className={styles.niceTextarea} value={value} onChange={onChange} required={required} />
    </label>
);

// ImageUpload Component
export const ImageUpload = ({ onFileDrop, handleFileUpload, fileInputRef, uploadedImageUrls, handleReplaceImage, handleRemoveImage }) => (
    <div className={styles.totalImageArea}>
        <h3>Images</h3>
        <div className={styles.imageUpload}>
            <Dropzone onFileDrop={onFileDrop} />
            <div className={styles.fileUploadContainer}>
                <input type="file" id="fileUpload" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} className={styles.inputTag} />
                <label htmlFor="fileUpload" className={styles.roundButton}>Upload Image</label>
            </div>
        </div>
        <div className={styles.imageContainer}>
            {uploadedImageUrls.map((url, index) => (
                <div key={index}>
                    <img src={url} alt={`Uploaded ${index}`} />
                    <div className={styles.imageButtons}>
                        <p>{`IMG${index + 1}`}</p>
                        <button onClick={() => handleReplaceImage(index)} className={styles.replaceImgButton}>Replace</button>
                        <button onClick={() => handleRemoveImage(index)} className={styles.removeImgButton}>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Then use these components in your main component