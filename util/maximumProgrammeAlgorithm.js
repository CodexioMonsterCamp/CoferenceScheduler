const collisionCheck = require("../util/collisionCheck");
const checkExistingSession = require("../util/checkExistingSession");

function startAlgorithm(conferenceSessions, userSessions) {

    let posibleSessions = [];

    for (const conferenceSession of conferenceSessions) {
        if(collisionCheck(conferenceSession,userSessions)&&!checkExistingSession(userSessions, conferenceSession)){
            if(conferenceSession.sessionSeats-1>=0){
                posibleSessions.push(conferenceSession);
                conferenceSession.seatTaken();
            }
            
        }
        
    }
    const nowDate = new Date();

    
    
    return posibleSessions.filter(session=>session.endTime>=nowDate);
}
    module.exports = startAlgorithm;