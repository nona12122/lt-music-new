const fs = require("fs");
const path = require("path");

module.exports = (client) => {
    client.commands = new Map();

    const commandsPath = path.join(__dirname, "..", "commands");

    if (!fs.existsSync(commandsPath)) return;

    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        try {
            const command = require(path.join(commandsPath, file));

            console.log("==========");
            console.log("Loading:", file);
            console.log(command);

            if (!command.data || !command.execute) {
                console.log(`❌ ${file} is missing data or execute.`);
                continue;
            }

            client.commands.set(command.data.name, command);
            console.log(`✅ Loaded command: ${command.data.name}`);
        } catch (err) {
            console.error(`❌ Error loading ${file}`);
            console.error(err);
        }
    }
};