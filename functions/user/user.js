const Airtable = require("airtable");
const keys = require("../../keys.js");

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context, callback) => {
  let { body } = event;
  fields = JSON.parse(body);

  console.log(fields);

  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: keys.airtable.API,
  });

  var base = Airtable.base("appHzP60ZmgxE6FaD");

  const records = await base("Table 1").create([
    { fields },
  ]);
  records.forEach(function (record) {
    console.log(record.getId());
  });
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(records[0]),
  });
};
