import Express from "express";
import path from 'path';
import nunjucks from "nunjucks";
import qs from "qs";
import wordFinder from "./utils/wordFinder.js";
import cors from "cors"


const app = Express();
const port = process.env.PORT || 3000

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

TODO: add rate-limiting for API route
TODO: MAKE FUNCTION FOR BOTH WORDLE AND API ROUTES
TODO: Investigate caching options for the routes and combination of letters, (might be too many combos but we'll see)
TODO: SEO improvements, favicon, Opengraph image
TODO: Split njk files into new ones
TODO: Add auth for API and Spelling Bee Solver
TODO: Add compression package middleware
TODO: Add original Titch functionality/vite integration
TODO: add domain to benjaminlebron.com and to benjaminlebron.com projects

*/

app.get("/spelling-bee",  (req, res) => {
  const reqLetters = Array.from(req.query.letters);
  const reqCenterLetter = req.query.center;
  const returnedWords =  wordFinder(reqLetters, reqCenterLetter);
  res.render('index.njk', {words: returnedWords});
  // res.send(`${reqLetters}, ${reqCenterLetter}`)
});

/* 
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
