'use strict'
var Project = require('../models/project');
var fs = require('fs');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: "Home"
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message: "Test"
        });
    },
    postProyect: function(req, res) {
        //importar el modelo!
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = null;

        //guardo el project en mongo
        project.save((err, projectStored) => {
            if (err) return res.status(500).send({
                message: "Error al intentar guardar el proyecto."
            });
            
            if (!projectStored) return res.status(404).send({
                message: "No se ha podido guardar el proyecto."
            });
            
            return res.status(200).send({
                project: projectStored
            });
        });
    },
    getProject: function (req, res) {
        var projectId = req.params.id;
        
        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({
                message: "Error al intentar obtener el proyecto."
            });
            
            if (!project) return res.status(404).send({
                message: "El proyecto no existe."
            });
            
            return res.status(200).send({
                project
            });
        });
    },
    getProjects: function (req, res) {
        //dentro delas llaves puedo hacer year:2020 y me devolverá solo los del 2020
        //tambien puedo hacer find({}).sort("-year")...  los obtengo ordenados de mayor a menor
        Project.find({}).exec((err, projects) => {  
            if (err) return res.status(500).send({
                message: "Error al intentar obtener los proyectos."
            });
            
            if (!projects) return res.status(404).send({
                message: "No existe ningun proyecto."
            });
            
            return res.status(200).send({
                projects
            });
        });
    },
    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;  
        
        // {new:true} hace que el objeto que se devuelve sea el modificado y no el sin modificar
        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
            if (err) return res.status(500).send({
                message: "Error al intentar actualizar el proyecto."
            });
            
            if (!projectUpdated) return res.status(404).send({
                message: "No existe ningun proyecto."
            });
            
            return res.status(200).send({
                project: projectUpdated
            });
        });
    },
    deleteProject: function (req, res) {
        var projectId = req.params.id;
        
        Project.findByIdAndRemove(projectId, (err, projectDeleted) => {
            if (err) return res.status(500).send({
                message: "Error al intentar eliminar el proyecto."
            });
            
            if (!projectDeleted) return res.status(404).send({
                message: "No existe ningun proyecto."
            });

            //no funciona
            // if (req.params.image) {
            //     var filePath = req.params.image.path;
            //     //borro la imagen antes de eliminar el elemento (despues no puedo porque el return corta la función)
            //     fs.unlink(filePath, (err) => {
            //         // return res.status(200).send({
            //         //     message: "Imagen borrada con éxito."
            //         // });
            //     });
            //     console.log(filePath);
            // }

            return res.status(200).send({
                project: projectDeleted
            });

        });
    },
    uploadImage: function(req, res) {
        var projectId = req.params.id;
        var fileName = "Imagen no cargada."
        
        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split("\\");
            var fileName = fileSplit[1];    //se substrinea el nombre del archivo
            var extSplit = fileName.split("\.");
            var fileExt = extSplit[1];
            
            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Project.findByIdAndUpdate(projectId, { image: fileName }, { new:true }, (err, projectUpdated) => {
                    if (err) return res.status(500).send({
                        message: "Error al intentar cargar la imagen."
                    });
                    
                    if (!projectUpdated) return res.status(404).send({
                        message: "No existe ninguna imagen."
                    });
    
                    return res.status(200).send({
                        project: projectUpdated
                    });
                })
            }
            else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({
                        message: "La extensión no es válida para una imagen."
                    });
                });
            }
            
            
        } 
        else {
            return res.status(200).send({
                message: fileName
            })
        }
    }
};

module.exports = controller;