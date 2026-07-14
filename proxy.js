let db;
const request = indexedDB.open('volume', 2);

request.onupgradeneeded = function(event) {
    const database = event.target.result;
    if (!database.objectStoreNames.contains('urls')) {
        database.createObjectStore('urls', { keyPath: 'path', autoIncrement: true });
    }
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log('Database is ready for external calls.');
};

request.onerror = function(event) {
    console.error('Database failed to open:', event.target.error);
};

function add_website(user_data) {
    if (!db) {
        console.error('Database not ready yet');
        return;
    }

    const transaction = db.transaction(['urls'], 'readwrite');
    const store = transaction.objectStore('urls');
    
    const add_request = store.put(user_data);

    add_request.onsuccess = function() {
        console.log('Entry added successfully!');
    };

    add_request.onerror = function(event) {
        console.error('Failed to add entry:', event.target.error);
    };
}

async function get_record(id) {
    return new Promise((resolve, reject) => {
        if (!db) {
            console.error('Database not ready yet');
            reject('Database not ready');
            return;
        }

        const transaction = db.transaction(['urls'], 'readonly');
        const store = transaction.objectStore('urls');
        const get_request = store.get(id);

        get_request.onsuccess = function() {
            resolve(get_request.result);
        };

        get_request.onerror = function() {
            reject(get_request.error);
        };
    });
}

async function get_path(id) {
    return new Promise((resolve, reject) => {
        if (!db) {
            console.error('Database not ready yet');
            reject('Database not ready');
            return;
        }

        const transaction = db.transaction(['urls'], 'readonly');
        const store = transaction.objectStore('urls');
        const get_request = store.get(id);

        get_request.onsuccess = function() {
            resolve(get_request.result.path);
        };

        get_request.onerror = function() {
            reject(get_request.error);
        };
    });
}

async function get_type(id) {
    return new Promise((resolve, reject) => {
        if (!db) {
            console.error('Database not ready yet');
            reject('Database not ready');
            return;
        }

        const transaction = db.transaction(['urls'], 'readonly');
        const store = transaction.objectStore('urls');
        const get_request = store.get(id);

        get_request.onsuccess = function() {
            resolve(get_request.result.type);
        };

        get_request.onerror = function() {
            reject(get_request.error);
        };
    });
}

async function get_contents(id) {
    return new Promise((resolve, reject) => {
        if (!db) {
            console.error('Database not ready yet');
            reject('Database not ready');
            return;
        }

        const transaction = db.transaction(['urls'], 'readonly');
        const store = transaction.objectStore('urls');
        const get_request = store.get(id);

        get_request.onsuccess = function() {
            resolve(get_request.result.contents);
        };

        get_request.onerror = function() {
            reject(get_request.error);
        };
    });
}

async function get_cors_url(url) {
    const response = await fetch(`https://cors.io/?url=${url}`);
    const data = await response.json();

    console.log(`Status of ${url}:`, data.status);
    //add_website({ 'path': url, 'type': data.headers['content-type'], 'contents': data.body });

    return await Promise.all([
        url,
        data.headers['content-type'],
        data.body
    ]);
}
