const Pusher = require('pusher');

const { SPOONACULAR_API_KEY } = process.env;
const fetch = require('node-fetch');

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true,
});

const getRecipeInfo = (recipe) => {
    let requestURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&number=1&query=${recipe}`
    let opts = {
        'instructionsRequired': 'true',
        'number': '1',
        'addRecipeInformation': 'true',
    }
    for (const [opt, value] of Object.entries(opts)) {
        requestURL += `&${opt}=${value}`;
    }
    console.log(requestURL);
    fetch(
        requestURL,
        {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            return response.json() // << This is the problem
        })
        .then((responseData) => {
            console.log(responseData.results[0].analyzedInstructions.steps[3]);
            for(const instr of responseData.results[0].analyzedInstructions){
                pusher.trigger('bot', 'bot-response', { message: `Here is the ID: ${instr.steps[3]}` });
            }
            return responseData;
        })
        .then(data => { })
        .catch(error => console.log(error));
}


module.exports = getRecipeInfo;