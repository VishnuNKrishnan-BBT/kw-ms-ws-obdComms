import { WebSocketServer } from "ws"
import { connectToDB } from './connectToDB.js'
import { updateLiveLocation } from "./coreFunctions/updateLiveLocation.js"
import { styledLog } from "./helpers/styledLog.js"
import { getReqId } from "./helpers/getRequestId.js"

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

        const reqId = getReqId('TXN')

        styledLog({ colour: "green", style: "bold" }, `=== New message from Tracker ID '${content.trackerId}' ===`)
        styledLog({ colour: "yellow", style: "normal" }, `ℹ ${reqId}\t: Assigned Req ID`)
        styledLog({ colour: "blue", style: "normal" }, `ℹ Tracker ID\t\t: ${content.trackerId ? content.trackerId : 'Not available in payload'}`)
        styledLog({ colour: "blue", style: "normal" }, `ℹ Timestamp\t\t: ${content.timestamp ? content.timestamp : 'Not available in payload'}`)
        styledLog({ colour: "blue", style: "normal" }, `ℹ Latitude\t\t: ${content.latitude ? content.latitude : 'Not available in payload'}`)
        styledLog({ colour: "blue", style: "normal" }, `ℹ Longitude\t\t: ${content.longitude ? content.longitude : 'Not available in payload'}`)
        styledLog({ colour: "blue", style: "normal" }, `ℹ Heading\t\t: ${content.heading ? content.heading : 'Not available in payload'}`)
        styledLog({ colour: "blue", style: "normal" }, `ℹ Speed\t\t\t: ${content.speed ? content.speed : 'Not available in payload'}`)
        styledLog({ colour: "blue", style: "normal" }, `ℹ Altitude\t\t: ${content.altitude ? content.altitude : 'Not available in payload'}`)
        styledLog({ colour: "blue", style: "normal" }, `ℹ Accuracy\t\t: ${content.accuracy ? content.accuracy : 'Not available in payload'}`)


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