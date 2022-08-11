// This script executes the replicaset initialization until it succeeds

var rsConfig = {
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo01:27017" },
    { _id: 1, host: "mongo02:27017" },
    { _id: 2, host: "mongo03:27017" }
  ]
};

while (rs.initiate(rsConfig).ok === 0) {
  sleep(100);
}
