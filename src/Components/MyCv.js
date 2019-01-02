import React from "react";
import classes from "./MyCv.css";

const MyCv = () =>{
return <main className={classes.CV}>
    <img src="randomkemoboi.jpg" className={classes.profilePhoto} alt="My profile photo failed to load"/>
    <h2 >Personal Profile Statement</h2>
    <hr/>
    <p>An adaptable, calm and result-oriented software engineering graduate, seeking a position where one can develop and utilize technical skills derived from full-stack development. Has an analytical, observant and attentive approach to work. Enthusiastic about new technologies regarding front-end development, AI, cryptography. Displays excellent problem solving skills</p>,
    <h2>Education</h2>
    <hr/>
    <ul>
        <li>2016-2019(Expected) Izmir Economy University - Software Engineering Bsc</li>
        <li>2012-2016 Adem Tolunay Anatolian High School</li>
    </ul>
    <h2>Experience</h2>
    <hr/>
    <ul>
        <li>Ascenix (internship) January 2019-August 2019></li>
    </ul>
    <h2> Technical Skills</h2>
    <hr/>
    <ul>
        <li>Proficient in Javascript(ES6&^ standard), Java programming languages</li>
        <li>Proficient in technologies like HTML5, CSS(Preferably with modules but can work with SASS or SCSS), React, Redux, Node.js, Gulp, and some J2EE></li>
        <li>Experienced in database technologies MySql server and MongoDB</li>
    </ul>
    <h2>Language Skills</h2>
    <hr/>
    <ul>
        <li>Turkish (Native)</li>
        <li>English (Proficient C1 / planning to enter to IELTS can rush it on request)</li>
        <li>Japanese (Level 2 / can't really hold a conversation, still studying)</li>
    </ul>
    <h2>Hobbies & Interests</h2>
    <hr/>
    <ul>
        <li>Computer Hardware</li>
        <li>Gaming</li>
        <li>Japanese subculture (Anime, manga, light novels---believe me there is more to it than you know)</li>
        <li>Crypto Currencies</li>
        <li>Blogging... I guess?</li>
    </ul>
    <h2>References</h2>
    <hr/>
    <p>Available upon request</p>
</main>
;
};

export default MyCv;