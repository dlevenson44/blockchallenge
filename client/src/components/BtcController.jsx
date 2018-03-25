// import dependency
import React, { Component } from 'react';

class BtcController extends Component {
    constructor(props) {
        super(props)
        // set state to empty string or to props values
        this.state = {
            usd: '' || this.props.btcValue,
            usHigh: '' || this.props.btcPolo.high24hr,
            usLow: '' || this.props.btcPolo.low24hr,
            eur: '' || this.props.btcKraken.eur,
            eurHigh: '' || this.props.btcKraken.trends.high,
            eurLow: ''|| this.props.btcKraken.trends.low,
            trades: '' || this.props.btcKraken.trends.trades,
            oneHour: '' || this.props.btcCapCoin.oneHour,
            oneDay: '' || this.props.btcCapCoin.oneHour,
            oneWeek: '' || this.props.btcCapCoin.oneHour,
            fetchStatus: false,
        }
        // bind functions
        this.renderData = this.renderData.bind(this)
        this.sendToDb = this.sendToDb.bind(this)
    }

    sendToDb() {   
        //  do not sent to DB until all API calls are ran, prevent 0 values from being entered
        if (this.props.fetchCounter === 10) {
            fetch('/api/btc', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                // convert props to JSON string
                body: JSON.stringify({
                    usd: (this.props.btcValue).substring(0, 8),
                    us_high: (this.props.btcPolo.high24hr).substring(0, 8),
                    us_low: (this.props.btcPolo.low24hr).substring(0, 8),
                    eur: (this.props.btcKraken.eur).substring(0, 8),
                    eur_high: (this.props.btcKraken.trends.high).substring(0, 8),
                    eur_low: (this.props.btcKraken.trends.low).substring(0, 8),
                    trades: this.props.btcKraken.trends.trades,
                    one_hour: this.props.btcCapCoin.oneHour,
                    one_day: this.props.btcCapCoin.oneDay,
                    one_week: this.props.btcCapCoin.oneWeek,
                }),
            // send JSON response
            }).then(res => res.json())
            // catch errors
            .catch(err => console.log(err))
        }
        // after data has been sent to db, fetch posted data
        this.getData()
    }

    
    getData() {
        // run if data hasn't already been fetched
        if (this.state.fetchStatus === false) {
            fetch('/api/btc')
            .then(res => res.json())
            .then(res => {
                // set state
                this.setState({
                    usd: res.data.btc[0].usd,
                    usHigh: res.data.btc[0].us_high,
                    usLow: res.data.btc[0].us_low,
                    eur: res.data.btc[0].eur,
                    eurHigh: res.data.btc[0].eur_high,
                    eurLow: res.data.btc[0].eur_low,
                    trades: res.data.btc[0].trades,
                    oneHour: res.data.btc[0].one_hour,
                    oneDay: res.data.btc[0].one_day,
                    oneWeek: res.data.btc[0].one_week,
                    fetchStatus: true,
                })
            })
            // catch errors
            .catch(err => console.log(err))
        }
        // once data has been fetched render it
        this.renderData()
    }

    renderData() {
        // wait for state to convert to string type to clean up
        if (typeof this.state.usd === 'string') {
        return(
            <div className="crypto-container">
            <h5>Trends:</h5>
                <p>{this.state.trades} trades in the last 24 hours</p>
                <p>{this.state.oneHour}% change in last hour</p>
                <p>{this.state.oneDay}% change in last 24 hours</p>
                <p>{this.state.oneWeek}% change in last 7 days</p>                
            <h5>BTC US Market Info</h5>
                <p>${(this.state.usd).substring(0, 8)} per BTC</p>
                <p>${(this.state.usHigh).substring(0, 8)} is the 24 hour high</p>
                <p>${(this.state.usLow).substring(0, 8)} is the 24 hour low</p>                            
            <h5>BTC EU Market Info</h5>
                <p>€{(this.state.eur).substring(0, 8)} per BTC</p>
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

export default BtcController



