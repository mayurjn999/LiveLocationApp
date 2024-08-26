import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import MapWithLocation from "./Map";

function LocationReceiver() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const client = new Client({
            brokerURL: "ws://localhost:8080/kafka-websocket/websocket", // WebSocket endpoint
            connectHeaders: {
                login: "guest",
                passcode: "guest",
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Connected to WebSocket");
                client.subscribe("/topic/locations", (message) => {
                    const location = JSON.parse(message.body);
                    setLocations((prevLocations) => [location]);
                });
            },
            onStompError: (frame) => {
                console.error("Broker reported error: " + frame.headers["message"]);
                console.error("Additional details: " + frame.body);
            },
        });

        client.activate();

        // return () => {
        //   client.deactivate();
        // };
    }, []);

    return (
        <div>
            <h2>Live Location</h2>
            <div style={{ width: 'auto', height: '400px !important' }}>
                {locations.map((location, index) => (
                    <MapWithLocation lat={location.latitude} lng={location.longitude} />
                ))}
            </div>
        </div>
    );
}

export default LocationReceiver;
