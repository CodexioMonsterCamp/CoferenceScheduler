function sessionSorter(sessions, typeSort) {

    const nowDate = new Date();
    let result = [];

    switch (typeSort) {
        case "pastSessions":

            for (var i = 0; i < sessions.length; i++) {
                if(sessions[i].startTime-nowDate<0&&sessions[i].endTime-nowDate<0){
                    result.push(sessions[i]);
                }
            }

            break
        case "activeSessions":

            for (var i = 0; i < sessions.length; i++) {
                if(sessions[i].startTime-nowDate<0&&sessions[i].endTime-nowDate>0){
                    result.push(sessions[i]);
                }

             }

            break
        case "upcommingSessions":

            for (var i = 0; i < sessions.length; i++) {
                if(sessions[i].startTime-nowDate>0){
                    result.push(sessions[i]);
                }
             }

            break
    }
    return result;
}

module.exports = sessionSorter;