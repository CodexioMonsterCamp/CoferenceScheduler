const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hallSchema = new Schema({
    name : {type: String, required: true},
    seats: {type: Number, required: true},
    venueId: {
        type: Schema.Types.ObjectId,
        ref: "Venue",
        required: true
    },
    hallSession: {
        sessions: [
            {
                sessionId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Session'
                }
            }
        ]
    }
});


hallSchema.methods.addSession = function (session) {
    this.hallSession.sessions.push(session);
    return this.save()
}

module.exports = mongoose.model("Hall", hallSchema);


