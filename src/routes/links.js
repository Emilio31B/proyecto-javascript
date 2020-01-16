const express = require('express');
const router = express.Router();

const pool = require('../configs/database');

router.get('/add', (req, res) =>{
    res.render('add');
});

router.post('/add', async (req,res) =>{
    const {tittle, url, description } = req.body;
    const newlink = {
        tittle,
        url,
        description
    };
    await pool.query('insert into links set ?',[newlink]);
    res.redirect('/links');
});

router.get('/',async(req,res)=>{
    const links = await pool.query('select * from links');
    console.log(links);
    res.render('list', {links});
});

router.get('/delete/:id',async (req, res) => {
    const { id } = req.params;
    await pool.query('delete from links where id = ?', [id]);
    res.redirect('/links');
});
router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const links = await pool.query('select * from links where id = ?',[id]);
    res.render('edit',{link: links[0]});

});

router.post('/edit/:id', async (req, res) => {
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