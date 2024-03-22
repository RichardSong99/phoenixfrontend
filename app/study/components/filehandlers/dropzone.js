import React, { useCallback } from 'react';
import styles from './dropzone.module.css';

const Dropzone = ({ onFileDrop }) => {
    const onDrop = useCallback((event) => {
        event.preventDefault();

        // If there are multiple files, handle them here
        const file = event.dataTransfer.files[0];

        // Handle file upload here
        onFileDrop(file);
    }, [onFileDrop]);

    const onDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            className={styles.dropzone}
        >
            Drop files here
        </div>
    );
};

export default Dropzone;