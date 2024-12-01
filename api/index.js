const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RegisterModel = require('./models/Register');
const PlaceModel = require('./models/Place'); // Import the Place model

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/RegisterUser", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({ status: "Success", name: user.name });
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => res.json(err));
});

app.post('/register', (req, res) => {
    RegisterModel.create(req.body)
        .then(registers => res.json(registers))
        .catch(err => res.json(err));
});



app.post('/addPlaces', (req, res) => {
    PlaceModel.create(req.body)
        .then(place => res.json(place))
        .catch(err => res.json(err));
});

// Add this to your Express server code

app.get('/user-places', (req, res) => {
    PlaceModel.find({})
        .then(places => res.json(places))
        .catch(err => res.status(500).json({ error: err.message }));
});


app.get('/user-places/:id', (req, res) => {
    const placeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(placeId)) {
        return res.status(400).json({ error: "Invalid place ID format" });
    }

    PlaceModel.findById(placeId)
        .then(place => {
            if (place) {
                res.json(place);
            } else {
                res.status(404).json({ error: "Place not found" });
            }
        })
        .catch(err => {
            console.error("Error fetching place details:", err);
            res.status(500).json({ error: "Failed to fetch place details" });
        });
});


const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

