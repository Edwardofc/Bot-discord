const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
    {
        name: 'asistencia',
        description: 'Muestra información sobre la asistencia del servidor de Minecraft',
    },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Iniciando la actualización de comandos /');
        await rest.put(Routes.applicationCommands('YOUR_CLIENT_ID'), { body: commands });
        console.log('Comandos registrados correctamente.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', () => {
    console.log(`Conectado como ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'asistencia') {
        await interaction.reply('Aquí tienes la información sobre la asistencia del servidor de Minecraft.');
    }
});

client.login(token);
