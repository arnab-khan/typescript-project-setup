const storeFolderName = 'cards';
const apiUrl='https://create-cards-1-default-rtdb.firebaseio.com';

export async function getCard() {
    try {
        const response = await fetch(`${apiUrl}/${storeFolderName}.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        // console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


export async function postCard(newData: any) {
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
        console.log('Added data:', data);
        return data;
    } catch (error) {
        console.error('Error adding data:', error);
    }
}