const express = require('express');
const router = express.Router();

router.post('/getVehicals', async (req, res) => {

    const vehicles = [];
  
    try {
  
        db.collection("vehicles").get().then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
             
              const vehicleData = doc.data();
              vehicles.push(vehicleData);
            });
        
           
            res.status(200).send(vehicles);
        })

    } catch (error) {
      res.status(400).send("Something went wrong. Please try again")
    }
})
    
router.post('/addVehicles', async (req, res) => {
    try {
      const requestFields = req.body.requestFields;
  
      if (
        !requestFields.userID ||
        !requestFields.vehicleName ||
        !requestFields.contact ||
        !requestFields.vehicleNumber
      ) {
        return res.status(400).send('Required fields are missing');
      }
  
      const vehicleNumber = requestFields.vehicleNumber;

      const existingVehicle = await db
        .collection('vehicles')
        .where('vehicleNumber', '==', vehicleNumber)
        .get();
  
      if (!existingVehicle.empty) {
        return res.status(400).send('A vehicle with this number already exists');
      }
  
      const vehicleData = {
        userID: requestFields.userID,
        vehicleName: requestFields.vehicleName,
        contact: requestFields.contact,
        vehicleNumber: vehicleNumber,
        vehicalImage : requestFields.vehicalImage

      };
  
      await db.collection('vehicles').add(vehicleData);
  
      return res.status(200).send('Successfully Added');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  router.post('/deleteVehicals', async (req, res) => {
  
    let vehicalID = req.body.vehicalID;

    const vehicleIdToDelete = vehicalID;

    // Reference the specific vehicle document and delete it
    db.collection("vehicles").doc(vehicleIdToDelete).delete().then(() => {
        res.status(200).send("Vehicle document successfully deleted!");
    })
    .catch((error) => {
        res.status(400).send("Error deleting vehicle document");
    });

})

module.exports = router;