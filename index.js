const { getAllContacts, getContactById, addContact, removeContactById } = require("./db/contacts");
const argv = require('yargs').argv;
const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const invokeAction = async ({action, id, name, email}) => {
    switch(action) {
        case "list":
            const allContacts = await getAllContacts();
            return console.log(allContacts);
        case "get":
            const oneContact = await getContactById(id);
            return console.log(oneContact);
        case "add":
            const newContact = await addContact({name, email});
            return console.log(newContact);
        case "remove":
            const deleteContact = await removeContactById(id);
            return console.log(deleteContact);
        default: 
            return console.log("Unknown action")
    }
};

const actionIndex = process.argv.indexOf("--action");
if(actionIndex !== -1) {
    const action = process.argv[actionIndex + 1];
    invokeAction({action});
};

invokeAction(argv);

