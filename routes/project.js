'use strict'

var express = require('express');
var ProjectController = require("../controllers/project");

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartyMiddleware = multipart({ uploadDir : "./uploads" });

router.get('/home', ProjectController.home);
router.get("/test", ProjectController.test);
router.post("/postProject", ProjectController.postProyect);
router.get("/getProject/:id", ProjectController.getProject);   
router.get("/getProjects", ProjectController.getProjects);   
router.put("/updateProjects/:id", ProjectController.updateProject);   
router.delete("/deleteProjects/:id", ProjectController.deleteProject);   
router.post("/uploadImage/:id", multipartyMiddleware, ProjectController.uploadImage);   //tengo que pasar una imagen en el body/formData además del id para que funcione.

module.exports = router;