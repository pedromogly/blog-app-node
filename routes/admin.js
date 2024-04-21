const router = require('express').Router()
/* ou
const express = require('express)
const router = express.Router()
*/
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/',(req,res)=>{
    res.send('admin')
})
router.get('/posts',(req,res)=>{
    res.send('posts')
})

router.get('/categorias/add', (req,res)=>{
    res.render('admin/addcategorias')
})
router.get('/categorias',(req,res)=>{
    //usar find com lean para retornar objetos simples pois o bd do mongo é pesado
    Categoria.find().lean().then((categorias)=>{
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err)=>{
        req.flash('error_msg', err)
        res.redirect('/admin')
    })
    
})

router.post('/categorias/nova', (req,res)=>{
    //validações de formulario
    let erros = []

    if(!req.body.nome || typeof req.body.nome === undefined||req.body.nome === null){
        erros.push({text: "Nome invalido"})
    }
    if(!req.body.slug||typeof req.body.slug === undefined||req.body.slug === null){
        erros.push({text: "Nome da categoria invalido"})
    }
    if(req.body.nome.length < 3){
        erros.push({text: "Caracteres insuficientes"})
    }
    
    if(erros.length > 0) {
        res.render("admin/addcategorias", {erros: erros})
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        new Categoria(novaCategoria).save().then(()=>{
            console.log('categoria salva')
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect('/admin/categorias')
        })
        .catch((err)=>{
            req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente")
            erros.push({text: err})
            res.render('admin/addcategorias', {err: err})
        })
    }
})

module.exports = router