require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const port = 3000;
const app = express();

// Database connection
const mongoose = require('mongoose');

const connectionString = 'mongodb://rouguiyatoudiallo700@gmail.com:GoM@y2(ode)@154.125.83.171:27017/mongoose';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// schema de personne
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// modéle de personne
const Person = mongoose.model('Person', personSchema);

// créer une personne
const person = new Person({
  name: 'Rokhaya sarr',
  age: 24,
  favoriteFoods: ['Thiép', 'Chicken']
});

person
  .save()
  .then(() => {
    console.log('Person added successfully.');
  })
  .catch((err) => {
    console.error(err);
  });

// création d'un tableau de personne
const arrayOfPeople = [
  { name: 'Mansour Diallo', age: 18, favoriteFoods: ['Ponecé', 'Chicken'] },
  { name: 'Alpha Diallo', age: 14, favoriteFoods: ['mafé', 'Thiép'] },
  { name: 'Souleymane Diallo', age: 25, favoriteFoods: ['poulet','Thiou'] }
];

Person
  .insertMany(arrayOfPeople)
  .then(() => {
    console.log('People added successfully.');
  })
  .catch((err) => {
    console.error(err);
  });

// obtenir des personnes
Person
  .find()
  .then((docs) => {
    console.log('People Found:', docs);
  })
  .catch((err) => {
    console.error(err);
  });

// plat préféré "Thiép"
Person
  .findOne({ favoriteFoods: { $in: ['Thiép'] } })
  .then((doc) => {
    console.log('Person found:', doc);
  })
  .catch((err) => {
    console.error(err);
  });

// obtenir une personne par ID
const idUser = '64ce5946608973ac63628bf1';

Person
  .findById(idUser)
  .then((doc) => {
    console.log('Person found:', doc);
  })
  .catch((err) => {
    console.error(err);
  });

// recherché par ID
const id = '64ce5946608973ac63628bf1';

Person
  .findById(id)
  .then((doc) => {
    doc.favoriteFoods.push('chicken');
    doc.save();
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

// recherché par nom et mettre a jour l'age
Person
  .findOneAndUpdate({ name: 'Mansour Diallo' }, { age: 18 }, { new: true })
  .then((doc) => {
    console.log('Age updated:', doc);
  })
  .catch((err) => {
    console.error(err);
  });

// supprimer une personne avec ID
const idDel = '64ce5946608973ac63628bf4';

Person
  .findByIdAndRemove(idDel)
  .then(() => {
    console.log(`Person with ID ${idDel} has been deleted.`);
  })
  .catch((err) => {
    console.error(err);
  });

// supprimer par name "Alpha Diallo"
Person
  .deleteMany({ name: 'Alpha Diallo' })
  .then(() => {
    console.log('Alpha Diallo successfully deleted.');
  })
  .catch((err) => {
    console.error(err);
  });

// trouver des gens qui aime Thiép
Person
  .find({ favoriteFoods: { $in: ['Thiép'] } })
  .sort('name')
  .limit(2)
  .select()
  .then((docs) => {
    console.log('People who like Thiép:', docs);
  })
  .catch((err) => {
    console.error(err);
  });

// server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

