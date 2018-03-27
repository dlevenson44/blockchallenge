// import model
const Eth = require('../models/Eth')

// initiate controller object
const ethController = {}

// find latest entry
ethController.latest = (req, res, next) => {
    Eth.findRecent()
    .then(eth => {
        res.json({
            message: 'retrieved entry',
            data: { eth }
        })
    }).catch(next)
}


// create new entry
ethController.create = (req, res) => {
    console.log(req.body, 'from ethcontroller#create')
    Eth.create({
        time_made: Date.now(),
        usd: req.body.usd,
        us_high: req.body.us_high,
        us_low: req.body.us_low,
        eur: req.body.eur,
        eur_high: req.body.eur_high,
        eur_low: req.body.eur_low,
        trades: req.body.trades,
        one_hour: req.body.one_hour,
        one_day: req.body.one_day,
        one_week: req.body.one_week
    })
}

module.exports = ethController