import Express from "express";
import path from 'path';
import nunjucks from "nunjucks";
import qs from "qs";
import wordFinder from "./utils/wordFinder.js";
import cors from "cors"


const app = Express();
const port = 3000;

// Express config below 👇
const __dirname = path.resolve(path.dirname(''));
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

app.use(Express.static('views'));
app.use(cors());
app.use(Express.static(path.join(__dirname, 'public')));

app.set('view engine', 'njk')

app.set("query parser", function (str) {
  return qs.parse(str, { arrayLimit: Infinity });
});


app.get("/", (req, res) => {
  res.render('index.njk')
});

/*

TODO: MAKE FUNCTION FOR BOTH WORDLE AND API ROUTES AND CHANGE THEM TO SPELLING BEE
TODO: Investigate caching options for the routes and combination of letters, (might be too many combos but we'll see)

*/

app.get("/spelling-bee",  (req, res) => {
  const reqLetters = Array.from(req.query.letters);
  const reqCenterLetter = req.query.center;
  const returnedWords =  wordFinder(reqLetters, reqCenterLetter);
  res.render('index.njk', {words: returnedWords});
  // res.send(`${reqLetters}, ${reqCenterLetter}`)
});

/* 
TODO: add auth/rate-limiting for API route
app.get("/api/spelling-bee",  (req, res) => {
  const reqLetters = Array.from(req.query.letters);
  const reqCenterLetter = req.query.center;
  const returnedWords =  wordFinder(reqLetters, reqCenterLetter);
  res.json(returnedWords);
});
*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
