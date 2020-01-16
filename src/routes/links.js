const express = require('express');
const router = express.Router();

const pool = require('../configs/database');
const {isLoggenIn} = require('../lib/auth');

//router.get('/add', isLoggenIn ,(req, res) =>{
router.get('/add',(req, res) =>{
    res.render('add');
});

//router.post('/add', isLoggenIn, async (req,res) =>{
router.post('/add', async (req,res) =>{
    const {tittle, url, description } = req.body;
    const newlink = {
        tittle,
        url,
        description,
        //user_id: req.user.id
    };
    await pool.query('insert into links values ?',[newlink]);
    res.redirect('/links');
});

//router.get('/', isLoggenIn,async(req,res)=>{
router.get('/',async(req,res)=>{
    const links = await pool.query('select * from links');
    //const links = await pool.query('select * from links where user_id = ?',[req.user.id]);
    console.log(links);
    res.render('list', {links});
});

//router.get('/delete/:id', isLoggenIn,async (req, res) => {
router.get('/delete/:id',async (req, res) => {
    const { id } = req.params;
    await pool.query('delete from links where id = ?', [id]);
    res.redirect('/links');
});

//router.get('/edit/:id', isLoggenIn,async(req, res) => {
router.get('/edit/:id',async(req, res) => {
    const { id } = req.params;
    const links = await pool.query('select * from links where id = ?',[id]);
    res.render('edit',{link: links[0]});

});

//router.post('/edit/:id', isLoggenIn,async (req, res) => {
router.post('/edit/:id',async (req, res) => {
    var { id }  = req.params;
    id = id.substring(1);
    id = parseInt(id);
    const { tittle, url, description} = req.body;
    const newLink = {
        tittle,
        url,
        description
    }
    console.log(newLink);
    console.log(id);
    await pool.query('update links set ? where id = ?',[newLink , id]);
    
    res.redirect('/links');
});
module.exports = router;