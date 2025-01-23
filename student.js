const { error } = require('console');
const express = require('express');
const router =  express.Router();
const mysql = require('mysql2/promise');

//database connection settings
const dbHost = 'localhost';
const dbUser = 'your_username';
const dbpassword = 'your_password';
const dbName = 'your_database_name';

//create a database connection pool
const pool = mysql.createpool({
    host: dbHost,
    user: dbUser,
    password: dbpassword,
    database: dbName,
});

// GET /students
router.get('/', async (req, res) => {
    try{
        const [rows] = await
        pool.execute('SELECT * FROM Students');
        res.json(rows);
    }catch (err){
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve students'});
    }
});

// GET /students/:id
router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [rows] = await pool.execute('SELECT * FROM students WHERE id = ?', [id]);
      if (rows.length === 0) {
        res.status(404).json({ error: 'Student not found' });
      } else {
        res.json(rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve student' });
    }
  });
  
//POST  /student
router.post('/', async (req, res) =>
{
    try{
        const { name, email } = req.body;
        const [result] = await
        pool.execute('INSERT INTO students (name, email) VALUES (?, ?)', [name,email]);
        res.json({ id: result.insertId, name, email});
    }catch (err){
        console.error(err);
        res.status(500).json({ error : 'failed to create student'});
    }
});

//PUT /Students/:id
router.put('/:id', async (req, res) =>{
    try{
        const id = req.params.id;
        const { name, email} = req.body;
        const [result] = await
        pool.execute('UPDATE students SET name =?, email =? where id = ?',[name, email, id]);
        if(result.affectedRows == 0){
            res.status(404).json({ error:'student not found'});
        }else{
            res.json({id, name, email });
        }

    }catch(err) {
        console.error(err);
        res.status(500).json({ error : 'failed to update student' });
    }
});
// DELETE /students/:id
router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const [result] = await pool.execute('DELETE FROM students WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Student not found' });
      } else {
        res.json({ message: 'Student deleted successfully' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete student' });
    }
  });
  
  module.exports = router;
  