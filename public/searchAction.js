const igdb = require('igdb-api-node').default;
const client = igdb('d24a990ec0ea072538e13060eda5b3ae');

client.games({
    fields: '*', // Return all fields
    limit: 5, // Limit to 5 results
    offset: 15 // Index offset for results
}).then(response => {
    // response.body contains the parsed JSON response to this query
}).catch(error => {
    throw error;
});