/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'Welcome, you can say "Tell me something interesting about Mexico" or "Help." What would you like to try?',
            HELP_MESSAGE: 'You can ask me for a fact about Mexico by saying "Tell me something interesting about Mexico." How can I help you?',
            CONTINUE_MESSAGE:'...If you want other information say "Tell me something interesting about Mexico"',
            HELLO_MESSAGE: 'Hello world Angel!',
            GOODBYE_MESSAGE: 'Goodbye!',
            REFLECTOR_MESSAGE: 'You just activated %s',
            FALLBACK_MESSAGE: 'Sorry, I dont know about that. Please try again.',
            ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
            GET_FACT_MSG: 'Heres an interesting fact about Mexico: ',
            FACTS: [
                "One of the New Seven Wonders of the World, Chichen Itzá in Yucatán is a testament to the architectural and astronomical genius of the Mayans.",
                 "Mexico is one of the most biodiverse countries in the world, home to more than 200,000 different species, representing 10-12% of global biodiversity.",
                 "Traditional Mexican cuisine is so unique that it was declared Intangible Cultural Heritage of Humanity by UNESCO in 2010.",
                 "In addition to Spanish, more than 68 national indigenous languages ​​are spoken in Mexico, with Nahuatl and Yucatec Mayan being the most spoken.",
                 "Mexico is famous for the monarch butterfly sanctuaries in Michoacán and the State of Mexico, where millions of butterflies arrive each year from Canada and the United States to spend the winter.",
                 "Mexico celebrated its independence from Spain on September 16, 1810, known as the Grito de Dolores, initiated by the priest Miguel Hidalgo y Costilla.",
                 "Mexico is the birthplace of tequila and mezcal, two of the most popular spirits in the world. Tequila is produced exclusively in the Jalisco region and must be made from the blue agave plant.",
                 "Mexico was the first Latin American country to host the Olympic Games, in 1968, held in Mexico City.",
                 "Mexico has 35 sites declared World Heritage Sites by UNESCO, which places it among the countries with the most heritage sites in the world. These include historic centers, national parks and archaeological zones.",
                 "Day of the Dead, a celebration that occurs on November 1 and 2, is a holiday where families honor their deceased loved ones. It is known for its colorful altars, sugar skulls, and bread of the dead.",
            ]
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: 'Bienvenido, puedes decir "Dime algo interesante sobre Mexico" o "Ayuda". ¿Qué te gustaría intentar?',
            HELP_MESSAGE: 'Puedes pedirme un dato sobre Mexico diciendo "Dime algo interesante sobre Mexico". ¿Cómo te puedo ayudar?',
            CONTINUE_MESSAGE:'... Si quieres otro dato di "Dime algo interesante sobre Mexico"',
            HELLO_MESSAGE: 'Hola mundo Angel!',
            GOODBYE_MESSAGE: '¡Adiós!',
            REFLECTOR_MESSAGE: 'Acabas de activar %s',
            FALLBACK_MESSAGE: 'Lo siento, no sé sobre eso. Por favor, inténtalo de nuevo.',
            ERROR_MESSAGE: 'Lo siento, hubo un error. Por favor, inténtalo de nuevo.',
            GET_FACT_MSG: 'Aquí tienes un dato interesante sobre Mexico: ',
            FACTS: [
                "Una de las Nuevas Siete Maravillas del Mundo, Chichen Itzá en Yucatán es un testimonio del genio arquitectónico y astronómico de los mayas.",
                "México es uno de los países con mayor biodiversidad en el mundo, hogar de más de 200,000 especies diferentes, lo que representa el 10-12% de la biodiversidad mundial.",
                "La cocina tradicional mexicana es tan única que fue declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2010.",
                "Además del español, en México se hablan más de 68 lenguas indígenas nacionales, siendo el náhuatl y el maya yucateco las más habladas.",
                "México es famoso por los santuarios de la mariposa monarca en Michoacán y el Estado de México, donde millones de mariposas llegan cada año desde Canadá y los Estados Unidos para pasar el invierno.",
                "México celebró su independencia de España el 16 de septiembre de 1810, conocido como el Grito de Dolores, iniciado por el cura Miguel Hidalgo y Costilla.",
                "México es el lugar de nacimiento del tequila y el mezcal, dos de los licores más populares del mundo. El tequila se produce exclusivamente en la región de Jalisco y debe hacerse de la planta de agave azul.",
                "México fue el primer país de América Latina en ser anfitrión de los Juegos Olímpicos, en 1968, celebrados en la Ciudad de México.",
                "México tiene 35 sitios declarados Patrimonio de la Humanidad por la UNESCO, lo que lo coloca entre los países con más sitios de patrimonio en el mundo. Estos incluyen centros históricos, parques nacionales y zonas arqueológicas.",
                "El Día de los Muertos, una celebración que ocurre el 1 y 2 de noviembre, es una festividad donde las familias honran a sus seres queridos fallecidos. Es conocida por sus altares coloridos, calaveras de azúcar y pan de muerto.",
                
            ]
        }   
    }
};


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const FrasesMexicoIntentHandler = {
        canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesMexicoIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const facts = requestAttributes.t('FACTS');
        const factIndex = Math.floor(Math.random() * facts.length);
        const randomFact = facts[factIndex];
        const speakOutput = requestAttributes.t('GET_FACT_MSG') + randomFact + '... Si quieres otro dato di "Dime algo interesante sobre México"';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    };
  }
};


/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        FrasesMexicoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
        )
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(LoggingRequestInterceptor, LocalizationInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();