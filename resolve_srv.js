const dns = require('dns');

const domains = [
    '_mongodb._tcp.certificate-backend.k1gyis6.mongodb.net',
    '_mongodb._tcp.loginpage.mokgzph.mongodb.net'
];

domains.forEach(domain => {
    console.log(`Resolving ${domain}...`);
    dns.resolveSrv(domain, (err, addresses) => {
        if (err) {
            console.error(`Error resolving ${domain}:`, err.code, err.message);
        } else {
            console.log(`Success ${domain}:`, JSON.stringify(addresses, null, 2));
        }
    });
});
