// FormInput Component
import React, { useState, useEffect } from 'react';

import { Button , Card, CardBody, CardFooter, Image} from '@nextui-org/react';

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
export const ImageUpload = ({ onFileDrop, handleFileUpload, fileInputRef, uploadedImageUrls, handleReplaceImage, handleRemoveImage }) => {
    // Generate a unique ID for the file input and label
    const [fileInputId, setFileInputId] = useState(`file-upload-${Math.random().toString(36).substr(2, 9)}`);

    useEffect(() => {
        // Update the ID if needed on re-render/re-init of component
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <div>
            <h3>Images</h3>
            <div className={styles.imageUpload}>
                {/* Uncomment and use <Dropzone onFileDrop={onFileDrop} /> if you have implemented this component */}
                <div className={styles.fileUploadContainer}>
                    <input
                        type="file"
                        id={fileInputId}
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />
                    <Button onPress={() => document.getElementById(fileInputId).click()}>Upload File</Button>
                </div>
            </div>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {uploadedImageUrls.map((url, index) => (
                
                    <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                // width = {300}
                                // height = {200}
                                // width="100%"
                                // alt={item.title}
                                // className="w-full object-cover h-[140px]"
                                className="z-0 w-full h-full object-cover"

                                src={url}
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <Button onPress={() => handleReplaceImage(index)} >Replace</Button>
                            <Button onPress={() => handleRemoveImage(index)} >Remove</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};


// Then use these components in your main component