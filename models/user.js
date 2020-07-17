const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type:String,
        required: true
    },
    conferenceOwner: {
        conferences: [
            {
                conferenceId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Conference'
                }
            }
        ]
    },

    session: {
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

userSchema.methods.addToConfOwner = function (conference) {
    this.conferenceOwner.conferences.push(conference);
    return this.save()
}

userSchema.methods.addSession = function (session) {
    this.session.sessions.push(session);
    return this.save()
}


module.exports = mongoose.model("User", userSchema)
