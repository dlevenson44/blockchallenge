// import dependency
import React, { Component } from 'react';

class EthController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usd: '' || this.props.ethCapCoin.usd,
            usHigh: '' || this.props.ethPolo.high24hr,
            usLow: '' || this.props.ethPolo.low24hr,
            eur: '' || this.props.ethKraken.eur,
            eurHigh: '' || this.props.ethKraken.trends.high,
            eurLow: ''|| this.props.ethKraken.trends.low,
            trades: '' || this.props.ethKraken.trends.trades,
            oneHour: '' || this.props.ethCapCoin.trends.oneHour,
            oneDay: '' || this.props.ethCapCoin.trends.oneHour,
            oneWeek: '' || this.props.ethCapCoin.trends.oneHour,
            fetchStatus: false,
            visited: false,
        }
        // this.getData = this.getData.bind(this)
        this.renderData = this.renderData.bind(this)
        this.sendToDb = this.sendToDb.bind(this)
    }

    sendToDb() {        
        if (this.props.fetchCounter === 10) {
            fetch('/api/eth', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    usd: (this.props.ethCapCoin.usd).substring(0, 6),
                    us_high: (this.props.ethPolo.high24hr).substring(0, 6),
                    us_low: (this.props.ethPolo.low24hr).substring(0, 6),
                    eur: (this.props.ethKraken.eur).substring(0, 6),
                    eur_high: (this.props.ethKraken.trends.high).substring(0, 6),
                    eur_low: (this.props.ethKraken.trends.low).substring(0, 6),
                    trades: this.props.ethKraken.trends.trades,
                    one_hour: this.props.ethCapCoin.trends.oneHour,
                    one_day: this.props.ethCapCoin.trends.oneDay,
                    one_week: this.props.ethCapCoin.trends.oneWeek,
                }),
            }).then(res => res.json())
            .catch(err => console.log(err))
        }
        this.getData()
    }

    
    getData() {
        if (this.state.fetchStatus === false) {
            fetch('/api/eth')
            .then(res => res.json())
            .then(res => {
                // set state
                console.log(res.data.eth[0])
                this.setState({
                    usd: res.data.eth[0].usd,
                    usHigh: res.data.eth[0].us_high,
                    usLow: res.data.eth[0].us_low,
                    eur: res.data.eth[0].eur,
                    eurHigh: res.data.eth[0].eur_high,
                    eurLow: res.data.eth[0].eur_low,
                    trades: res.data.eth[0].trades,
                    oneHour: res.data.eth[0].one_hour,
                    oneDay: res.data.eth[0].one_day,
                    oneWeek: res.data.eth[0].one_week,
                    fetchStatus: true,
                })
            })
            .catch(err => console.log(err))
        }
        this.renderData()
    }

    renderData() {
        if (typeof this.state.usd === 'string') {
        return(
            <div className="crypto-container">
            <h5>Trends:</h5>
                <p>{this.state.trades} trades in the last 24 hours</p>
                <p>{this.state.oneHour}% change in last hour</p>
                <p>{this.state.oneDay}% change in last 24 hours</p>
                <p>{this.state.oneWeek}% change in last 7 days</p>                
            <h5>ETH US Market Info</h5>
                <p>${(this.state.usd).substring(0, 8)} per ETH</p>
                <p>${(this.state.usHigh).substring(0, 8)} is the 24 hour high</p>
                <p>${(this.state.usLow).substring(0, 8)} is the 24 hour low</p>                            
            <h5>ETH EU Market Info</h5>
                <p>€{(this.state.eur).substring(0, 8)} per ETH</p>
                <p>€{(this.state.eurHigh).substring(0, 8)} is the 24 hour high</p>
                <p>€{(this.state.eurLow).substring(0, 8)} is the 24 hour low</p>            
        </div>
        )
        } 
    }

    render() {
        this.sendToDb()
        
        return(
            <div className="crypto-container">
                {this.renderData()}                
            </div>
        )
    }
}

export default EthController



