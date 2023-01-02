//flightInfo string generator
export function createInfoResponse(planeStatus, planeObj, locationObj) {
    const aircraftStatus = planeStatus;
    if (aircraftStatus == "en-route") {
        const response = `*** 🎫 Flight Number ${planeObj.flight_iata} ***\n\n` + 
            `🛫 Departing from: ${planeObj.dep_name} in  ${planeObj.dep_city} \n\n` + 
            `\t\t\t...via ${planeObj.airline_name} Airlines ✈️\n\n` + 
            `🛬 Arriving at ${planeObj.arr_name} in ${planeObj.arr_city} \n\n` +
            `----------------------------------\n` +
            `*** Location ***\n\n` + 
            `🌎 Currently flying over ${locationObj.city}, ${locationObj.state}, ${locationObj.country}\n` +
            `🔥 Speed: ${Math.round(planeObj.speed * 1.852)}km/h\n` +
            `🧭 Heading Direction: ${headingIndicator(planeObj.dir)}`;
        return response; 

    } else {
        const status = (planeObj.status == 'landed') ? "Landed...🛬" : "Awaiting Departure...💺";
        const response = `*** 🎫 Flight Number ${planeObj.flight_iata} ***\n\n` + 
            `🛫 Departing from: ${planeObj.dep_name} in ${planeObj.dep_city} \n\n` + 
            `\t...via ${planeObj.airline_name} Airlines ✈️\n\n` + 
            `🛬 Arriving at ${planeObj.arr_name} in ${planeObj.arr_city} \n\n` +
            `----------------------------------\n` +
            `*** Location ***\n\n` + 
            `Currently: ${status}`
        
        return response;
    }
}

//determine heading direction of airplane
export function headingIndicator(direction) {
    let headingTowards = "Unknown";
    if (direction == 0) {
        headingTowards =  "North";
    }
    else if (direction < 90) {
        headingTowards =  "North-East";
    }
    else if (direction == 90) {
        headingTowards =  "East";
    }
    else if (direction < 180) {
        headingTowards =  "South-East";
    }
    else if (direction == 180) {
        headingTowards =  "South";
    }
    else if (direction < 270) {
        headingTowards =  "South-West";
    }
    else if (direction == 270) {
        headingTowards =  "West";
    }
    else if (direction < 360) {
        headingTowards =  "North-West";
    }

    return headingTowards;
};

