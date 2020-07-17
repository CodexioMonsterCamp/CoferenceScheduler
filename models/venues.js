const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const venueSchema = new Schema({
    adress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    venueHalls: {
        halls: [
            {
                hallId: {
                    type: Schema.Types.ObjectId,
                    ref: "Hall",
                }
            }
        ]
    }


})

venueSchema.methods.addHall = function (hall) {
    this.venueHalls.halls.push(hall);
    return this.save()
}

module.exports = mongoose.model("Venue", venueSchema);
