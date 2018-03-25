import React, { Component } from 'react'

class ChartController extends Component {
    constructor(props) {
        super(props)
        this.renderContent = this.renderContent.bind(this)
    }

    renderContent() {
        return(
            <div>
            {this.props.renderChart}
            {this.props.renderChartDollar}
            {this.props.renderChartTrend}
            </div>
        )
    }
    
    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default ChartController
