import React from 'react';
import Checkmark from '../../assets/components/Checkmark.svg';
import Image from 'next/image';
import styles from './filtercomponents.module.css';

export const FilterChip = ({ label, num, selected, onClick }) => {
    return (
        <div className={selected ? styles.filterChipSelected : styles.filterChip} onClick={onClick}>
            {selected && <Image src={Checkmark} alt="Checkmark" />}
            {!selected && `+ `}
            {label} {num && `(${num})`}
        </div>
    )
}