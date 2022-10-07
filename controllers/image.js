const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "527dee622e754bbabd9314b34efe3a06",
});

// .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to work with api"));
};
const handleImageEntries = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImageEntries: handleImageEntries,
  handleApiCall: handleApiCall,
};
