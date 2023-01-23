const { AirplaneRepository, FlightRepository } = require("../repository/index");
const { compareTime } = require("../utils/helper");

class FlightService {
    constructor() {
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }
    async createFlight(data) {
        try {
            if (!compareTime(data.arrivalTime, data.departureTime)) {
                throw {
                    error: "Arrival time can't be less than departure time",
                };
            }
            const airplane = await this.airplaneRepository.getAirplane(
                data.airplaneId
            );
            const flight = await this.flightRepository.createFlight({
                ...data,
                totalSeats: airplane.capacity,
            });
            return flight;
        } catch (error) {
            console.log("Something went wrong at Service Layer");
            throw error;
        }
    }

    async getAllFlightData(data) {
        try {
            const flights = await this.flightRepository.getAllFlights(data);
            return flights;
        } catch (error) {
            console.log("Something went wrong at Service Layer");
            throw error; 
        }
    }
}

module.exports = FlightService;
/**
 * flightNumber,
 * airplaneId,
 * departureAirportId,
 * arrivalTime,
 * departureTime,
 * price,
 * boardingGate,
 * totalSeats
 *
 * ...obj :: ... is spread obj
 */
