// import model
const Dash = require('../models/Dash')

// initiate controller object
const dashController = {}

// find latest entry
dashController.latest = (req, res, next) => {
    Dash.findRecent()
    .then(dash => {
        res.json({
            message: 'retrieved entry',
            data: { dash }
        })
    }).catch(next)
}

// create new entry
dashController.create = (req, res) => {
    console.log(req.body, 'from dashcontroller#create')
    Dash.create({
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

module.exports = dashController