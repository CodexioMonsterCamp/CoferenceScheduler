const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const speakerSchema = new Schema({
    speakerName: {
        type: String,
        required: true
    },
    speakerDescription: {
        type: String,
        required: true
    },
    speakerImg: {
        type: String,
        required: true
    },
    conferenceId: {
        type: Schema.Types.ObjectId,
        ref: "Conference",
        required: true
    },
    speakerSession: {
        sessions: [
            {
                sessionId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Session'
                }
            }
        ]
    }


})
speakerSchema.methods.addSession = function (session) {
    this.speakerSession.sessions.push(session);
    return this.save()
}
module.exports = mongoose.model("Speaker", speakerSchema);
