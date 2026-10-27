require("dotenv").config();

const express = require("express");
const cors = require("cors");

const athleteRoutes = require("./routes/athleteRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Urheilijoiden REST API toimii!",
  });
});

app.use("/api/athletes", athleteRoutes);

app.listen(PORT, () => {
  console.log(`Palvelin käynnissä portissa ${PORT}`);
});
