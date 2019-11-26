function analyse(){
  // const data = document.getElementById('analyseText').value;
  const data = document.getElementById("userText").value;
  fetch("http://localhost:3000/test", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ body: data })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
};
