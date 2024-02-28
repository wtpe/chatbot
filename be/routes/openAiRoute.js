import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { openai } from '../index.js';

dotenv.config();
const openAiRoute = express.Router();

openAiRoute.post('/text', async (req, res) => {
    try {
        const { text, activeChatId } = req.body;
        
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: 'user', content: text }
            ],
        })
        
        var data = { text: response.choices[0].message.content };

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            data: data,
            headers: {
                "Project-ID": process.env.PROJECT_ID,
                "User-Name": process.env.BOT_USER_NAME,
                "User-Secret": process.env.BOT_USER_SECRET,
            },
            
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        let rs = response.choices[0].message.content
        res.status(200).json({ text: response.choices[0].message.content })
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error.message })
    }
});
//
openAiRoute.post('/chatbot', async (req, res) => {
    try {
        const { text, activeChatId } = req.body;
        
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://deepvision.ekgis.vn:2023/agent/v1/auto/',
            headers: {
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                session_id: 'string',
                prompt_message: text,
              })
        });
        
        var data = { text: response.data.prompt_message };

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            data: data,
            headers: {
                "Project-ID": process.env.PROJECT_ID,
                "User-Name": process.env.BOT_USER_NAME,
                "User-Secret": process.env.BOT_USER_SECRET,
            },
            
        };

        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        let rs = response.choices[0].message.content
        res.status(200).json({ text: response.choices[0].message.content })
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ error: error.message })
    }
});
//
openAiRoute.post('/code', async (req, res) => {
    try {
        const { text, activeChatId } = req.body;
        console.log(text);
        const response = await openai.creatCompletion({
            model: 'code-davinci-003',
            messages: [{ role: 'user', content: 'Say this is a test' }],
            prompt: text,
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })
        // console.log(response);
        console.log('11111111111111111111');
        await axios.post(
            `http://api.chatengine.io/chats/${activeChatId}/messages/`, { text: response.data.choices[0].text },
            {
                headers: {
                    "Project-ID": process.env.PROJECT_ID,
                    "User-Name": process.env.BOT_USER_NAME,
                    "User-Secret": process.env.BOT_USER_SECRET,
                }
            }
        )

        res.status(200).json({ text: response.data.choices[0].text })
    } catch (error) {
        console.log('error', error.response.data.error);
        res.status(500).json({ error: error.message })
    }
});

export default openAiRoute;