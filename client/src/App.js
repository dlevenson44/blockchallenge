// import react dependencies and stylesheet
import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom' 
import './App.css';

// import components
import AltController from './components/AltController'
import BtcController from './components/BtcController'
import DashController from './components/DashController'
import EthController from './components/EthController'
import LtcController from './components/LtcController'
import Nav from './components/Nav'

// import charts
import ChartController from './components/ChartController'
import BtcChart from './components/BtcChart'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // has alt per btc data been calculated?
      calculated: false,
      // checks to see if data has already been posted to db
      dataSent: false,
      // trigger when all fetches have run
      fetchCheck: false,
      // count fetches run
      // alt per btc values
      altPerBtc: {
        dashPerBtc: 0,
        ethPerBtc: 0,
        ltcPerBtc: 0
      },
      fetchCounter: 0,
      // bitcoin/usd value
      btcValue: 0,
      // bitcoin market trends
      btcCapCoin: {
        oneHour: 0,
        oneDay: 0,
        oneWeek: 0                   
      },
      // bitcoin euro data 
      btcKraken: {
        eur: 0,
        trends: {
          low: 0,
          high: 0,
          trades: 0
        }
      },
      // bitcoin us market data
      btcPolo: {
        high24hr: 0,
        low24hr: 0,
      },
      // dash usd and market trend values
      dashCapCoin: {
        usd: 0,
        trends: {
          oneHour: 0,
          oneDay: 0,
          oneWeek: 0,
        }
      },
      // dash euro data
      dashKraken: {
        eur: 0,
        trends: {
          low: 0,
          high: 0,
          trades: 0
        }
      },
      // dash us data info
      dashPolo: {
        high24hr: 0,
        low24hr: 0
      },
      // eth usd and market trend values
      ethCapCoin: {
        usd: 0,
        trends: {
          oneHour: 0,
          oneDay: 0,
          oneWeek: 0
        }                    
      },
      // eth euro data
      ethKraken: {
        eur: 0,
        trends: {
          low: 0,
          high: 0,
          trades: 0
        }
      },
      // eth us data info
      ethPolo: {
        high24hr: 0,
        low24hr: 0
      },
      // ltc usd and market trend values
      ltcCapCoin: {
        usd: 0,
        trends: {
          oneHour: 0,
          oneDay: 0,
          oneWeek: 0
        }                    
      },
      // ltc euro data
      ltcKraken: {
      eur: 0,
        trends: {
          low: 0,
          high: 0,
          trades: 0
        }
      },
      // ltc us data info
      ltcPolo: {
        high24hr: 0,
        low24hr: 0
      }, 
    }
    	// bind btcCoinDesk
		this.btcCoinDesk = this.btcCoinDesk.bind(this)

  }
  componentWillMount() {
    this.btcCoinDesk()    
  }

    // first API fetch, get BTC USD via CoinDesk API
  btcCoinDesk() {
      fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json', {
        method: 'GET'
      }).then(res => res.json())
      .then(res => {
          let fetcher = this.state.fetchCounter + 1
          console.log(fetcher, 'FETCH COUNTER')
          this.setState({
              fetchCounter: fetcher,
              btcValue: res.bpi.USD.rate,
        })
      })
      // trigger next api call
      this.btcCapCoin()
    }
    
    // second API fetch, get BTC trends via CoinCap
    btcCapCoin() {
      fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=USD', {
        method: 'GET',
      }).then(res => res.json())
      .then(res => {
        let fetcher = this.state.fetchCounter + 1
        console.log(fetcher, 'FETCH COUNTER')
        // set state to fetched values
        this.setState({
          fetchCounter: fetcher,                
          btcCapCoin: {
            oneHour: res[0].percent_change_1h,
            oneDay: res[0].percent_change_24h,
            oneWeek: res[0].percent_change_7d       
          }
        })
      })
      // trigger next API call
      this.btcKraken()
    }
  
    // third API fetch, get EUR BTC data via Kraken
    btcKraken() {
      fetch('https://api.kraken.com/0/public/Ticker?pair=XXBTZCAD', {
        method: 'GET',
      }).then(res => res.json())
      .then(res => {
        let fetcher = this.state.fetchCounter + 1
        console.log(fetcher, 'FETCH COUNTER')
        // set state to fetched values
        this.setState({
          fetchCounter: fetcher,
          btcKraken: {
            eur: res.result.XXBTZCAD.c[0],
            trends: {
              low: res.result.XXBTZCAD.l[1],
              high: res.result.XXBTZCAD.h[1],
              trades: res.result.XXBTZCAD.t[1]
            }
          }
        })
      })
      // trigger next API call
      this.btcPolo()
    }
  
    // fourth API fetch, get US BTC info via Poloniex
    btcPolo() {
      fetch('https://poloniex.com/public?command=returnTicker', {
        method: 'GET',
      }).then(res => res.json())
      .then(res => {
        let fetcher = this.state.fetchCounter + 1
        console.log(fetcher, 'FETCH COUNTER')
        // set state to fetched values
        this.setState({
          fetchCounter: fetcher,
          btcPolo: {
            high24hr: res.USDT_BTC.high24hr,
            low24hr: res.USDT_BTC.low24hr,
          },
          dashPolo: {
            high24hr: res.USDT_DASH.high24hr,
            low24hr: res.USDT_DASH.low24hr
          },
          ethPolo: {
            high24hr: res.USDT_ETH.high24hr,
            low24hr: res.USDT_ETH.low24hr
          },
          ltcPolo: {
            high24hr: res.USDT_LTC.high24hr,
            low24hr: res.USDT_LTC.low24hr
          }
        })
      })
      // trigger next API call
      this.dashCapCoin()
    }
  
    // fifth API fetch, get DASH USD/trend values via CoinCap
    dashCapCoin() {
      fetch('https://api.coinmarketcap.com/v1/ticker/dash/?convert=USD', {
        method: 'GET',
      }).then(res => res.json())
      .then(res => {
        let fetcher = this.state.fetchCounter + 1
        console.log(fetcher, 'FETCH COUNTER')
        this.setState({   
          fetchCounter: fetcher,             
          dashCapCoin: {
            usd: res[0].price_usd,
            trends: {
              oneHour: res[0].percent_change_1h,
              oneDay: res[0].percent_change_24h,
              oneWeek: res[0].percent_change_7d
            }                    
                },
        })
      })
      // trigger next api call
      this.dashKraken()
    }
  
    // sixth API fetch, get DASH EUR values via Kraken
    dashKraken() {
      fetch('https://api.kraken.com/0/public/Ticker?pair=DASHEUR', {
        method: 'GET',
      }).then(res => res.json())
      .then(res => {
        let fetcher = this.state.fetchCounter + 1
        console.log(fetcher, 'FETCH COUNTER')
        this.setState({
          fetchCounter: fetcher,
          dashKraken: {
            eur: res.result.DASHEUR.c[0],
            trends: {
              low: res.result.DASHEUR.l[1],
              high: res.result.DASHEUR.h[1],
              trades: res.result.DASHEUR.t[1]
            }
          }
        })
      })
      // trigger next api call
      this.ethCapCoin()
    }
  
    // seventh API fetch, get ETH USD/trend values via CoinCap
    ethCapCoin() {
      fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD', {
        method: 'GET',
      }).then(res => res.json())
      .then(res => {
        let fetcher = this.state.fetchCounter + 1
        console.log(fetcher, 'FETCH COUNTER')
        this.setState({   
          fetchCounter: fetcher,             
          ethCapCoin: {
            usd: res[0].price_usd,
            trends: {
              oneHour: res[0].percent_change_1h,
              oneDay: res[0].percent_change_24h,
              oneWeek: res[0].percent_change_7d
            }                    
          }
        })
      })
      // trigger next API call
      this.ethKraken()
    }
  
    // eighth API fetch, get ETH EUR data via Kraken
    ethKraken() {
      fetch('https://api.kraken.com/0/public/Ticker?pair=XETHZEUR', {
        method: 'GET',
      }).then(res => res.json())
      .then(res => {
        let fetcher = this.state.fetchCounter + 1
        console.log(fetcher, 'FETCH COUNTER')
        this.setState({
          fetchCounter: fetcher,
          ethKraken: {
            eur: res.result.XETHZEUR.c[0],
            trends: {
              low: res.result.XETHZEUR.l[1],
              high: res.result.XETHZEUR.h[1],
              trades: res.result.XETHZEUR.t[1]
            }
          }
        })
      })
      // trigger next API call
      this.ltcCapCoin()
    }
  
    // ninth API fetch, get LTC USD/trend values via CoinCap
    ltcCapCoin() {
      fetch('https://api.coinmarketcap.com/v1/ticker/litecoin/?convert=USD', {
        method: 'GET',
      }).then(res => res.json())
      .then(res => {
        let fetcher = this.state.fetchCounter + 1
        console.log(fetcher, 'FETCH COUNTER')
        this.setState({ 
          fetchCounter: fetcher,               
          ltcCapCoin: {
            usd: res[0].price_usd,
            trends: {
              oneHour: res[0].percent_change_1h,
              oneDay: res[0].percent_change_24h,
              oneWeek: res[0].percent_change_7d
            }                    
          }
        })
      })
      // trigger next API call
      this.ltcKraken()
    }
  
    // final API fetch, get LTC EUR data via Kraken
    ltcKraken() {
      fetch('https://api.kraken.com/0/public/Ticker?pair=XLTCZUSD', {
        method: 'GET',
      }).then(res => res.json())
      .then(res => {
        let fetcher = this.state.fetchCounter + 1
        console.log(fetcher, 'FETCH COUNTER')
        this.setState({
          fetchCounter: fetcher,          
          ltcKraken: {
            eur: res.result.XLTCZUSD.c[0],
            trends: {
              low: res.result.XLTCZUSD.l[1],
              high: res.result.XLTCZUSD.h[1],
              trades: res.result.XLTCZUSD.t[1]
            }
          },
          fetchCheck: true
        })
      })
      // calcualte alt per btc values
      // this.calculateData()
    }
  
  calculateData() {
    if ((this.state.calculated === false) && (this.state.btcValue !== 0) && (this.state.dashCapCoin.usd !== 0) && (this.state.ethCapCoin.usd !== 0) && (this.state.ltcCapCoin.usd !== 0)) {
      console.log('cacl')
      //  convert props from string to number
      let btc = parseFloat(this.state.btcValue)
      let dash = parseFloat(this.state.dashCapCoin.usd)
      let eth = parseFloat(this.state.ethCapCoin.usd)
      let ltc = parseFloat(this.state.ltcCapCoin.usd)
      // calculate alt per btc values
      let dpb = (dash / btc)
      let epb = (eth / btc)
      let lpb = (ltc / btc)
      // set state to calculated values
      this.setState({
        altPerBtc: {
          dashPerBtc: dpb,
          ethPerBtc: epb,
          ltcPerBtc: lpb,
        },
        calculated: true
      })
    }
  }

  renderChart() {
    // render chart after alt per btc calculated
    if (this.state.calculated === true) {
      return(
        <div>
          <BtcChart alt={this.state.altPerBtc} />
        </div>
      )
    } else {
      return(
        <div>
          <p>Loading Chart</p>
        </div>
      )
    }
  }

  renderChartDollar() {
    // render after all API data has been fetched
    if (this.state.fetchCounter === 10) {
      return(
        <div>
          <DollarChart dashUsd={this.state.dashCapCoin.usd}
          dashEur={this.state.dashKraken.eur}
          ethUsd={this.state.ethCapCoin.usd}
          ethEur={this.state.ethKraken.eur}
          ltcUsd={this.state.ltcCapCoin.usd}
          ltcEur={this.state.ltcKraken.eur} />
        </div>
      )
    } else {
      return(
        <div>
          <p>Loading Chart</p>
        </div>
      )
    }
  }

  renderChartTrend() {
    // render chart after last fetch complete
    if (this.state.fetchCounter === 10) {
      return(
        <div>
          <TrendChart btcTrends={this.state.btcCapCoin}
          dashTrends={this.state.dashCapCoin.trends}
          ethTrends={this.state.ethCapCoin.trends}
          ltcTrends={this.state.ltcCapCoin.trends} />
        </div>
      )
    } else {
      return(
        <div>
          <p>Loading Chart</p>
        </div>
      )
    }
  }


  render() {
    this.calculateData()
		return (
			<Router>
				<div className="App">
				<div className="container">
				<h1>Crypto Tracker</h1>
				<Nav />
        <AltController alt={this.state.altPerBtc} />
				<div>				
				<Route path='/bitcoin' render={() => <BtcController btcValue={this.state.btcValue} 
					btcCapCoin={this.state.btcCapCoin}
					btcKraken={this.state.btcKraken}
					btcPolo={this.state.btcPolo}
				  fetchCounter={this.state.fetchCounter} />
				} />

        <Route path='/dash' render={() => <DashController
          dashCapCoin={this.state.dashCapCoin}
          dashKraken={this.state.dashKraken}
          dashPolo={this.state.dashPolo}
          fetchCounter={this.state.fetchCounter} />
        } />

        <Route path='/ethereum' render={() => <EthController btcValue={this.state.btcValue}
          ethCapCoin={this.state.ethCapCoin}
          ethKraken={this.state.ethKraken}
          ethPolo={this.state.ethPolo} 
          fetchCounter={this.state.fetchCounter} />
        } />
        
        <Route path='/litecoin' render={() => <LtcController btcValue={this.state.btcValue}
          ltcCapCoin={this.state.ethCapCoin}
          ltcKraken={this.state.ltcKraken}
          ltcPolo={this.state.ltcPolo} 
          fetchCounter={this.state.fetchCounter} />			
        } />

				</div>
				</div>
				</div>
			</Router>
		);			
	}
}
export default App;