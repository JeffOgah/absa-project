function analyse() {
  // const data = document.getElementById('analyseText').value;
  const data = document.getElementById("userText").value;
  fetch("http://localhost:3000/absa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ body: data })
  })
    .then(res => res.json())
    .then(data => {
      let tagNode = document.getElementById("tag");
      let aspectRatioNode = document.getElementById("aspect_ratio");
      let sentimentRatioNode = document.getElementById("sentiment_ratio");
      let p = document.createElement("p");

      const { aspectArray, sentimentArray } = data;
      console.log(data);
      console.log(aspectArray, sentimentArray);
      for (let i = 0; i < aspectArray.length; i++) {
        //create p elements and append text accordingly 
        let tag_p = document.createElement("p");
        tag_p.appendChild(document.createTextNode(`${aspectArray[i][0]} (${sentimentArray[i][0]})`))
        tagNode.appendChild(tag_p);

        let aspect_p = document.createElement("p");

        aspectRatioNode.appendChild(document.createTextNode(`${aspectArray[i][1].toFixed(1)}`));
        aspectRatioNode.appendChild(aspect_p);

        let sentiment_p = document.createElement("p");
        sentimentRatioNode.appendChild(document.createTextNode(`${sentimentArray[i][1].toFixed(1)}`));
        sentimentRatioNode.appendChild(sentiment_p)
      }
    })
    .catch(err => console.log(err));
}
