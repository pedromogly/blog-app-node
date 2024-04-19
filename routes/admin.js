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
    res.render('admin/categorias')
})

router.post('/categorias/nova', (req,res)=>{
    //validações de formulario
    let erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({text: 'Nome inválido'})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({text: 'Slug inválido'})
    }

    if(req.body.nome.length < 2){
        erros.push({text: 'Nome insuficiente'})
    }
    if(erros.length > 0){
        res.render('admin/addcategorias', {erros: erros})
    }

    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(()=>{
        console.log('categoria salva')
        res.redirect('/admin/categorias')
    })
    .catch((err)=>{console.log('Erro ao salvar: '+err)})
})

module.exports = router