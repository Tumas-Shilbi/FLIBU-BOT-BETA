import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, args, command }) => {
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        throw "*يرجى تقديم نص أو الرد على رسالة بالنص الذي تريد تقديم عرض أسعار له !*";
    }

    try {
        // Create the quote
        let quote = await createQuote(m.name, text);

        // Define caption for the generated quote image
        let maker = "*لقد تم إنشاء عرض الأسعار الخاص بك !*"; 

        // Send the generated quote image with a caption
        await conn.sendFile(m.chat, quote, '', maker + "\n*مطلوب بواسطة:* " + m.name + "\n*يقتبس:* " + text, m);
    } catch (error) {
        console.error("*خطأ في إنشاء الاقتباس*:", error);
        m.reply("⚠️ *حدث خطأ أثناء إنشاء الاقتباس. يرجى المحاولة مرة أخرى لاحقًا*.");
    }
}

handler.tags = ["maker"];
handler.command = handler.help = ["quozio", "qmkr"];

export default handler;

async function createQuote(author, message) {
    const host = "https://quozio.com/";
    let path = "";

    try {
        // Submit the quote
        path = "api/v1/quotes";
        const body = JSON.stringify({
            author: author,
            quote: message,
        });

        const quote = await fetch(host + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        }).then((val) => val.json());

        console.log("Created quote at: " + quote["url"], "quote");
        const quoteId = quote["quoteId"];

        // Fetch the templates
        path = "api/v1/templates";
        const templates = await fetch(host + path)
            .then((val) => val.json())
            .then((val) => val["data"]);

        const index = Math.floor(Math.random() * templates.length);
        console.log("Chose template from: " + templates[index]["url"], "quote");
        const templateId = templates[index]["templateId"];

        // Apply the template to the quote
        path = `api/v1/quotes/${quoteId}/imageUrls?templateId=${templateId}`;
        const imageUrl = await fetch(host + path)
            .then((val) => val.json())
            .then((val) => val["medium"]);
        console.log("Created quote image at: " + imageUrl, "quote");

        // Return the generated image URL
        return imageUrl;

    } catch (error) {
        console.error("Error in creating quote:", error);
        throw "There was an issue with creating the quote.";
    }
}
