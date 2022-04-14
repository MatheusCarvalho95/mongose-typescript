import app from ".";

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
