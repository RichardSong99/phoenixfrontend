// ViewToggle.js
import React from 'react';
import Image from 'next/image'; // Import the Image component from Next.js
import GridIcon from '../../assets/components/Grid-icon.svg';
import GridIconWhite from '../../assets/components/Grid-icon-white.svg';
import TableIcon from '../../assets/components/Table-icon.svg';
import TableIconWhite from '../../assets/components/Table-icon-white.svg';
import styles from './viewtoggle.module.css';

export  const ViewToggle = ({ displayMode, onDisplayModeChange }) => {
    return (
        <div className={styles.viewToggle}>
            <div 
                className={`${styles.button} ${displayMode === 'table' ? styles.active : ''}`} 
                onClick={() => onDisplayModeChange('table')}
            >
                <Image src={displayMode === 'table' ? TableIconWhite : TableIcon} alt="Table view" width={24} height={24} /> {/* Use the Image component */}
            </div>
            <div 
                className={`${styles.button} ${displayMode === 'grid' ? styles.active : ''}`} 
                onClick={() => onDisplayModeChange('grid')}
            >
                <Image src={displayMode === 'grid' ? GridIconWhite : GridIcon} alt="Grid view" width={24} height={24} /> {/* Use the Image component */}
            </div>
        </div>
    );
}