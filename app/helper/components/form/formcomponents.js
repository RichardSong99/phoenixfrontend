// FormInput Component
"use client"

import React, { useState, useEffect, useRef } from 'react';
import FileService from '@/app/helper/apiservices/fileservice';

import { Button, Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';

import Image from 'next/image';

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
export const ImageUpload = ({ uploadedImageUrls, setUploadedImageUrls, onChangeLocalImages }) => {
    // Generate a unique ID for the file input and label
    const [fileInputId, setFileInputId] = useState(`file-upload-${Math.random().toString(36).substr(2, 9)}`);
    const [localImages, setLocalImages] = useState([]);  // Store the images with preview

    const fileInputRef = useRef(null);

    useEffect(() => {
        // Initialize localImages with uploadedImageUrls if provided
        if (uploadedImageUrls && uploadedImageUrls.length > 0) {
            const initialImages = uploadedImageUrls.map(url => ({
                file: null,  // No file object available for pre-uploaded images
                preview: url // Use the URL as the preview
            }));
            setLocalImages(initialImages);
        }
    }, [uploadedImageUrls]);

    const updateImages = (newImages) => {
        setLocalImages(newImages);
        if (onChangeLocalImages) {
            onChangeLocalImages(newImages);
        }
    }

    const handleAddImage = (event) => {
        // Log when the function is triggered
        console.log("Handling image addition...");

        // Convert FileList to an array of files
        const files = Array.from(event.target.files);
        console.log("Selected files:", files);  // Log the array of files

        // Map each file to an object containing the file and a URL for preview
        const imagesWithPreview = files.map(file => {
            const previewUrl = URL.createObjectURL(file);
            console.log(`Generated preview URL for ${file.name}:`, previewUrl);  // Log each generated preview URL
            return { file, preview: previewUrl };
        });

        // Update local images state with the new images and their previews
        updateImages([...localImages, ...imagesWithPreview]);
    };


    const handleRemoveImage = (index) => {
        if (window.confirm('Are you sure you want to remove ths image?')) {
            const updatedImages = localImages.filter((_, i) => i !== index);
            updateImages(updatedImages);
        }
    };

    const handleUploadAllImages = async () => {
        const uploadedUrls = [];

        for (let image of localImages) {
            try {
                const url = await FileService.uploadFile(image.file); // Assumes FileService.uploadFile returns a promise resolving to the URL
                uploadedUrls.push(url);
                URL.revokeObjectURL(image.preview); // Clean up the local preview URL
            } catch (error) {
                console.error('Upload failed for an image:', error);
                alert('Failed to upload some images. Please try again.');
                return; // Stop execution and handle the error as needed
            }
        }

        setUploadedImageUrls(uploadedUrls); // Update parent component state only after all images are uploaded successfully
    };


    return (
        <div >
            <h5 className="text-lg font-bold mb-4">Images</h5>
            <div className="flex items-center gap-2 mb-5">
                <input
                    type="file"
                    id={fileInputId}
                    ref={fileInputRef}
                    onChange={handleAddImage}
                    className="hidden"
                />
                <Button onClick={() => fileInputRef.current.click()} >
                    Add File
                </Button>
                {localImages.length !== 0 && (
                    <Button onClick={handleUploadAllImages} >
                        Upload All Images
                    </Button>
                )}
            </div>
            <div className="flex flex-wrap gap-4">
                {localImages.map((image, index) => (
                    <Card key={index} className="w-60 shadow-sm" isPressable onPress={() => console.log("item pressed")}>
                        <CardBody className="p-0 overflow-hidden">
                            <img

                                src={image.preview}
                                alt={`Preview ${index}`}
                                className="w-full h-auto object-cover rounded-t-lg"
                            />
                        </CardBody>
                        <CardFooter className="flex justify-between text-xs">
                            <Button onClick={() => handleRemoveImage(index)} >
                                Remove
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};


// Then use these components in your main component