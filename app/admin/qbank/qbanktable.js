import { DataContext } from '@/app/helper/context/datacontext';
import React, { useContext } from 'react';
import styles from './qbanktable.module.css';

export default function QbankTable() {

    const {loading, difficultyStats} = useContext(DataContext);

    return (
        !loading && difficultyStats && (
        <div>
            <table className = {styles.topicTable}>
                <thead>
                    <tr>
                        <td>Topic</td>
                        <td>Easy</td>
                        <td>Medium</td>
                        <td>Hard</td>
                        <td>Extreme</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    {difficultyStats.map((stat, index) => (
                        <tr key={index}>
                            <td>{stat.topic}</td>
                            <td>{stat.easy}</td>
                            <td>{stat.medium}</td>
                            <td>{stat.hard}</td>
                            
                            <td>{stat.extreme}</td>
                            <td>{stat.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )
    )
}