# RealTimeConferenceScheduler
Codexio Dev Camp Project

Меню:
1. логин 
2. сигнин
3. алл конференце
4. мои конференции
5. нова конференция -> connected to already added hall and speaker in the database. (dropdown menu)
6. нов говорител 
7. нова зала

1. Advane na konferenciq
	- proverka za ime (dali vece ima takava konferenciq) - gotovo
	- proverka dali end time e sled start time - gotovo
2. Advane na spiker - gotovo
	- proverka za ime (dali veche ima takav speaker) - gotovo
3. Advane na zala 
	- proverka za ime (dali veche ima takava zala) - gotovo
4. Advane na nova sesiq za konferenciq
	-proverka da li Owner-a koito se opitva da dobavi nova sesiq e owner na tazi konferenciq - gotovo
	- proverka dali end time e sled start time - gotovo

	-proverka da li speakera-a e zaet po tova vreme 
	-proverka da li zalata e svobodna po tova vreme
5. Joinvane na sessiq ot attendee
	-proverka da li e lognat user-a
	-proverka da li tazi sesiq ne syvpada s druga sessiq koqto user attendva
	-proverka da li ima seats available


1. Conference -> name, descrption, startTime, endTime, venueId, speakerName, speakerDescription, speakerImg, hall    -gotovo

2. Session -> start time, endTime, hall, reference to Conference,   -gotovo

3. Hall -> name, seatCapacity, reference To Venue   -gotovo

Zadachi: 

1. Mahane na vsichki entrita ot compass osven JSON      -gotovo
2. Smenqvane na modelite     			        -gotovo
3. Smenqwane na formata za advane na nova konferenciq 	-gotovo

4. put active past and future sessions to all sessions



5. Когато адна нова сесия успешно не дава месидж за съксес и ме връща в моите конференции(аз бих предпочел да остана при сесиите за да си добавя нови ако искам)
6. Ако има колизия при създаването на сесия ме редиректва към All-conferences (бих предпочел да остана в сесиите и там да получа месиджа за колизия за да мога директно да го фиксна и да продължа)


// exports.postAddConference = (req, res, next) => {

//     const name = req.body.name
//     const description = req.body.description
//     const startTime = req.body.startTime;
//     const endTime = req.body.endTime;
//     const address = req.body.address;
//     const userId = req.user._id;
//     const newConference = new Conference({
//         name,
//         description,
//         startTime,
//         endTime,
//         address,
//         userId
//     })
//     Conference.findOne({name: name}).then(conf => {
//         if (!conf && (newConference.startTime < newConference.endTime)) {
//             return newConference.save().then(() => {
//                 return req.user.addToConfOwner(newConference)
//             }).then(() => {
//                 res.redirect("/allconferences");
//                 console.log("Conference added successful")
//             }).catch(err => console.log(err))
//         } else {
//             console.log("Conference already exist!")
//             res.redirect("/add-conference");
//         }
//     })

// }

// exports.postAddNewSession = (req, res, next) => {
//     const venueId = req.body.venueId
//     const speakerId = req.body.speaker
//     const hallId = req.body.hall
//     const conferenceId = req.body.conferenceId
//     const startTime = req.body.startTime;
//     const endTime = req.body.endTime;
//     const session = new ConferenceSession({
//         venueId,
//         speakerId,
//         hallId,
//         conferenceId,
//         startTime,
//         endTime
//     });
//     Conference.findById(conferenceId).populate("userId").then(conf => {
        
//         if(conf.userId._id.toString() === req.user._id.toString() && 
//         (session.startTime < session.endTime)) {
//                 return session.save().then(() => {
                    
//                         res.redirect("/myconferences");
//                         console.log("ADDED SESSION");
                    
//                 })
        
//             } 
//             else {
//                 console.log("Not your conference or endtime is starttime")
//                 res.redirect("/")
//             }
// })

// }

        Venue.findById(venueId).then(venue => {
            let isExisting = async function (venueId, name) {
                let isExisting = false;
                let resp = await Hall.find({venueId: venueId}).then(halls => {
                    return halls
                });
                for (let hall of resp) {
                    if (hall.name === name) {
                        isExisting = true;
                    }
                }
                return isExisting
            }

            if (isExisting(venueId, name).then(data => {
                return data
            }) === false) {
                console.log("inside")
                venue.addHall(hall._id)
                return hall.save().then(() => {
                    res.redirect("/");
                    console.log("Hall added successful!");
                }).catch(err => console.log(err))
            } else {
                console.log("outside")
                req.flash("error", "This hall already exists.")
                res.redirect("/add-hall");
            }
        })
