var express = require('express');
var cors = require('cors');
const multer = require('multer');
const upload = multer();
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'),
     function (req, res) {
  /**
   * When you submit a file, you receive the file name, type, and size in bytes within the JSON response.
 */
const file = req.file
if (!file) {
  return res.status(400).json({ error: 'No file uploaded' });
} 

res.json({
  name: file.originalname,
  type: file.mimetype,
  size: file.size
});

});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
