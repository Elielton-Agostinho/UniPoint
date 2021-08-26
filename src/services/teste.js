const pg = require('pg');

export default function teste({ login, senha }) {
    
    const config = {
        host: 'unipnt.postgres.database.azure.com',
        user: 'elielton@unipnt',     
        password: 'Li3345ag',
        database: 'postgres',
        port: 5432,
        ssl: true
    };

    const client = new pg.Client(config);

    client.connect(err => {
        if (err) {
            console.log( err);
        }
        else {
            queryDatabase();
        }
    });

    function queryDatabase() {
        const query = `
            DROP TABLE IF EXISTS inventory;
            CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
            INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
            INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
            INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
        `;

        client
            .query(query)
            .then(() => {
                
                client.end(console.log('Closed client connection'));
                return 'Table created successfully!';
            })
            .catch(err => console.log(err))
            .then(() => {
                
                process.exit();
            });
    }
}