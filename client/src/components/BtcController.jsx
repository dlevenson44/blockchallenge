// import dependency
import React, { Component } from 'react';

class BtcController extends Component {
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
        this.getBtcData = this.getBtcData.bind(this)
        this.renderData = this.renderData.bind(this)
    }

    getBtcData() {
        if (this.state.fetchStatus === false) {
            console.log('fetched')
            fetch('/api/crypto')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    usd: res.data.crypto[0].btc_usd,
                    usHigh: res.data.crypto[0].btc_us_high,
                    usLow: res.data.crypto[0].btc_us_low,
                    eur: res.data.crypto[0].btc_eur,
                    eurHigh: res.data.crypto[0].btc_eur_high,
                    eurLow: res.data.crypto[0].btc_eur_low,
                    trades: res.data.crypto[0].btc_trades,
                    oneHour: res.data.crypto[0].btc_one_hour,
                    oneDay: res.data.crypto[0].btc_24_hours,
                    oneWeek: res.data.crypto[0].btc_7_days,
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
                <h5>BTC US Market Info</h5>
                    <p>${this.state.usd} per BTC</p>
                    <p>${this.state.usHigh} is the 24 hour high</p>
                    <p>${this.state.usLow} is the 24 hour low</p>                            
                <h5>BTC EU Market Info</h5>
                    <p>€{this.state.eur} per BTC</p>
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
        this.getBtcData()
        // console.log(this.state)
        return(
            <div>
                {this.renderData()}
            </div>
        )
    }
}

export default BtcController