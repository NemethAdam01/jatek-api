import express from "express";
const PORT = 4000;
const app = express();

const jatekok = [
  {
    id: 1,
    cim: "Minecraft",
    platform: "PC",
    mufaj: "sandbox",
    ev: 2011,
    ar: 9990,
  },
  {
    id: 2,
    cim: "Mario Kart 8",
    platform: "Switch",
    mufaj: "verseny",
    ev: 2017,
    ar: 17990,
  },
  {
    id: 3,
    cim: "EA Sports FC 25",
    platform: "PlayStation",
    mufaj: "sport",
    ev: 2024,
    ar: 19990,
  },
  {
    id: 4,
    cim: "Stardew Valley",
    platform: "PC",
    mufaj: "szimulátor",
    ev: 2016,
    ar: 4990,
  },
  {
    id: 5,
    cim: "Celeste",
    platform: "Switch",
    mufaj: "platformer",
    ev: 2018,
    ar: 7990,
  },
  {
    id: 6,
    cim: "Cyberpunk 2077",
    platform: "PC",
    mufaj: "akció",
    ev: 2020,
    ar: 14990,
  },
];
let kovetkezoId = 7;

function ervenyesJatek(req, res, next) {
  const { cim, platform } = req.body;
  if (!cim || !platform) {
    return res.status(400).json({ hiba: "A cim és a platform kötelező." });
  }
  next();
}

app.post("/api/jatekok/", ervenyesJatek, (req, res) => {
  const { cim, platform, mufaj, ev, ar } = req.body;
  const uj = { id: kovetkezoId, cim, platform, mufaj, ev, ar };
  kovetkezoId++;
  jatekok.push(uj);
  res.status(201).json(uj);
});

app.get("/api/jatekok/kereses", (req, res) => {
  const platform = req.query.platform;
  const maxAr = req.query.maxAr;
  let tal = [];
  if (platform && maxAr) {
    tal.push(
      jatekok.forEach().find((j) => j.platform === platform && j.ar <= maxAr),
    );
  }
  if (!platform) {
    tal.push(jatekok.find((j) => j.ar <= maxAr));
  }
  if (!maxAr) {
    tal.push(jatekok.find((j) => j.platform === platform));
  }
  if (!tal) {
    res.status(404).json("Nincs találat");
  }
  res.status(200).json(tal);
});

app.get("/api/jatekok", (req, res) => {
  res.json(jatekok);
});

app.get("/api/jatekok/:id", (req, res) => {
  const id = req.params.id;
  const jatek = jatekok.find((j) => j.id == id);
  if (!jatek) {
    res.status(404).json({ hiba: "Nincs ilyen játék." });
  }
  res.json(jatek);
});

app.delete("/api/jatekok/:id", (req, res) => {
  const id = req.params.id;
  const jatek = jatekok.find((j) => j.id === id);
  if (!jatek) {
    res.status(404).json({ hiba: "Nincs ilyen játék." });
  }
  const index = jatekok.indexOf(jatek);
  jatekok.pop(index);
  res.status(204);
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`A szerver fut: http://localhost:${PORT}`);
});
