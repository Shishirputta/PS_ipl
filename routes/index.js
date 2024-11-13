var express = require('express');
var router = express.Router();
const axios=require('axios');
const pred=require('./users');
let predictionResult=null;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});

router.post("/", async (req, res) => {
  const userInput=req.body;
  const data=[ req.body.innings,req.body.batting_team,req.body.bowling_team,req.body.over,req.body.ball,
              req.body.batter,req.body.non_striker,req.body.bowler,req.body.score,req.body.crr,req.body.toss_win,req.body.toss,req.body.venue];
  
  try {
    

    // Make a POST request to the Flask server
    const response = await axios.post("http://localhost:5000/predict", data);

    // Send the prediction back to the client
    predictionResult=response.data.prediction[0];
    res.json({ prediction: response.data.prediction });
  } catch (error) {
    console.error("Error sending request to Flask:", error.message);
    res.status(500).json({ error: "Failed to get a response from the model" });
  }
  pred.create({
    innings: userInput.innings,
    batting_team: userInput.batting_team,
    score: userInput.score,
    batter: userInput.batter,
    non_striker: userInput.non_striker,
    over: userInput.over,
    ball: userInput.ball,
    bowling_team: userInput.bowling_team,
    bowler: userInput.bowler,
    venue: userInput.venue,
    crr:userInput.crr,
    toss_winner: userInput.toss_win,
    toss_decision: userInput.toss,
    wickets: userInput.wickets,
    prediction: predictionResult
  });
  
  
});

module.exports = router;
