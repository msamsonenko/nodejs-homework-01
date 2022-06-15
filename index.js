const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();
console.log(program);
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case "list":
			const contactsLsit = await listContacts();
			console.table(contactsLsit);
			break;
		case "get":
			const contact = await getContactById(id);
			if (!contact) {
				throw new Error(`Contact with id=${id} not found`);
			}
			console.log(`Contact with id=${id}: `, contact);
			break;
		case "remove":
			const contactToRemove = await removeContact(id);
			if (!contactToRemove) {
				throw new Error(`Contact with id=${id} not found`);
			}
			console.log(`Removed contact with id=${id}: `, contactToRemove);
			break;
		case "add":
			const newContact = await addContact({ name, email, phone });
			console.log(`A new contact created: `, newContact);
			break;
		default:
			console.log("\x1B[31m Unknown action type!");
	}
};

(async () => {
	await invokeAction(argv);
})();
