import app from "./app";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Closing server...");
  server.close(() => {
      console.log("Server closed");
      process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("Closing server...");
  server.close(() => {
      console.log("Server closed");
      process.exit(0);
  });
});