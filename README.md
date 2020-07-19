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

conf details css:
/*/////////nav bar css/////*/
/* 
nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #0082e6;
  min-height: 8vh;
  width: 100%;
  text-align: center;
}

label.logo {
  color: #0082e6;
  font-size: 33px;
  line-height: 80px;
  padding: 0 140px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
}

nav ul {
  margin-right: 60px;
  display: block;
}

nav ul li {
  display: inline;
  line-height: 80px;
  margin: 0 1vh;
  list-style-type: none;
}

nav ul li a {
  color: #f2f2f2;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1.099px;
  padding: 2vh;
  border-radius: 3px;
  /* text-transform: uppercase; */
/*
  font-family: "Poppins", sans-serif;
}

a.active,
a:hover {
  transition: 0.5s;
  border-radius: 5em;
}

a.active {
  background: #1b9bff;
}

.checkbtn {
  font-size: 30px;
  color: white;
  float: right;
  line-height: 80px;
  margin-right: 40px;
  cursor: pointer;
  display: none;
}

#check {
  display: none;
}

.button-nav {
  display: none;
}

.labell {
  margin: 0 40px 0 0;
  font-size: 26px;
  line-height: 70px;
  display: none;
  width: 35px;
  float: right;
}

#toggle {
  display: none;
} */


/* ACTIVE PAST UPCOMING BUTTONS STYLE END  /|\  */

/* POP UP NOTIFICATION CONFERNCE DETAILS PAGE \|/  */

/* Popup container - can be anything you want */
/* The Modal (background) */
.modal {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #3a3f45;
  margin: 15% auto;
  /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #3a3f45ab;
  width: 80%;
  border-radius: 1.5em;
  /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: rgba(255, 255, 255, 0.582);
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}

/////     end of popUp    //////
