const express = require('express');
const app = express();
app.use(express.json());

app.post('/detect', (req, res) => {
    const { message } = req.body;
    let found = false;
    let pulse = null;

    try {
        const regex = /{[^}]*"recipient_id"[^}]*}/g;
        const match = message.match(regex);
        
        if (match) {
            const parsed = JSON.parse(match[0]);
            if (parsed.recipient_id && parsed.pulse_text && parsed.pulse_type) {
                found = true;
                pulse = parsed;
            }
        }
    } catch (error) {
        console.error('Parsing error:', error);
    }

    res.json({ found, pulse });
});

app.get('/', (req, res) => {
    res.send('PRTS Parser API is live!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`PRTS Parser running on port ${port}`);
});
