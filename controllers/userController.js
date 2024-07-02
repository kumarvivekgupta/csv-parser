import express from 'express';
import multer from "multer";
import path from 'path';
import fs from 'fs';
import parseCSVtoJSON from '../utils/csvJsonParse.js';
import readline from 'readline';
import db from '../database.js';
import { fileURLToPath } from 'url';
import printAgeGroupDistribution from '../logics/ageCalculation.js'

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/upload-csv', upload.single('file'), async (req, res) => {

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const results = [];
    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);



    try {
        const parsedData = await parseCSVtoJSON(filePath);
        // console.log('parsedData',parsedData);
        fs.unlinkSync(filePath); // Remove the file after processing

        for (const userData of parsedData) {

            const data = { username: userData['name']['firstName'] + ' ' + userData['name']['lastName'], age: userData['age'], address: userData['address'], ...userData };
            const { username, age, address, ...additionalInfo } = data;
            console.log(username, age, address, additionalInfo);
            await db.query(
                'INSERT INTO new_table (name, age, address, additional_info) VALUES (?, ?, ?, ?)',
                [username, age, JSON.stringify(address), JSON.stringify(additionalInfo)]
            );
        }

        printAgeGroupDistribution();



        res.send(parsedData);
    } catch (error) {
        console.error('Error parsing CSV:', error);
        res.status(500).send('Error processing CSV file.');
    }


})


export default router;

