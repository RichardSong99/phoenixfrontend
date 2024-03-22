import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, BarElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, BarElement, LinearScale, Title, Tooltip, Legend);

export default function ScoreChart() {
    const data = {
        labels: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5', 'Topic 6'],
        datasets: [
            {
                label: '% Correct',
                data: [30, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.5)',
                ]

            },
        ],
    };

    const options = {
        scales: {
            y: {
                min: 0,
                max: 100
            },

        },
        indexAxis: 'x', // this is the option you're looking for
    };

    return (
        <Bar data={data} options={options} />
    );
}