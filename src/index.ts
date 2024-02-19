import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const apiKey = process.env.API_KEY;


const weatherApiAddress = (city: string) => `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/:cityName', async (req, res) => {
    try {
      const city = req.params.cityName; 
  
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      
      res.json(response.data);
    } catch (error: any) {
      console.error('Erro ao obter dados do clima:', error.message);
      res.status(500).json({ error: 'Erro ao obter dados do clima' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
