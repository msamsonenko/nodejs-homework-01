const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "/db", "contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	const contacts = JSON.parse(data);
	return contacts;
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const contact = contacts.find((item) => item.id === contactId);
	if (!contact) {
		return null;
	}
	return contact;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const contactIdx = contacts.findIndex((item) => item.id === contactId);
	if (contactIdx === -1) {
		return null;
	}
	const [contactToRemove] = contacts.splice(contactIdx, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return contactToRemove;
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const newContact = { name, email, phone, id: v4() };
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return newContact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
