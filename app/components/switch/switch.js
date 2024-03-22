import React from 'react';
import SwitchOn from '../../assets/components/Switch-on.svg';
import SwitchOff from '../../assets/components/Switch-off.svg'; 
import Image from 'next/image';

export const Switch = ({ text, checked, setChecked }) => {
    return (
        <div onClick={() => setChecked(!checked)}>
            {checked ?
                <Image src={SwitchOn} alt="on" /> :
                <Image src={SwitchOff} alt="off" />
            }
            <label>{text}</label>
        </div>
    )
}
    