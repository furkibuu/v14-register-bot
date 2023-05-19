let reqEvent = (event) => require(`./events/${event}`); 
module.exports = client => {
    client.on('messageCreate', reqEvent('messageCreate'));
};