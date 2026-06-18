const WebSocket = require('ws');

// dihcord user token and allowed ids go here
const YOUR_TOKEN = "ur user fucking token and yess keep quotes"; 
const ALLOWED_ID = "1514324250683641887";

const ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
let heartbeatInterval = null;

ws.on('open', () => {
    console.log('Connecting to dihcord make sure no potato wifi...');
});

ws.on('message', async (data) => {
    const payload = JSON.parse(data);
    const { op, d, t } = payload;

    // Keep connection alive
    if (op === 10) { 
        heartbeatInterval = setInterval(() => {
            ws.send(JSON.stringify({ op: 1, d: null }));
        }, d.heartbeat_interval);

        // Log in to your account
        ws.send(JSON.stringify({
            op: 2,
            d: {
                token: YOUR_TOKEN,
                capabilities: 16381,
                properties: {
                    os: 'linux',
                    browser: 'chrome',
                    device: ''
                },
                presence: {
                    status: 'online',
                    since: 0,
                    activities: [],
                    afk: false
                },
                compress: false
            }
        }));
    }

    // Successfully logged in
    if (op === 0 && t === 'READY') {
        console.log('Dihcord ping checker active');
    }

    // Look for new messages
    if (op === 0 && t === 'MESSAGE_CREATE') {
        if (d.content === '§ping') {
            const channelId = d.channel_id;
            const authorId = d.author.id;

            // Calculate latency using timestamps
            const msgTime = new Date(d.timestamp).getTime();
            const now = Date.now();
            const apiLatency = now - msgTime;

            // Check if it is your ID
            if (authorId === ALLOWED_ID) {
                const fakeEmbed = "```ansi\n" +
                    "\u001b[2;35mDihcord connection\u001b[0m\n" +
                    "\u001b[2;37mStatus:\u001b[0m Ok\n" +
                    "\u001b[2;37mPing:\u001b[0m " + apiLatency + "ms\n" +
                    "```";

                sendDiscordMessage(channelId, fakeEmbed);
            } else {
                // Sent if anyone else tries it
                sendDiscordMessage(channelId, "what a fucking dumbass retard u ain't in the allowed list fam ✌️");
            }
        }
    }
});

// Helper function to send HTTP POST requests to Discord
function sendDiscordMessage(channelId, content) {
    fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
            "Authorization": YOUR_TOKEN,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: content })
    }).catch(err => console.error('Error sending message:', err));
}

ws.on('close', () => {
    clearInterval(heartbeatInterval);
    console.log('yo check ur damn internet u got disconnected from dihcord ');
});
