const dns = require('dns');

const domains = [
    'certificate-backend.k1gyis6.mongodb.net',
    'loginpage.mokgzph.mongodb.net'
];

domains.forEach(domain => {
    console.log(`Resolving TXT for ${domain}...`);
    dns.resolveTxt(domain, (err, records) => {
        if (err) {
            console.error(`Error resolving TXT ${domain}:`, err.code, err.message);
        } else {
            console.log(`Success TXT ${domain}:`, JSON.stringify(records, null, 2));
        }
    });
});
