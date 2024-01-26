import { WebSocketServer } from "ws"
import { connectToDB } from './connectToDB.js'
import { updateLiveLocation } from "./coreFunctions/updateLiveLocation.js"

const wss = new WebSocketServer({ port: process.env.PORT || 4003 })

connectToDB()

wss.on("connection", function connection(ws) {

    //Dummy data to bypass authentication
    const auth = {
        trackerId: 'ABC-123-DEF-456',
        authToken: 'tegw6637288jjchd'
    }

    ws.on("message", function message(data) {
        const content = JSON.parse(data)

        updateLiveLocation(
            { trackerId: content.trackerId },
            {
                $set: { //New values
                    trackerId: content.trackerId,
                    timestamp: content.timestamp,
                    latitude: content.latitude,
                    longitude: content.longitude,
                    heading: content.heading,
                    speed: content.speed,
                    altitude: content.altitude,
                    accuracy: content.accuracy
                }
            }
        )
    })


    ws.on("close", function message(data) {
        console.log('Socket closed');
    })
})