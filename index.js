// import express from 'express';
const express = require("express"); // way to import things in Node.js
const db = require("./data/hubs-model.js");

const server = express();

server.use(express.json()); // needed to parse json from the body

server.get("/", (req, res) => {
  res.send({ api: "up and running..." });
});

// list of hubs
server.get("/hubs", (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log("error on GET /hubs", err);
      res
        .status(500)
        .json({ errorMessage: "error getting list of hubs from database" });
    });
});

// add a hub
server.post("/hubs", (req, res) => {
  const hubData = req.body;
  db.add(hubData)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      console.log("error on POST /hubs", err);
      res.status(500).json({ errorMessage: "error adding the hub" });
    });
});

// remove a hub by id
server.delete("/hubs/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(200).json({ message: "hub removed successfully", removed });
      } else {
        res.status(404).json({ message: "hub not found" });
      }
    })
    .catch(err => {
      console.log("error on DELETE /hubs/:id", err);
      res.status(500).json({ errorMessage: "error removing the hub" });
    });
});

// update a hub, passing id and changes

const port = 4000;
server.listen(port, () => console.log(`\n ** API running on ${port} ** \n`));
