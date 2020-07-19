const Session = require("../models/session");
const Speaker = require("../models/speaker");
const Hall = require("../models/hall");
const Conference = require("../models/conference");
const Venue = require("../models/venues");
const User = require("../models/user");
const checkExistingSession = require("../util/checkExistingSession");
const { nameRegex } = require("../util/nameRegex");
const collisionCheck = require("../util/collisionCheck");
const sortSessions = require("../util/sortUserSessions");
const getSessions = require("../util/getSessions");

exports.getMyConferences = (req, res, next) => {
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    let successMessage = req.flash("success");

    if (successMessage.length > 0) {
        successMessage = successMessage[0]
    } else {
        successMessage = null
    }
    Conference.find({ userId: req.user._id })
    .populate("userId")
    .populate("address")
    .then(conf => {
        Session.find()
            .populate("conferenceId")
            .populate("hallId")
            .populate("speakerId")
            .then(sessions => {
                let existingSessions = []
                req.user.session.sessions.forEach(s => {
                    sessions.forEach(session => {
                        if (session._id.toString() === s._id.toString()) {
                            existingSessions.push(session)
                        }
                    })
                })
                res.render("my-conferences", {
                    pageTitle: "My Conferences",
                    isLoggedIn: req.session.isLoggedIn,
                    path: "/myconferences",
                    conferences: conf,
                    errorMessage: message,
                    successMessage: successMessage,
                    userRole: req.user.role,
                    attendingSessions: existingSessions || [],
                    currentDate: req.date
                })
            })
    }).catch(err => console.log(err))
}

exports.getAddConference = (req, res, next) => {
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    } Venue.find().then(venues => {
        res.render("add-conference", {
            venues: venues.slice(0, 1000),
            pageTitle: 'Add Conference',
            isLoggedIn: req.session.isLoggedIn,
            path: "/add-conferences",
            errorMessage: message
        })
    }).catch(err => console.log(err))
}

exports.postAddConference = (req, res, next) => {
    let {
        name,
        description,
        startTime,
        endTime,
        address,
        conferenceImg,
    } = {
        ...req.body
    };
    name = name.trim()
    const found = name.match(nameRegex)
    if (found === null || name !== found[0]) {
        req.flash("error", "Conference name is not valid. It has to start with Capital letter and only contain letters,numbers and whitespaces.")
        res.redirect("/add-conference");
    } else {

        const userId = req.user._id;
        const newConference = new Conference({
            name,
            description,
            startTime,
            endTime,
            address,
            conferenceImg,
            userId
        })

        if (newConference.startTime < req.date && newConference.endTime < req.date) {
            req.flash("error", "Cannot add conference in the past!")
            res.redirect("/add-conference")
        }
        else {

            Conference.findOne({ name: name }).then(conf => {

                if (conf) {
                    req.flash("error", "Conference name is already in use. Please choose different name.")
                    res.redirect("/add-conference");
                } else if (newConference.startTime > newConference.endTime) {
                    req.flash("error", "Conference end date must be after start date.")
                    res.redirect("/add-conference");
                } else {
                    return newConference.save().then(() => {
                        req.flash("success", "Successfully added a new conference.")
                        return req.user.addToConfOwner(newConference)
                    }).then(() => {
                        res.redirect("/myconferences");
                    }).catch(err => console.log(err))
                }
            })
        }
    }
}

exports.postAddNewSession = (req, res, next) => {
    const { conferenceId, hallId, speakerId, startTime, endTime } = {
        ...req.body
    }
    let sessionSeats;
    Session.find().then(sessions => {
        return sessions;
    }).then(sessions => {
        Hall.find().then(halls => {
            const hall = halls.filter(h => h._id.toString() === hallId.toString())[0];
            sessionSeats = hall.seats;

            let existingHallSessions = getSessions(hall.hallSession.sessions, sessions)
            existingHallSessions.sort((a,b) => a.startTime - b.startTime);
            
            
            
            Speaker.find().then(speakers => {
                const speaker = speakers.filter(s => s._id.toString() === speakerId.toString())[0];
                let existingSpeakerSessions = getSessions(speaker.speakerSession.sessions, sessions)
                existingSpeakerSessions.sort((a,b) => a.startTime - b.startTime);
            
            const session = new Session({
                conferenceId,
                sessionSeats,
                hallId,
                startTime,
                speakerId,
                endTime
            });
                Conference.findById(conferenceId).populate("userId").then(conf => {
        
                    if (collisionCheck(session, existingHallSessions) === false ) {
                        req.flash("error", "This hall is not available in selected time frame.")
                        res.redirect("/myconferences");
                    } else if (collisionCheck(session, existingSpeakerSessions) === false) {
                        req.flash("error", "This speaker is not available in selected time frame.")
                        res.redirect("/myconferences");
                    } else if (session.startTime < conf.startTime || session.endTime > conf.endTime) {
                        req.flash("error", "Session start time and end time must follow conference timeframe.")
                        res.redirect("/myconferences");
                    }else if (session.startTime > session.endTime) {
                        req.flash("error", "Session end time must be after start time. Please try again.");
                        res.redirect("/myconferences");
                    } else if (conf.userId._id.toString() !== req.user._id.toString()) {
                        req.flash("error", "You can only add session for a conference that you created.");
                        res.redirect("/myconferences");
                    } else {
                        hall.addSession(session)
                        speaker.addSession(session)
                        return session.save().then(() => {
                            req.flash("success", "Session added successfully.");
                            res.redirect("/myconferences");
                            console.log("ADDED SESSION");
                        })
                    }
            })
        })
        })
    })
    .catch(err => console.log(err))
}

