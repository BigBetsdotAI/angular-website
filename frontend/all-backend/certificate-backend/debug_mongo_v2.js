import mongoose from 'mongoose';

// Standard connection string we constructed
const uri = "mongodb://certificate-backend:0tUYEXkBD032agxm@ac-kgxsslm-shard-00-00.k1gyis6.mongodb.net:27017,ac-kgxsslm-shard-00-01.k1gyis6.mongodb.net:27017,ac-kgxsslm-shard-00-02.k1gyis6.mongodb.net:27017/?authSource=admin&replicaSet=atlas-q4lbg5-shard-0&ssl=true&appName=certificate-backend";

console.log("Attempting to connect with standard URI...");

async function connect() {
    try {
        // Attempt 1: Standard
        console.log("Test 1: Normal Connection...");
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("✅ Test 1 Success!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Test 1 Failed:", err.message);

        try {
            // Attempt 2: Insecure SSL (for corporate proxies)
            console.log("\nTest 2: Insecure SSL (tlsAllowInvalidCertificates: true)...");
            await mongoose.connect(uri, {
                tlsAllowInvalidCertificates: true,
                serverSelectionTimeoutMS: 5000
            });
            console.log("✅ Test 2 Success! (It was an SSL Proxy issue)");
            console.log("👉 You need to add '&tlsAllowInvalidCertificates=true' to your .env connection string.");
            process.exit(0);
        } catch (err2) {
            console.error("❌ Test 2 Failed:", err2.message);
            console.log("\n❌ CONCLUSION: This is definitely an IP Whitelist issue on MongoDB Atlas.");
            console.log("Please ensure '0.0.0.0/0' is valid and active in the 'Network Access' tab.");
            process.exit(1);
        }
    }
}

connect();
