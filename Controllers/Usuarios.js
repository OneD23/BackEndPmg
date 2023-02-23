'use strict'
var fs = require('fs')
const { Console } = require('console')
var modelo = require('../Models/Usuarios')
const nodemailer = require('nodemailer');

// Crea un objeto transporte con los datos de tu servidor de correo electrónico
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'morarosawanderson@gmail.com',
        pass: 'piledijaijrpnmmk'
    }
});

// Configura los datos del correo electrónico que se enviará


var controlers = {
    home: function (req, res) {
        return res.status(200).send({
            message: "soy homme"
        })
    },
    save: function (req, res) {
        var user = new modelo()
        var params = req.body;
        console.log(params);
        user.nombre = params.nombre
        user.usuario = params.correo
        user.password = params.password

        let mailOptions = {
            from: 'morarosawanderson@gmail.com',
            to: 'oned2723@gmail.com',
            subject: 'BluCove',
            text: 'gracias por viajar con nosotros un agente lo estara contactando'
        };        
        // Envía el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Correo electrónico enviado: ' + info.response);
            }
        });
        user.save((err, userSave) => {
            if (err) return res.status(500).send({ message: "Error al guardar el usuario" })

            if (!userSave) return res.status(404).send({ message: "No se a podido guardar el usuario" })

            return res.status(200).send({ usuario: userSave })
        })

    },
    Find: function (req, res) {
        var Id = req.params.Id
        console.log(req.params)
        modelo.findById(Id, (err, userFind) => {
            if (err) return res.status(500).send({ message: "Error al obtener el usuario" })

            if (!userFind) return res.status(404).send({ message: "No se obtener el usuario, no existe o fue eliminado." })

            return res.status(200).send({ usuario: userFind })

        })
    },
    List: function (req, res) {

        modelo.find({}).exec((err, userFind) => {
            if (err) return res.status(500).send({ message: "Error al obtener el usuarios" })

            if (!userFind) return res.status(404).send({ message: "No se puede obtener ningun usuario, no existe o fue eliminado." })

            return res.status(200).send({ usuario: userFind })

        })

    },
    Update: function (req, res) {
        var Id = req.params.Id
        var update = req.body

        modelo.findByIdAndUpdate(Id, update, (err, userUpdate) => {
            if (err) return res.status(500).send({ message: "Error al obtener el usuario" })

            if (!userUpdate) return res.status(404).send({ message: "No se pudo actualizar el usuario, no existe o fue eliminado." })

            return res.status(200).send({ usuario: userUpdate })
        })
    },
    Delete: function (req, res) {
        var Id = req.params.Id
        var update = req.body

        modelo.findByIdAndDelete(Id, update, (err, userDelete) => {
            if (err) return res.status(500).send({ message: "Error al Eliminar el usuario" })

            if (!userDelete) return res.status(404).send({ message: "No se pudo eliminar el usuario, no existe o ya fue eliminado." })

            return res.status(200).send({ usuario: userDelete })
        })
    },
    Upload: function (req, res) {
        var Id = req.params.Id
        var fileName = "imagen no subida"

        if (req.files) {

            var filePath = req.files.image.path
            fileName = filePath.split('\\')[1]
            var extencion = fileName.split('.')[1]

            if (extencion == 'png' || extencion == 'jpg' || extencion == 'jpge'|| extencion == 'gif' ) {
                modelo.findByIdAndUpdate(Id, { imagenPerfil: fileName }, { new: true }, (err, userUpdate) => {
                    if (err) { return res.status(500).send({ message: 'Ocurrio un error mientras se guardaba la imagen' }) }
                    if (!userUpdate) { return res.status(404).send({ message: "El usuario al cual intenta vincular la imagen no existe" }) }
                    return res.status(200).send({
                        userUpdate
                    })
                })
            } else{
                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({message: 'La extencion de este archivo no es valido para imagen'})
                })

            }
        }else {
            return res.status(500).send({
                message: req.file
            })
        }
    }
}

module.exports = controlers