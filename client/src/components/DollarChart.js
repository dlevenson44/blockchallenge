import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2'

class DollarChart extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            chartData: {
                labels: ['Dash', 'ETH', 'LTC'],
                datasets: [
                    {
                        label: 'USD',
                        data: [
                            this.props.dashUsd,
                            this.props.ethUsd,
                            this.props.ltcUsd
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                        ]
                    },
                    {
                        label: 'EUR',
                        data: [
                            this.props.dashEur,
                            this.props.ethEur,
                            this.props.ltcEur
                        ],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                        ]
                    }
                ]
            }            
        }
    }

    render() {
        return(
            <div className="chart-container" >
                <Bar
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: true,
                        title: {
                            display: true,
                            text: 'Currency Value',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: "top"
                        }
                }} />
            </div>
        )
    }
}

export default DollarChart