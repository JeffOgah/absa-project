const express = require("express");
const MonkeyLearn = require("monkeylearn");
const bodyParser = require('body-parser');

const app = express();

// Use the API key from your account
// const ml = new MonkeyLearn("91dde518ac052dd863dd69eed8ddb12aaeee3c25");


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.post('/absa', (req, res, next) => {
  console.log(req.body);
  console.log("test")
  res.status(201).json({
    message: 'Thing created successfully!',
    value: req.body
  });
});

/* app.get('/absa', (req, res, next) => {
  console.log(req.body)
  res.status(200);
}); */

const extractAPI = function(req, res, next){
  let data = [`The hotel has a great location but all in all it was a horrible experience! Only stayed here because it was the pre-accommodation choice for one of our tours but it was terrible. Will never stay here again!`]
  let model_id = "ex_N4aFcea3";
  ml.extractors
    .extract(model_id, data)
    .then(response => {
      console.log(response);
      let [{ extractions: result }] = response.body;
      let extracts = result.flatMap(x => x.extracted_text);
      req.extracts = extracts;
      next() //call the next middleware
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
    });
}

/* const classifyAPI = function(req, res, next) {
 req.data2 = req.extracts;
  next () // call the next Middlleware.
} */

app.get('/test', extractAPI, (req, res) => {
  //Middleware 3, code goes here 
    res.json({data: req.extracts});
})

module.exports = app;


/* const extractAPI = function(data) {
  let model_id = "ex_N4aFcea3";
  ml.extractors
    .extract(model_id, data)
    .then(res => {
      // handle response
      console.log(res);
      let [{ extractions: result }] = res.body;
      let extracts = result.flatMap(x => x.extracted_text);
      console.log(extracts)
      return extracts;
    })
    .catch(error => {
      // handle error
      console.log(error);
      // if an error is thrown during the request
      // it will also contain the (failure) response
      console.log(error.response);
    });
};

const classifyAPI = function(data) {
  let model_id = "cl_sGdE8hD9";
  ml.classifiers
    .classify(model_id, data)
    .then(res => {
      // handle response
      console.log(res);
      return res.body;
    })
    .catch(error => {
      // handle error
      console.log(error);
      // if an error is thrown during the request
      // it will also contain the (failure) response
      console.log(error.response);
    });
};

const sentimentAPI = function(data) {
  let model_id = 'cl_pi3C7JiL'
  ml.classifiers
    .classify(model_id, data)
    .then(res => {
      // handle response
      console.log(res);
      return res.body;
    })
    .catch(error => {
      // handle error
      console.log(error);
      // if an error is thrown during the request
      // it will also contain the (failure) response
      console.log(error.response);
    });
};
 */


/* app.use((req, res, next) => {
  let data = [`The hotel has a great location but all in all it was a horrible experience! Only stayed here because it was the pre-accommodation choice for one of our tours but it was terrible. Will never stay here again!`]
  let model_id = "ex_N4aFcea3";
  ml.extractors
    .extract(model_id, data)
    .then(response => {
      console.log(response);
      let [{ extractions: result }] = response.body;
      let extracts = result.flatMap(x => x.extracted_text);
      console.log(extracts);
      req.extracts = extracts;
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
    });
});

app.use((req, res) => {
  res.json(req.extracts); 
}); */

