const TOKEN = "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";
const GIST_ID = "66435c6c3978b64616692a3977e319b3";
const GIST_FILENAME = "db.json";

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

//const highScores = getData() || [];
let highScores;

getData()
  .then((data) => {
    highScores = data; // This will log the JSON data
    console.log(highScores);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

console.log(highScores);

const MAX_HIGH_SCORES = 10;

//hide high score button if score is zero
if (mostRecentScore < 1) {
  saveScoreBtn.style.display = "none";
  username.style.display = "none";
}

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(parseInt(MAX_HIGH_SCORES));

  //save high score
  setData(highScores).then((data) => {
    console.log(highScores);
    window.location.assign("/");
  });
};

/*
 * Reads the JSON file inside of the gist
 */
async function getData() {
  const req = await fetch(`https://api.github.com/gists/${GIST_ID}`);
  const gist = await req.json();
  return JSON.parse(gist.files[GIST_FILENAME].content);
}

/*
 * Puts the data you want to store back into the gist
 */
async function setData(data) {
  const req = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      files: {
        [GIST_FILENAME]: {
          content: JSON.stringify(data),
        },
      },
    }),
  });

  return req.json();
}
