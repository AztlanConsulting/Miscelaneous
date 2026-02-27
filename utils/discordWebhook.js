exports.sendWebhook = async (webhookUrl, message, user)=> {
    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: message,
            users: [user]
        })
    });
};