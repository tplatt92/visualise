"use server";

export async function fetchUserObjectAction(userId: any) {
	let fetchUserObject = await fetch(`http://localhost:8080/tables/${userId}`);

	let userObject = await fetchUserObject.json();

	return userObject;
}

export async function handleNewTableAction(userId: any, tableObject: any) {
	let newTable = await fetch(`http://localhost:8080/tables/${userId}`, {
		method: "POST",
		mode: "cors",
		// credentials: "include",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json;charset=UTF-8",
		},
		body: JSON.stringify(tableObject),
	});

	return newTable;
}
