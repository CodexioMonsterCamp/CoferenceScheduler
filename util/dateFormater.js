function formatDateTimeConferences(object) {
    return formatDateTime = object.map(e => {
        const startTime = e.startTime.toString().substring(0, 21);
        const endTime = e.endTime.toString().substring(0, 21);
        return {
            startTime: startTime,
            endTime: endTime,
        }

    });
}

function formatDateTimeConferenceDetails(session){
    sessions.map(e => {
        const startTime = e.startTime.toString().substring(0, 21);
        const endTime = e.endTime.toString().substring(0, 21);
        return {
            venueId: e.venueId,
            speakerId: e.speakerId,
            conferenceId: e.conferenceId,
            hallId: e.hallId,
            startTime: startTime,
            endTime: endTime,
        }
    })
}

module.exports = formatDateTimeConferences;