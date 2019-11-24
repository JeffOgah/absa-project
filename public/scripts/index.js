function analyse(){
  // const data = document.getElementById('analyseText').value;
  const data = document.getElementById("userText").value;
  console.log(data)
  fetch("http://localhost:3000/absa", {
    method: "POST",
    // headers: new Headers(),
    body: JSON.stringify({ body: data })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
};
