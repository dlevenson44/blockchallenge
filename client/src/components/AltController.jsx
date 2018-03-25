// import dependency
import React, { Component } from 'react'

const AltController = (props) => {
    console.log(this, props)        
    return(
        <div>
        <div className="hidden-sm-down">
                <nav>
                    <h5>AltCoin per BitCoin Values</h5>
                    <p>{(props.alt.dashPerBtc).toPrecision(5)} DASH per BTC</p>
                    <p>{(props.alt.ethPerBtc).toPrecision(5)} ETH per BTC</p>
                    <p>{(props.alt.ltcPerBtc).toPrecision(5)} LTC per BTC</p>
                </nav>
            </div>
        </div>
    )
}
export default AltController