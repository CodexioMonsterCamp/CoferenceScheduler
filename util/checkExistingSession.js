function checkExistingSession (userSessions,session) {
    let isExisting = false;

    for(let row of userSessions) {

        if(row._id.toString() === session._id.toString()) {
            isExisting = true;
        }
    }
    return isExisting;
}

module.exports = checkExistingSession;