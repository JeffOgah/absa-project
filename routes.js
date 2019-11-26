const express = require("express");
const MonkeyLearn = require("monkeylearn");

const router = express.Router();

// Use the API key from your account
const ml = new MonkeyLearn("91dde518ac052dd863dd69eed8ddb12aaeee3c25");

//POST route to perform the task of aspect sentiment analysis
router.post('/absa', async (req, res) => {
  let data = [req.body.body];
  let model_id = 'ex_N4aFcea3';
  try {
    // Extract opinion units
    const response = await ml.extractors.extract(model_id, data);
    const [{ extractions: result }] = response.body;
    const extracts = result.map((x) => x.extracted_text);
    console.log(extracts)

    // Classify aspects from extracted opinion units
    model_id = 'cl_sGdE8hD9';
    data = [...extracts];

    let aspectArray = [];

    for (let element of data) {
      const classifyResponse = await ml.classifiers.classify(model_id, [
        element
      ]);
      const [{ classifications }] = classifyResponse.body;
      const aspect = classifications.map((x) => [
        x.tag_name,
        x.confidence * 100
      ]);
      aspectArray.push(aspect);
    }
    console.log(aspectArray);

    // Predict sentiment from extracted opinion units
    model_id = "cl_pi3C7JiL";

    let sentimentArray = [];
    
    for (let element of data) {
      const classifyResponse = await ml.classifiers.classify(model_id, [
        element
      ]);
      const [{ classifications }] = classifyResponse.body;
      const sentiment = classifications.map((x) => [
        x.tag_name,
        x.confidence * 100
      ]);
      sentimentArray.push(sentiment);
    }
    console.log(sentimentArray);


    return res.status(200).json({ extracts, aspectArray });
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;
