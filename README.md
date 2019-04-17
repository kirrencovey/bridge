![Bridge!](/public/images/bridge-preview.png)

# Welcome to Bridge! ### An app for animal trainers.
As a zookeeper, part of my job was training animals and recording training session data. But training sessions happen in the field, in barns, usually nowhere near a computer. Sometimes it was hours before I'd get computer access. Paper notes are no good, due to often working in inclement weather. So, I created Bridge! to provide a mobile solution.

[View Deployed Site](https://www.trainingbridge.app)

Main functionality:
1. Adding new animals (including image upload to Firebase)
1. Adding new behaviors
1. Adding training sessions
1. View lists of animals, behaviors, and training sessions
1. View animal and training session detail
1. Edit animals, behaviors, and training sessions
1. Delete animals, behaviors, and training sessions

Future functionality:
1. Down the road, I would like to create the functionality for users to join teams, so that animal data can be shared and multiple users can train the same animal, with all the data accessible to all trainers on the team.
1. I would also like users to be able to export training data to another document.
1. I plan to add functionality for users to sort and search animals, behaviors, and sessions in various ways.
1. Eventually, I would like this to be a downloadable app, rather than a mobile-friendly website.

<!-- <details><summary>App Screenshots</summary>
<p>

### View your animals

![Artwork Inventory](image path here)

### Animal details

![Artwork Inventory](image path here)

## Add new animal (or edit existing animal)

![Artwork Inventory](image path here)

</p>
</details> -->

## Details
Bridge! is a mobile-friendly front-end application built with React. Photos uploaded by users are stored with Firebase. Styling was done using Reactstrap elements in conjunction with my own CSS.

## To Clone

Clone the repo to your computer and run `npm install` in the directory<br>

Start the json-server:
1. `cd` into api folder
1. run `json-server -p 5001 -w db.json`

When you're ready to start the server:
1. make sure you are in the root folder (same level as `README.md`)
1. run `npm start`

This will run the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Data will be served from the main API hosted online.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
