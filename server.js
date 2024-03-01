const PORT = 3003
const express = require('express')
const cors = require('cors')
const app = express()
const sql = require('./database/database.connection')
app.use(cors())

app.get('/userdata', async (req, res) => {

    try {
        const todos = await sql`SELECT * from userdata;`
        // console.log(res.json(todos.rows))
        return res.json(todos)

    } catch (error) {
        console.log("Fetching user error", error)
    }
})
app.get('/userdata/:sql', async (req, res) => {

    console.log("PARAMS", req.params)

    try {
        const todos = await sql`${req.params.sql}`
        console.log(res.json(todos))
        return res.json(todos)

    } catch (error) {
        console.log("Fetching user error", error)
    }
})

// function to fetch column names from table
app.get('/get-columns', async (req, res) => {
    try {
        const todos = await sql`SELECT column_name, data_type from information_schema.columns where table_name = 'userdata';`
        console.log(res.json(todos))
        return res.json(todos)
    } catch (error) {
        console.log("Fetching user error", error)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})