require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
//const fileUpload = require('express-fileupload')
const chatRoutes = require("./routes/Chat/chatRoutes");
const messageRoutes = require("./routes/Chat/messageRoutes");
const clientfRoutes = require("./routes/zervant/clientfRoutes");
const productRoutes = require("./routes/zervant/productRoutes");
const factureRoutes = require("./routes/zervant/factureRoutes");
const devisRoutes = require("./routes/zervant/devisRoutes");
const candidatRoutes = require("./routes/Candidat/candidatRoutes");
const eventRoutes = require("./routes/event/eventRoutes");
const uploadRoutes = require("./routes/event/uploadRoutes");
const infoRoutes = require("./routes/info/infoRoutes");
const audiovisuelRoutes = require("./routes/audiovisuel/audiovisuelRoutes")
const educationRoutes = require("./routes/education/educationRoutes")
const entraideRoutes = require("./routes/entraide/entraideRoutes")
const entretienoutes = require("./routes/entretien/entretienRoutes")
const investirRoutes = require("./routes/investir/investirRoutes")
const apprendreRoutes = require("./routes/apprendre/apprendreRoutes")
const permacultureRoutes = require("./routes/permaculture/permacultureRoutes")
const sadaqaRoutes = require("./routes/sadaqa/sadaqaRoutes")
const santeRoutes = require("./routes/sante/santeRoutes")
const voyageRoutes = require("./routes/voyage/voyageRoutes")







const  path = require('path')
const multer = require('multer');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); 
//const upload = require('./routes/zervant/upload');
/*

verbs which are followed by object + infinitive 

tell, allow, remind , want, authoriz,


*/
// Configurez MongoDBStore pour stocker les sessions dans MongoDB


const colors = require('colors')
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;
  
const app = express()
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: 'sessions',
});
// Gérez les sessions dans l'application Express 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,   
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Durée de vie de la session en millisecondes (1 jour)
    httpOnly: true, // Empêche l'accès au cookie via JavaScript
  },
}));
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({ extended: false }))

//app.use(cors({}))
app.use(cors());
// Ajoutez des journaux pour vérifier si la session est initialisée avec succès
app.use((req, res, next) => {
  //console.log('Session ID:', req.sessionID);
 // console.log('Session Data:', req.session);
  next();
});
app.use(cookieParser())
//app.use(fileUpload({
  //  useTempFiles: true
//}))

//routes
app.use('/api/user', require('./routes/userRoutes'))
//app.use('/api/upload', uploadRoutes)
// Le préfixe '/api' peut être modifié selon vos besoins
//app.use('/api/softskills', require('./routes/Candidat/softskillsRoutes'))
//app.use('/api/hardskills', require('./routes/Candidat/hardskillsRoutes'))
app.use('/api/candidat', require('./routes/Candidat/candidatRoutes'))
{/*app.use('/api/client', require('./routes/clientRoutes'))
*/}
//app.use('/api/recrutement', require('./routes/Candidat/recrutementRoutes'))
//app.use('/api/processrecrutement', require('./routes/Candidat/processRoutes'))
{/*app.use('/api/recrutementstep', require('./routes/recrutementstepRoutes'))
*/}//app.use('/api/permission', require('./routes/permissionRoutes'))
//app.use('/api/role', require('./routes/roleRoutes'))
//app.use('/api/businessunit', require('./routes/businessunitRoutes'))
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/clientf", clientfRoutes); 
app.use("/api/product", productRoutes);   
app.use("/api/facture", factureRoutes);
app.use("/api/devis", devisRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/infos", infoRoutes);
app.use("/api/audiovisuels", audiovisuelRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/entraides", entraideRoutes);
app.use("/api/entretiens", entretienoutes);
app.use("/api/investirs", investirRoutes);
app.use("/api/apprendres", apprendreRoutes);
app.use("/api/permacultures", permacultureRoutes);
app.use("/api/sadaqas", sadaqaRoutes);
app.use("/api/santes", santeRoutes);
app.use("/api/voyages", voyageRoutes);





//app.use('/api/upload', upload); 
//app.use("/api/upload", uploadRoutes)
//const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(errorHandler)
  
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Répertoire de stockage des fichiers téléchargés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },/*kkgbkgggkkkkkkkk*/
});

const upload = multer({ storage: storage });

/*app.post('/api/upload', upload.single('file'), (req, res) => {
  // Gérer le fichier téléchargé, par exemple, enregistrer le chemin du fichier dans la base de données
  // Envoyer une réponse au client indiquant que le téléchargement a réussi
  res.json({ message: 'Téléchargement réussi' });
});*/
connectDB();

server =app.listen(port, () => console.log(`Server started on port ${port}`));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    }, 
  });
  
  io.on("connection", (socket) => {
   // console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
     // console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return
      // console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });     
    });  
   socket.off("setup", () => {
      //console.log("USER DISCONNECTED");  
     socket.leave(userData._id);
    });

  });
/* Verbs which are followed by object + infinive with to 

1) advice 2) allow 3)ask 4) want 5)expect 6) teach (how) 7)authorize 8)encourage 9)need 10) remind 11) tell 12) forbid
*/
  




/*Verbs which are followed by object + infinitives with "to"

1) 2)3)4) 5)  6) 7) 8)9)10) 11) 12
1)
2)
3)
4) 
5) 
6)
7) 
8)
9) 
10)
11)
12)


1)ask 2)allow 3)encorage4)tell 5) authorise 6)want 7)expect 8)teach(how) 9) remind 10)forbid 11)advice 12 need


*/



/* 

verbs which are followed by ing form:

1) love
2) like
3) adore
4) hate
5) don't mind
6) can't help
7) can't stand
8) can't imagine
9) fancy
10) miss
11) enjoy
12) involve
13) feel like

verbs which are followed by infinitives with "to" :

1)  arrange
2)  appear
3)  aim
4)  offer
5)  plan
6)  refuse
7)  rang
8)  want
9)  wish
10) learn (how)
11) expect
12) hope
13) agree



verbs which are followed by object + infinitive with to
1)  tell
2)  allow
3)  ask
4)  advice
5)  authorize
6)  remind
7)  forbed
8)  want
9)  expect
10) teach(how)
11) need
12) encorage

*/