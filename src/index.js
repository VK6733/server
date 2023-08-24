import Server from "./server";
import configuration from "./configuration";

const server = new Server(configuration);

server.run();

server.route();
