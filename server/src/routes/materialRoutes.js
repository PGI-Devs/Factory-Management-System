// import express =require("express")

// // import { getAllMaterials, getMaterialById, createMaterial, updateMaterial, deleteMaterial } from "../controllers/materialController.js";
// import {createMaterial} from "../controllers/materialController";
// const router = express.Router();

// // router.get("/", getAllMaterials);
// router.post("/mc", createMaterial);

// export default router;


import express from "express";
import { createMaterial } from "../controllers/materialController.js"; // include .js

const router = express.Router();

router.post("/create/material", createMaterial);

export default router;