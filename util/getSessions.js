function getSessions (entrySessions, allSessions) { 
    let existingSessions = [];
    entrySessions.forEach(s => {
        allSessions.forEach(session => {
            if (session._id.toString() === s._id.toString()) {
                existingSessions.push(session)
            }
        })
    })
    return existingSessions;
}

module.exports = getSessions;


            // hall.hallSession.sessions.forEach(session => {
            //     sessions.forEach(s => {
            //         if(s._id.toString() === session._id.toString()) {
            //             existingHallSessions.push(s)
            //         }
            //     })
            // }) 

            // speaker.speakerSession.sessions.forEach(session => {
            //     sessions.forEach(s => {
            //         if(s._id.toString() === session._id.toString()) {
            //             existingSpeakerSessions.push(s)
            //         }
            //     })
            // })   

            // req.user.session.sessions.forEach(s => {
            //     sessions.forEach(session => {
            //         if (session._id.toString() === s._id.toString()) {
            //             userSessions.push(session)
            //         }
            //     })
            // })

            // user.session.sessions.forEach(s => {
            //     sessions.forEach(session => {
            //         if (session._id.toString() === s._id.toString()) {
            //             existingSessions.push(session)
            //         }
            //     })
            // })