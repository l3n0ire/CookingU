const Dialogflow = require('dialogflow');
const Pusher = require('pusher');
const getRecipeInfo = require('./recipe-request')

// You can find your project ID in your Dialogflow agent settings
const projectId = 'hackthevalleyiv'; //https://dialogflow.com/docs/agents#settings
const sessionId = '123456';
const languageCode = 'en-US';

const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  },
};

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true,
});
var hardcodeTest = [
  {
    number: 1,
    step: 'Heat oil in a medium saucepan over medium heat.',
    ingredients: [],
    equipment: [[Object]]
  },
  {
    number: 2,
    step: 'Add onions and cook until soft. Stir in the cinnamon and chili powder and cook for 1 minute.',
    ingredients: [[Object], [Object], [Object]],
    equipment: [],
    length: { number: 1, unit: 'minutes' }
  },
  {
    number: 3,
    step: 'Add the ketchup, water, hot sauce and salt and black pepper and bring to a simmer. Cook mixture for 10 to15 minutes or until thickened.',
    ingredients: [[Object], [Object], [Object]],
    equipment: [],
    length: { number: 15, unit: 'minutes' }
  },
  {
    number: 4,
    step: 'Transfer to a bowl and let cool to room temperature before serving.',
    ingredients: [],
    equipment: [[Object]]
  }
]

const sessionClient = new Dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = message => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      console.log(result.intent.displayName)
      if (result.intent.displayName === "next-step") {
        return pusher.trigger('bot', 'next-instruction', {
          message: result.fulfillmentText,
        });
      }
      else if (result.intent.displayName === "detect-recipe") {
        const recipe = result.parameters.fields['recipes'].stringValue;
        //return pusher.trigger('bot', 'give-instruction', { instructions: hardcodeTest, message: `Okay, lets make ${recipe}` });
        return getRecipeInfo(recipe);
      }
      else if (result.intent.displayName === "exit-recipe") {
        return pusher.trigger('bot', 'exit-instructions', {
          message: result.fulfillmentText,
        });
      }
      else if (result.intent.displayName === "repeat-step") {
        return pusher.trigger('bot', 'repeat-instruction', {
          message: result.fulfillmentText,
        });
      }
      return pusher.trigger('bot', 'bot-response', {
        message: result.fulfillmentText,
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

module.exports = processMessage;