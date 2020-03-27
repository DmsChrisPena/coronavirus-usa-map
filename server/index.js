const express = require('express')

const webScapper = require('./lib/web-scrapper')

const app = express()

app.get('/api/corona/status', async (req, res) => {
    try {
        const coronaData = await webScapper()

        return res.status(200).json({
            result: coronaData
        })
    } catch (err) {
        return res.status(500).json({
            err: err.toString()
        })
    }
})

app.listen(3000, () => {
    console.log('Running on port 3000!!!')
})