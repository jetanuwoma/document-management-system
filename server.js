import app from './server/config/app';

const port = process.env.PORT || 3001;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App running at http://localhost:${port}`);
  }
});
