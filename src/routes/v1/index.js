const express = require("express");
const CityController = require("../../controllers/city-controller");
const FlightController = require("../../controllers/flight-controller");
const AirportController = require("../../controllers/airport-controller");

const { FlightMiddlewares } = require("../../middlewares/index");

const router = express.Router();

//! City Routes
router.post("/city", CityController.create);
router.delete("/city/:id", CityController.destroy);
router.get("/city/:id", CityController.get);
router.patch("/city/:id", CityController.update);
router.get("/city", CityController.getAll);

//! Flights Routes
router.post(
    "/flights",
    FlightMiddlewares.validateCreateFlight,
    FlightController.create
);
router.get("/flights", FlightController.getAll);
router.get('/flights/:id', FlightController.get);
router.patch('/flights/:id', FlightController.update);


//! Airport Routes
router.post("/airports", AirportController.create);

module.exports = router;
