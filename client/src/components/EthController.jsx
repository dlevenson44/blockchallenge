// import dependency
import React, { Component } from 'react';

class EthController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usd: 0,
            usHigh: 0,
            usLow: 0,
            eur: 0,
            eurHigh: 0,
            eurLow: 0,
            trades: 0,
            oneHour: 0,
            oneDay: 0,
            oneWeek: 0,
            fetchStatus: false,
        }
        this.getData = this.getData.bind(this)
        this.renderData = this.renderData.bind(this)
    }

    getData() {
        if (this.state.fetchStatus === false) {
            console.log('fetched')
            fetch('/api/crypto')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    usd: res.data.crypto[0].eth_usd,
                    usHigh: res.data.crypto[0].eth_us_high,
                    usLow: res.data.crypto[0].eth_us_low,
                    eur: res.data.crypto[0].eth_eur,
                    eurHigh: res.data.crypto[0].eth_eur_high,
                    eurLow: res.data.crypto[0].eth_eur_low,
                    trades: res.data.crypto[0].eth_trades,
                    oneHour: res.data.crypto[0].eth_one_hour,
                    oneDay: res.data.crypto[0].eth_24_hours,
                    oneWeek: res.data.crypto[0].eth_7_days,
                    fetchStatus: true,
                })
            })
            .catch(err => console.log(err))
        }
    }

    renderData() {
        if (this.state.fetchStatus === true) {
            return(
                <div className="crypto-container">
                <h5>Trends:</h5>
                    <p>{this.state.trades} trades in the last 24 hours</p>
                    <p>{this.state.oneHour}% change in last hour</p>
                    <p>{this.state.oneDay}% change in last 24 hours</p>
                    <p>{this.state.oneWeek}% change in last 7 days</p>                
                <h5>ETH US Market Info</h5>
                    <p>${this.state.usd} per ETH</p>
                    <p>${this.state.usHigh} is the 24 hour high</p>
                    <p>${this.state.usLow} is the 24 hour low</p>                            
                <h5>ETH EU Market Info</h5>
                    <p>€{this.state.eur} per ETH</p>
                    <p>€{this.state.eurHigh} is the 24 hour high</p>
                    <p>€{this.state.eurLow} is the 24 hour low</p>            
            </div>
            )

        } else {
            return(
                <div>
                    <p>Loading Data</p>
                </div>
            )
        }
    }

    render() {
        this.getData()
        // console.log(this.state)
        return(
            <div>
                {this.renderData()}
            </div>
        )
    }
}

export default EthController