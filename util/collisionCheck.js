function collisionCheck(session, sessions) {
    let noCollision = false;
    let minDifference = Number.MAX_SAFE_INTEGER;
    let sessionIndex;
    console.log("0")
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
    console.log(sessionIndex)
        if(sessionIndex === undefined && sessions[0].startTime > session.endTime) {
            noCollision = true; 
            console.log("1")

        } else if(sessionIndex === undefined && (sessions[0].endTime > session.startTime || sessions[0].startTime < session.endTime)) {
            noCollision = false;
            console.log("2")

        } else if(sessionIndex===0) {
            console.log("3")

            if(sessions.length > 1 && (sessions[0].endTime < session.startTime && session.endTime < sessions[1].startTime )) {
                noCollision = true;
            } else if(sessions.length === 1 && sessions[0].endTime < session.startTime) {
                noCollision = true;
            }
        } else if ((sessionIndex === sessions.length - 1 && sessions[sessionIndex].endTime <= session.startTime) ||
            (sessions[sessionIndex + 1].startTime >= session.endTime && sessions[sessionIndex].endTime <= session.startTime)) {
                console.log("4")
                noCollision = true;
        }
    return noCollision;
}

module.exports = collisionCheck;