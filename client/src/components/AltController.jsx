// import dependency
import React, { Component } from 'react'

class AltController extends Component {
    constructor(props)  {
        super(props)
        this.state = {
            // trigger when data calculated
            calculated: false,
            // alt per btc values
            dashPerBtc: 0,
            ethPerBtc: 0,
            ltcPerBtc: 0
        }
    }

    calculateData() {
        // trigger when all values are populated
        if((this.state.calculated === false) &&(this.props.btc !== 0) && (this.props.dash !== 0) && (this.props.eth !== 0) && (this.props.ltc !== 0)) {
            //  convert props from string to number
            let btc = parseFloat(this.props.btc)
            let dash = parseFloat(this.props.dash)
            let eth = parseFloat(this.props.eth)
            let ltc = parseFloat(this.props.ltc)
            // calculate alt per btc values
            let dpb = (dash / btc)
            let epb = (eth / btc)
            let lpb = (ltc / btc)
            // set state to calculated values, set trigger to true
            this.setState({
                calculated: true,
                dashPerBtc: dpb,
                ethPerBtc: epb,
                ltcPerBtc: lpb,
            })
        }
    }


    render() {        
        this.calculateData()
        return(            
            <div className="hidden-sm-down">
                <nav>
                    <h5>AltCoin per BitCoin Values</h5>
                    <p>{(this.state.dashPerBtc).toPrecision(5)} DASH per BTC</p>
                    <p>{(this.state.ethPerBtc).toPrecision(5)} ETH per BTC</p>
                    <p>{(this.state.ltcPerBtc).toPrecision(5)} LTC per BTC</p>
                </nav>
            </div>
        )
    }
}

export default AltController