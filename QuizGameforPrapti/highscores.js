const TOKEN = "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";
const GIST_ID = "66435c6c3978b64616692a3977e319b3";
const GIST_FILENAME = "db.json";

const highScoresListTable = document.getElementById("highScoresListTable");
const loader = document.getElementById("loader");

//const highScores = getData() || [];
let highScores;

getData()
  .then((data) => {
    highScores = data;
    //console.log(highScores);
    var tableHTML = "";
    highScores.forEach((element) => {
      tableHTML += `<tr>
                <td>${element.name}</td>
                <td>${element.score}</td>
                </tr>`;
      //console.log(tableHTML);
    });
    highScoresListTable.innerHTML = `<table id="highScoresListTable"><tr>  <th>নাম</th>  <th>স্কোর</th></tr> ${tableHTML} </table>`;
    //hide loader
    loader.classList.add("hidden");
    //show highScoresListTable
    highScoresListTable.classList.remove("hidden");
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

//console.log(highScores);

/*
 * Reads the JSON file inside of the gist
 */
async function getData() {
  const req = await fetch(`https://api.github.com/gists/${GIST_ID}`);
  const gist = await req.json();
  return JSON.parse(gist.files[GIST_FILENAME].content);
}
