const ConferenceSession = require("../models/session");
const Hall = require("../models/hall");
const Conference = require("../models/conference");
const sessionSorter = require("../util/sessionsSorter");
const Speaker = require("../models/speaker");

exports.getIndex = (req, res, next) => {
    Conference.find().populate("address").then(conferences => {
        conferences.sort((a,b) => a.startTime - b.startTime);
        const date = new Date()
        let active = conferences.filter(conf => {
            if(conf.startTime < date &&  conf.endTime > date) {
                return conf
            }
        })
        res.render("index", {
            pageTitle: "Welcome to conferences",
            isLoggedIn: req.session.isLoggedIn,
            path: '/',
            conferences: active,
            isLoggedIn: req.session.isLoggedIn,
            currentDate: req.data || date,

        })
    }).catch(err => console.log(err))

}
exports.getConferences = (req, res, next) => {
    let errMessage = req.flash("error");

    if (errMessage.length > 0) {
        errMessage = errMessage[0]
    } else {
        errMessage = null
    }
    const date = new Date()
    let successMessage = req.flash("success");

    if (successMessage.length > 0) {
        successMessage = successMessage[0]
    } else {
        successMessage = null
    }
    Conference.find().populate("address").then(conferences => {

        res.render("event-form", {
            pageTitle: "All conferences",
            isLoggedIn: req.session.isLoggedIn,
            path: '/all-conferences',
            conferences: conferences,
            currentDate: req.date || date,
            errorMessage: errMessage,
            successMessage: successMessage
        })
    }).catch(err => console.log(err))

}
exports.getConferenceDetails = (req, res, next) => {

    const confId = req.params.conferenceId;
    Conference.findOne({ _id: confId }).populate("address").then(conf => {
        ConferenceSession.find({ conferenceId: conf._id }).populate("hallId").populate("speakerId").then(sessions => {
            Speaker.find().then(speakers => {

                Hall.find().then(halls => {
    
                    let pastSessions = sessionSorter(sessions,"pastSessions");
                    
                    let activeSessions = sessionSorter(sessions,"activeSessions");
                    
                    let upcommingSessions = sessionSorter(sessions,"upcommingSessions");
                    res.render("conference-details", {
                        halls: halls || [],
                        speakers: speakers || [],
                        pageTitle: conf.name,
                        isLoggedIn: req.session.isLoggedIn,
                        path: "/all-conferences",
                        conference: conf,
                        allSessions: sessions || [],
                        pastSessions: pastSessions,
                        activeSessions:activeSessions,
                        upcommingSessions : upcommingSessions
    
                    })
                })
            })
        })

    }).catch(err => console.log(err))
}

exports.getAllSessions = (req,res,next)=>{
    ConferenceSession.find().populate("conferenceId").then(conf=>{
        res.render("all-sessions",{
            conferences : conf,
            pageTitle : 'All Sessions',
            path: "/all-sessions",
            currentDate : req.date,
            isLoggedIn: req.session.isLoggedIn
        })
    }

    );

}