exports.getAddHall = (req, res, next) => {
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    } Venue.find().then(venues => {
        res.render("add-hall", {
            venues: venues,
            pageTitle: 'Add Hall',
            isLoggedIn: req.session.isLoggedIn,
            path: "/add-hall",
            errorMessage: message
        })
    })
}

exports.postAddHall = (req, res, next) => {
    const name = req.body.name;
    const seats = req.body.seats;
    const venueId = req.body.venueId;
    const newHall = new Hall({ name, seats, venueId });
    Venue.findById(venueId).then(venue => {
        Hall.find().then(halls => {
            let isExisting = false;
            for (hall of halls) {
                if ((hall.name === newHall.name && hall.venueId.toString() === newHall.venueId.toString())) {
                    isExisting = true;
                }
            }
            if (isExisting) {
                req.flash("error", "This hall already exists.")
                res.redirect("/add-hall");
            } else {
                venue.addHall(newHall._id)
                return newHall.save().then(() => {
                    req.flash("success", "Successfully added new hall.")
                    res.redirect("/allconferences");
                    console.log("Hall added successful!");
                }).catch(err => console.log(err))
            }
        })

    })
}

exports.postJoinSession = (req, res, next) => {
    const sessionId = req.body.sessionId;
    const conferenceId = req.body.conferenceId;

    Session.find().then(sessions => {
        let session = sessions.filter(session => session._id.toString() === sessionId.toString())[0];
        User.findById(req.user._id).populate("session.sessions.sessionId").then(user => {
            let existingSessions = getSessions(user.session.sessions, sessions)
            existingSessions.sort((a, b) => a.startTime - b.startTime);

            if (checkExistingSession(req.user.session.sessions, session) === true) {
                req.flash("error", "You have already joined this session.")
                res.redirect("/allconferences")

            } else if (session.sessionSeats === 0) {
                req.flash('error', "No more seats available for this session. Please try to join other session or other conference.");
                res.redirect("/allconferences")
            } else if (collisionCheck(session, existingSessions) === false) {
                req.flash('error', "You cannot join this session because it is in collision with another session you have already joined.");
                res.redirect("/allconferences")
            }
            else {
                session.seatTaken()
                return req.user.addSession(session).then(() => {
                    req.flash("success", "You have successfully JOINED this session.")
                    res.redirect("/myconferences")
                }).catch(err => console.log(err))
            }
        })

    }).catch(err => console.log(err))
}

exports.maximumProgramme = (req, res, next) => {
    const conferenceId = req.body.conferenceId;
    Session.find().then(sessions => {
        let userSessions = getSessions(req.user.session.sessions, sessions)
        userSessions.sort(sortSessions)
        let conferenceSessions = sessions.filter(s => {
            if(s.conferenceId.toString() === conferenceId.toString() && s.startTime > new Date()) {
                return s;
            }
        })
        conferenceSessions.sort((a,b) => {
            let durationOne = a.endTime - a.startTime;
            let durationTwo = b.endTime - b.startTime;
            return durationOne - durationTwo;
        })
        console.log(conferenceSessions.length)
        // async function maximumProgrammeFunc(conferenceSessions, userSessions) {
           
        //     for (let i = 0; i < conferenceSessions.length; i++) {
        //         if(collisionCheck(conferenceSessions[i],userSessions)){
        //             if(conferenceSessions[i].sessionSeats-1>=0) {
        //                 try {
        //                     userSessions.push(conferenceSessions[i]);
        //                     userSessions.sort(sortSessions)
        //                     await req.user.addSession(conferenceSessions[i])
        //                     await conferenceSessions[i].seatTaken()
        //                 } catch(err) {
        //                     console.log(err)
        //                 }
        //             }             
        //         }
        //     }
        //     res.redirect("myconferences")
        // }

        // maximumProgrammeFunc(conferenceSessions, userSessions)

       
    })
    .catch(err => console.log(err))
}

exports.getAddSpeaker = (req,res,next) => {
    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    Conference.find({userId : req.user._id}).then(conferences => {
        res.render("add-speaker", {
            conferences: conferences,
            pageTitle: 'Add Speaker',
            isLoggedIn: req.session.isLoggedIn,
            path: "/add-speaker",
            errorMessage: message
            
        })
    })
}

exports.postAddSpeaker = (req,res,next) => {
    let {conferenceId, speakerName, speakerDescription, speakerImg} = {...req.body};
    const newSpeaker = new Speaker({conferenceId, speakerName, speakerDescription, speakerImg});
    speakerName = speakerName.trim();

    const speakerNameFound = speakerName.match(/([A-Z]{1,1}[A-Za-z]+) ([A-Z]{1,1}[A-Za-z]+)/gm);

    if (speakerName === '') {
        req.flash("error", "Speaker name cannot be empty string!")
        res.redirect("/add-conference");
    } else if (speakerNameFound === null || speakerNameFound[0] !== speakerName) {
        req.flash("error", "First name and last name, on speaker must be starting with capital letter!")

        res.redirect("/add-conference");
    } else {
        Conference.findById({_id: conferenceId}).then(conf => {
            Speaker.find().then(speakers => {
            let isExisting = false;
            for (speaker of speakers) {
                if ((speaker.speakerName === newSpeaker.speakerName && speaker.conferenceId.toString() === newSpeaker.conferenceId.toString())) {
                    isExisting = true;
                }
            }
            if (isExisting) {
                req.flash("error", "This speaker already exists for this conference.")
                res.redirect("/add-speaker");
            } else {
                conf.addSpeaker(newSpeaker._id)
                return newSpeaker.save().then(() => {
                    req.flash("success", "Successfully added new speaker.")
                    res.redirect("/myconferences");
                    console.log("Speaker added successful!");
                }).catch(err => console.log(err))
            }
            })
        })
    }
    
}
