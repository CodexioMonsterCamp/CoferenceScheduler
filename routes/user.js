const express = require("express");
const userController = require("../controllers/user");
const ownerController = require("../controllers/owner");
const isAuthenticated = require("../middleware/authentication")
const router = express.Router();


router.get("/", userController.getIndex);

router.get("/add-hall", isAuthenticated, ownerController.getAddHall);
router.post("/add-new-hall", isAuthenticated, ownerController.postAddHall);

router.get("/allconferences", userController.getConferences);

router.get("/add-conference", isAuthenticated, ownerController.getAddConference);
router.post("/add-conference", isAuthenticated, ownerController.postAddConference);

router.get("/add-speaker", isAuthenticated, ownerController.getAddSpeaker);
router.post("/add-speaker", isAuthenticated, ownerController.postAddSpeaker);

router.post("/add-session", ownerController.postAddNewSession);

router.get("/allconferences/:conferenceId", userController.getConferenceDetails)

router.get("/myconferences", ownerController.getMyConferences);

router.post("/join-session", ownerController.postJoinSession);

router.get("/allsessions", userController.getAllSessions);

router.post("/maximum-programme", isAuthenticated, ownerController.maximumProgramme);

module.exports = router;
