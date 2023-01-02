import * as dotenv from 'dotenv'
dotenv.config()

import { Bot } from "grammy"
import { Menu } from "@grammyjs/menu";
import { getFlightInfo, getLocation } from "./flight_tracker.js"
import { createInfoResponse } from "./utils.js"

//create bot
const bot = new Bot(process.env.BOT_KEY);

//basic menu
const menu = new Menu("rydar-menu")
  .text("Check Flight Status", (ctx) => ctx.reply(
    "🔍 To search for information on a flight, reply with the '/search' command, followed by the flight number:" +
    "\n\n /search <Flight Number Here>" +
    "\n\n 👉 Example: /search FA299")
    ).row()
  .text("Tag a Flight for Tracking", (ctx) => ctx.reply("Tagging Flight:"))
  .text("Currently Tagged Flights", (ctx) => ctx.reply("Tagged Flights"));

bot.use(menu);

//Handles the "start" command
bot.command("start", (ctx) => {
    ctx.reply("Use the /menu command to get started" + 
    "\n\nNB: only 'Check Flight Status'currently working"
    )
})

//Handles the "menu" command
bot.command("menu", async (ctx) => {
    // Send the menu.
    await ctx.reply("Main Menu:", { reply_markup: menu });
});

//listener flight search command
bot.command("search", (ctx) => {
    const txt = ctx.match;
    console.log("User seached for flight: ", txt);
    ctx.reply(`Searching for Flight...`);
    setTimeout(() => {console.log("Seach Done")}, 2000);
    
    getFlightInfo(txt, process.env.AIR_LAB_KEY, ctx)
        .then(x => {
            if (x.response.status == "en-route") {

                //convert coordinates of aircraft to location
                getLocation(x.response.lat, x.response.lng, process.env.GEO_KEY).then(y => {
                
                //create text response about en-route flight status    
                let info = createInfoResponse(x.response.status, x.response, y);
                ctx.reply(info)
            });

            } else {
                let info = createInfoResponse(x.response.status, x.response);
                ctx.reply(info)
            }
        })   
        .catch(error => {
            console.log(error)
            ctx.reply("❗️Error: Flight not found, please ensure flight number is correct and try again.");
        })
});

//any other unspecified commands used or messages used
bot.on("message", (ctx) => {
    ctx.reply("🤖 Hey...I am just a bot and cannot understand anything besides the commands " + 
    "the idiot who made me provided." + 
    "\n\nThus, please make use of the stipulated commands only."
    );
})


bot.start();
