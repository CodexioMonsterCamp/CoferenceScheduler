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
userSchema.methods.addSessions = function (array) {
    this.session.sessions.push(array[0], array[1]);
    return this.save()
}


module.exports = mongoose.model("User", userSchema)
