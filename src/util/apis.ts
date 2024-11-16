import { Card, Cards } from "../app/interfaces/cards";

const storeFolderName = 'cards'; // This folder created inside firebase database
const apiUrl = 'https://create-cards-1-default-rtdb.firebaseio.com'; // API url for firebase database

export async function getCard(id: string) { // Get card details for a single card
    try {
        const response = await fetch(`${apiUrl}/${storeFolderName}/${id}.json`); // Fetch a specific card by ID
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data: Card = await response.json();
        // console.log('Fetched single card:', data);
        return data; // Returns the specific card data
    } catch (error) {
        console.error('Error fetching single card:', error);
    }
}


export async function getCards() {  // Get all card list
    try {
        const response = await fetch(`${apiUrl}/${storeFolderName}.json`); // Fetch API itself returns a promise
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data: Cards = await response.json(); // Returns a promise that resolves with the result of parsing the body text as JSON
        // console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


export async function postCard(newData: Card) { // Create a new card
    try {
        const response = await fetch(`${apiUrl}/${storeFolderName}.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        // console.log('Added data:', data);
        return data;
    } catch (error) {
        console.error('Error adding data:', error);
    }
}

export async function editCard(id: string, updatedData: any) { // Change existing single card
    try {
        const response = await fetch(`${apiUrl}/${storeFolderName}/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        // console.log('Edited data:', data);
        return data;
    } catch (error) {
        console.error('Error updating data:', error);
    }
}


export async function deleteCard(id: string) { // Delete single card
    try {
        const response = await fetch(`${apiUrl}/${storeFolderName}/${id}.json`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        // console.log('Delete data:', data);
        return data;
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}
