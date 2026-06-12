const dns = require('dns');

dns.resolveSrv('_mongodb._tcp.cluster0.c8mbgea.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('resolveSrv error:', err);
    process.exit(1);
  }
  console.log('resolveSrv addresses:', addresses);
});
