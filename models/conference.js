const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conferenceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
    address: {
        type: Schema.Types.ObjectId,
        ref: "Venue",
        required: true
    },
    conferenceImg: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    conferenceSpeakers: {
        speakers: [
            {
                speakerId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Speaker'
                }
            }
        ]
    },
})

conferenceSchema.methods.addSpeaker = function (session) {
    this.conferenceSpeakers.speakers.push(session);
    return this.save()
}


module.exports = mongoose.model("Conference", conferenceSchema);
