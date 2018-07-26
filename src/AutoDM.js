const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 10; // timeout to send the message 5 min

const AutoDM = () => {
  const stream = T.stream("user");
  console.log("Start Sending Auto Direct Message 🚀🚀🚀");
  stream.on("follow", SendMessage);
  stream.on('direct_message', RespondToDm);
};

const RespondToDm = user => { 
  console.log('i was just Dmed');
  const { screen_name, name } = user.source;
  const obj = {
    screen_name,
    text: GenerateDmResponse(name)
  };
  if (screen_name != my_user_name) {
    console.log(" 🎉🎉🎉🎉  Bout to send a DM back  🎉🎉🎉🎉🎉 ");
    setTimeout(() => {
      console.log('tesssst');
      T.post("direct_messages/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log(`Message sent successfully To  ${screen_name}  💪💪`);
        });
    }, timeout);
  }
};

const SendMessage = user => {
  console.log('i was just followed');
  const { screen_name, name } = user.source;

  const obj = {
    screen_name,
    text: GenerateMessage(name)
  };
  // the follow stream track if I follow author person too.
  if (screen_name != my_user_name) {
    console.log(" 🎉🎉🎉🎉 New Follower  🎉🎉🎉🎉🎉 ");
    setTimeout(() => {
      console.log('tesssst');
      T.post("direct_messages/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log(`Message sent successfully To  ${screen_name}  💪💪`);
        });
    }, timeout);
  }
};
const GenerateMessage = name => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  return `Hi ${name} Thanks for following me! This is an automated message sent by a bot :)`; // your message
  // My message   return `Hi ${name} Thanks for being a part of my social media network. I'am the @PicsrushE founder,A new Online Image Editor completely with web technologies,I'm also a reactjs developer and medium blogger.\n Happy to discuss anytime 😊  \n Happy ${dayName} 😊😊 `;
};
const GenerateDmResponse = name => {
  return `Hello ${ name } I am an automated DM response :)`; // your message
};
module.exports = AutoDM;
