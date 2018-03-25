// import dependency
import React, { Component } from 'react';

class LtcController extends Component {
    constructor(props) {
        super(props)
        // set state to empty string or to props value
        this.state = {
            usd: '' || this.props.ltcCapCoin.usd,
            usHigh: '' || this.props.ltcPolo.high24hr,
            usLow: '' || this.props.ltcPolo.low24hr,
            eur: '' || this.props.ltcKraken.eur,
            eurHigh: '' || this.props.ltcKraken.trends.high,
            eurLow: ''|| this.props.ltcKraken.trends.low,
            trades: '' || this.props.ltcKraken.trends.trades,
            oneHour: '' || this.props.ltcCapCoin.trends.oneHour,
            oneDay: '' || this.props.ltcCapCoin.trends.oneHour,
            oneWeek: '' || this.props.ltcCapCoin.trends.oneHour,
            fetchStatus: false,
            visited: false,
        }
        // bind functions
        this.renderData = this.renderData.bind(this)
        this.sendToDb = this.sendToDb.bind(this)
    }   

    sendToDb() {       
        //  do not sent to DB until all API calls are ran, prevent 0 values from being entered
        if (this.props.fetchCounter === 10) {
            fetch('/api/ltc', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                // convert props to JSON string
                body: JSON.stringify({
                    usd: (this.props.ltcCapCoin.usd).substring(0, 6),
                    us_high: (this.props.ltcPolo.high24hr).substring(0, 6),
                    us_low: (this.props.ltcPolo.low24hr).substring(0, 6),
                    eur: (this.props.ltcKraken.eur).substring(0, 6),
                    eur_high: (this.props.ltcKraken.trends.high).substring(0, 6),
                    eur_low: (this.props.ltcKraken.trends.low).substring(0, 6),
                    trades: this.props.ltcKraken.trends.trades,
                    one_hour: this.props.ltcCapCoin.trends.oneHour,
                    one_day: this.props.ltcCapCoin.trends.oneDay,
                    one_week: this.props.ltcCapCoin.trends.oneWeek,
                }),
            // send JSON response
            }).then(res => res.json())
            // catch errors
            .catch(err => console.log(err))
        }
        // after data is sent to DB, fetch posted data
        this.getData()
    }

    
    getData() {
        // run if trigger hasn'tbeen fetched
        if (this.state.fetchStatus === false) {
            fetch('/api/ltc')
            .then(res => res.json())
            .then(res => {
                // set state
                this.setState({
                    usd: res.data.ltc[0].usd,
                    usHigh: res.data.ltc[0].us_high,
                    usLow: res.data.ltc[0].us_low,
                    eur: res.data.ltc[0].eur,
                    eurHigh: res.data.ltc[0].eur_high,
                    eurLow: res.data.ltc[0].eur_low,
                    trades: res.data.ltc[0].trades,
                    oneHour: res.data.ltc[0].one_hour,
                    oneDay: res.data.ltc[0].one_day,
                    oneWeek: res.data.ltc[0].one_week,
                    fetchStatus: true,
                })
            })
            // catch errors
            .catch(err => console.log(err))
        }
        // once data has been fetched, render it
        this.renderData()
    }

    renderData() {
        // wait for state type to convert to string for clean up
        if (typeof this.state.usd === 'string') {
        return(
            <div className="crypto-container">
            <h5>Trends:</h5>
                <p>{this.state.trades} trades in the last 24 hours</p>
                <p>{this.state.oneHour}% change in last hour</p>
                <p>{this.state.oneDay}% change in last 24 hours</p>
                <p>{this.state.oneWeek}% change in last 7 days</p>                
            <h5>LTC US Market Info</h5>
                <p>${(this.state.usd).substring(0, 8)} per LTC</p>
                <p>${(this.state.usHigh).substring(0, 8)} is the 24 hour high</p>
                <p>${(this.state.usLow).substring(0, 8)} is the 24 hour low</p>                            
            <h5>LTC EU Market Info</h5>
                <p>€{(this.state.eur).substring(0, 8)} per LTC</p>
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

export default LtcController



