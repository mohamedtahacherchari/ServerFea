const handleEntraideErrors = (error, res) => {
    // Define a schema for errors to be returned
    const SchemaErrors = { title: '', start: '', end: '' };

    // Handle schema validation errors
    if (error.errors) {
        let isUnknownErrorIncluded = false;

        Object.values(error.errors).forEach(error => {
            if (error.properties) {
                SchemaErrors[error.properties.path] = error.properties.message;
            } else {
                // Flag that there was an unknown error type
                isUnknownErrorIncluded = true;
                // Optionally log these unknown errors
                console.log('Unexpected error format:', error);
            }
        });

        // Only add the 'unknown' error if other error handling hasn't populated the response
        if (isUnknownErrorIncluded && Object.keys(SchemaErrors).every(key => SchemaErrors[key] === '')) {
            SchemaErrors['unknown'] = 'An unexpected error occurred';
        }

        return res.status(400).json(SchemaErrors); // Using 400 for bad requests
    }

    // Handle duplicate key errors
    else if (error.code === 11000) {
        const keyField = Object.keys(error.keyPattern)[0];
        SchemaErrors[keyField] = `This is a duplicate ${keyField}. Please enter a new one.`;
        return res.status(409).json(SchemaErrors); // Using 409 for conflict errors
    }

    // Handle other types of errors
    else {
        return res.status(500).json({ error: "Something went wrong." });
    }
};

module.exports = handleEntraideErrors;