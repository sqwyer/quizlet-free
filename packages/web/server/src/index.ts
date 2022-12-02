import * as express from 'express';
import { load } from 'quizlet-fetch';
import { resolve } from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/public', express.static(resolve(__dirname + '/../../public')))

app.get('/api/get_set', async (req: express.Request, res: express.Response) => {
    const { url } = req.query;
    try {
        const data = await load(url as string);
        res.json({
            data,
            success: true
        })
    } catch(err) {
        console.error(new Error(err).message)
        res.json({
            success: false,
            error: "Invalid URL"
        })
    }
});

app.get('/', (_req: express.Request, res: express.Response) => {
    res.sendFile(resolve(__dirname + '/../../pages/index.html'))
})

app.get('/study', (_req: express.Request, res: express.Response) => {
    res.sendFile(resolve(__dirname + '/../../pages/study.html'))
})

app.listen(PORT, (err?: any) => {
    if(err) throw err;
    else console.log('Running on PORT:' + PORT);
});