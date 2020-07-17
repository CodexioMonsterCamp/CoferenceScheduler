const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conferenceSessionSchema = new Schema({
    conferenceId: {
        type: Schema.Types.ObjectId,
        ref: 'Conference',
        required: true
    },
    hallId: {
        type: Schema.Types.ObjectId,
        ref: 'Hall',
        required: true
    },
    speakerId: {
        type: Schema.Types.ObjectId,
        ref: 'Speaker',
        required: true
    },
    sessionSeats: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    
})

conferenceSessionSchema.methods.seatTaken = function() {
    this.sessionSeats = this.sessionSeats -1;
    return this.save()
}

module.exports = mongoose.model("Session", conferenceSessionSchema); 
