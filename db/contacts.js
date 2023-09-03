const fs = require('fs').promises;
const path = require('path');
const {nanoid} = require("nanoid");


const contactPath = path.join(__dirname, 'contacts.json');


const getAllContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
    const contacts = await getAllContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
  };

const removeContactById = async(id) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(item => item.id === id);

  if(index === -1) {
      return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (data) => {
  const contacts = await getAllContacts();
  const newContact = {
      id: nanoid(),
      ...data,
  };

  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

  

module.exports = {
    getAllContacts,
    getContactById,
    removeContactById,
    addContact
};


  

  

