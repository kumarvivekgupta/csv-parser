import fs from 'fs';

async function parseCSVtoJSON(filePath) {
    // Read the file content
    const csvString = await fs.promises.readFile(filePath, 'utf-8');

    // Split the CSV string into lines
    const lines = csvString.split('\n').map(line => line.trim());

    // If the CSV string is empty or only contains header, return empty array
    if (lines.length === 0) {
        return [];
    }

    // Parse the first line as headers
    const headers = lines[0].split(',').map(header => header.trim());

    // Initialize an array to store JSON objects
    const result = [];

    // Parse each subsequent line as a JSON object
    for (let i = 1; i < lines.length; i++) {
        const fields = lines[i].split(',').map(field => field.trim());
        if (fields.length !== headers.length) {
            continue; // Skip lines with inconsistent number of fields
        }

        // Create an object with nested structure based on headers and fields
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            const keys = headers[j].split('.');
            let currentObj = obj;

            // Create nested objects as needed
            for (let k = 0; k < keys.length - 1; k++) {
                const key = keys[k];
                if (!currentObj[key]) {
                    currentObj[key] = {};
                }
                currentObj = currentObj[key];
            }

            // Assign value to the deepest nested key
            const value = fields[j];
            currentObj[keys[keys.length - 1]] = value;
        }

        // Push the object into the result array
        result.push(obj);
    }

    return result;
}

export default parseCSVtoJSON;