const express = require("express");
const MonkeyLearn = require("monkeylearn");

const router = express.Router();

// Use the API key from your account
const ml = new MonkeyLearn("91dde518ac052dd863dd69eed8ddb12aaeee3c25");
// let data = [`The hotel has a great location but all in all it was a horrible experience! Only stayed here because it was the pre-accommodation choice for one of our tours but it was terrible. Will never stay here again!`]

//Middleware to extract opinion units
const extractAPI = function(req, res, next) {
  let data = [req.body.body];
  let model_id = "ex_N4aFcea3";
  ml.extractors
    .extract(model_id, data)
    .then(response => {
      //console.log(response);
      let [{ extractions: result }] = response.body;
      let extracts = result.flatMap(x => x.extracted_text);
      req.extracts = extracts;
      console.log(`req.extracts: ${req.extracts}`);
      next();
      // res.status(200).json({ value: req.extracts });
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
    });
};

//Middleware for extracting aspects
/* const classifyAPI = function(req, res, next) {
  let model_id = "cl_sGdE8hD9";
  let data = [...req.extracts];
  req.aspects = [];
  async function getAspect() {
    for (i of data) {
      await ml.classifiers
        .classify(model_id, [i])
        .then(response => {
          let [{ classifications }] = response.body;
          let aspect = classifications.map(x => [
            x.tag_name,
            x.confidence * 100
          ]);
          req.aspects.push(aspect);
          //          if (!req.aspects.flatMap(x => x[0]).includes(aspect.tag_name)) {
              req.aspects.push(aspect);
        // }
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
  Promise.all([getAspect(), next()]);
}; */
const classifyAPI = async function(req, res, next) {
  let model_id = "cl_sGdE8hD9";
  let data = [...req.extracts];
  req.aspects = ["req.aspects"];
  data.forEach(async element => {
    await ml.classifiers
    .classify(model_id, [element])
    .then(response => {
      let [{ classifications }] = response.body;
      let aspect = classifications.map(x => [
        x.tag_name,
        x.confidence * 100
      ]);
      req.aspects.push(aspect);
      console.log(`Classifications: ${classifications}`)
      console.log(`Aspect: ${aspect}`)
      /*             if (!req.aspects.flatMap(x => x[0]).includes(aspect.tag_name)) {
          req.aspects.push(aspect);
        } */
    })
    .catch(error => {
      console.log(error.response);
    });
  });
   next()
};

//Middleware for predicting sentiment
const sentimentAPI = function(req, res, next) {
  let model_id = "cl_pi3C7JiL";
  let data = [...req.extracts];
  req.sentiments = [];
  async function getAspect() {
    for (i of data) {
      await ml.classifiers
        .classify(model_id, [i])
        .then(response => {
          let [{ classifications }] = response.body;
          let sentiment = classifications.map(x => [
            x.tag_name,
            x.confidence * 100
          ]);
          console.log(`sentiment: ${sentiment}`)
          req.sentiments.push(sentiment);
          /*             if (!req.aspects.flatMap(x => x[0]).includes(aspect.tag_name)) {
              req.aspects.push(aspect);
            } */
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
  Promise.all([getAspect(), next()]);
};

router.post("/absa", extractAPI, classifyAPI, sentimentAPI, (req, res) => {
  res.status(200).json({ value: [req.extracts, req.aspects, req.sentiments] });
});

router.get("/absa", (req, res, next) => {
  res.status(200).json({ body: req.param("er") });
});

/* const classifyAPI = function(req, res, next) {
 req.data2 = req.extracts;
  next () // call the next Middlleware.
} */

router.get("/test", extractAPI, (req, res) => {
  //Middleware 3, code goes here
  res.json({ data: req.extracts });
});

module.exports = router;
