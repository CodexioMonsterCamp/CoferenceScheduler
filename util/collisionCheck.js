function collisionCheck(session, sessions) {
    let noCollision = false;
    let minDifference = Number.MAX_SAFE_INTEGER;
    let sessionIndex;
    if(sessions.length === 0){
        noCollision = true;
        return noCollision;
    }
    for (let sessionEntry of sessions) {
        let diff = session.startTime - sessionEntry.endTime;
        if (diff < minDifference && diff >= 0) {
            minDifference = session.startTime - sessionEntry.endTime;
            sessionIndex = sessions.indexOf(sessionEntry)
        }
    }
    
        if(sessionIndex === undefined && sessions[0].startTime > session.endTime) {
            noCollision = true; 
        } else if(sessionIndex === undefined && (sessions[0].endTime > session.startTime || sessions[0].startTime < session.endTime)) {
            noCollision = false;
        }else if(sessionIndex === 0 && (sessions[0].endTime < session.startTime && session.endTime < sessions[1].startTime ) ) {
            noCollision = true;
        } else if ((sessionIndex === sessions.length - 1 && sessions[sessionIndex].endTime <= session.startTime) ||
        (sessions[sessionIndex + 1].startTime >= session.endTime && sessions[sessionIndex].endTime <= session.startTime)) {
        noCollision = true;
    }
    return noCollision;
}

module.exports = collisionCheck;