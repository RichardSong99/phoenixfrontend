import React from 'react'
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import styles from './charts.module.css';
import { capitalizeFirstLetter } from '@/app/study/data/utility';





export const colorMapping = {
    "correct": "#56D819",
    "incorrect": "#F1513B",
    "omitted": "#F8C540",
    "unattempted": "#EDF1F2",
    "attempted": "#1387F2",
    // add more name-color pairs as needed
};

export const MyPieChart = ({ data }) => {
    return (
        <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie dataKey="value" isAnimationActive={true} data={data} innerRadius={60} outerRadius={80} fill="#8884d8"  >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={colorMapping[entry.name]} />)
                        }
                    </Pie>
                    {/* <Legend
                        wrapperStyle={{
                            fontSize: '14px', // control the font size
                            lineHeight: '40px', // control the line height
                            paddingLeft: '10px', // control the left padding
                            paddingTop: '10px' // control the top padding
                        }}
                        layout="vertical" // control the layout
                        align="right" // control the horizontal alignment
                        verticalAlign="middle" // control the vertical alignment
                    /> */}
                </PieChart>
            </ResponsiveContainer>

            <MyLegend items={data.map((item) => item.name)} />
        </div>
    )
}

export const LegendItem = ({ text }) => {
    const color = colorMapping[text.toLowerCase()] || "blue";

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: color, marginRight: '5px' }}></div>
            <span style={{ fontSize: '14px' }}>{capitalizeFirstLetter(text)}</span>
        </div>
    )
}

export const MyLegend = ({ items }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', gap: "20px",  }}>
            {items.map((item, index) => (
                <LegendItem key={index} text={item} />
            ))}
        </div>
    )
}

export const MyBarChart = ({ data, percent = true }) => {
    const formatPercent = (value) => `${Math.round(value * 100)}%`;

    return (
        <BarChart width={400} height={250} data={data}>
            <XAxis
                dataKey="name"
                style={{ fontSize: '12px' }}
            />
            <YAxis
                domain={[0, 1]}
                tickFormatter={percent ? formatPercent : undefined}
                style={{ fontSize: '14px' }}
            />
            <Tooltip
                formatter={percent ? (value) => [formatPercent(value), 'value'] : undefined}
            />
            <Bar dataKey="value" fill="#56D819" />
        </BarChart>
    )
}

export const MyProgressBar = ({ value, max = 1}) => {
    return (
        <div className={styles.progressBar}>
            <progress value={value} max={max} />
        </div>
    );
};

