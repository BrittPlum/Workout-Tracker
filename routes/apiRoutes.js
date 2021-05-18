const db = require("../models");
const router = require("express").Router();
router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      { $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }}
    ]).sort( {
      _id: -1
    }).limit(10)
      .then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.status(400).json(err);
        });
  });
  router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
      { $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }}
    ]).then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.status(400).json(err);
        });
  });
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.updateOne(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    (error, edited) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(edited);
        res.send(edited);
      }
    }
  );
});
module.exports = router;

//////////////////////////////////////////////////////////////

// const db = require("../models");
// const router = require("express").Router();


// router.post("/api/workouts", ({ body }, res) => {
//     db.Workout.create(body)
//     .then(dbWorkout => {
//         res.json(dbWorkout);
//     })
//     .catch(err => {
//         res.status(400).json(err);
//     });
// });

// router.post("/api/workouts/bulk", ({ body }, res) => {
//     db.Workout.insertMany(body)
//     .then(dbWorkout => {
//         res.json(dbWorkout);
//     })
//     .catch(err => {
//         res.status(400).json(err);
//     });
// });

// router.post("/api/workouts/:id", (req, res) => {
//     db.Workout.updateOne(
//         {_id: req.params.id },
//         { $push: { exercises: req.body } },
//         (error, edited) => {
//             if (error) {
//                 console.log(error);
//                 res.send(error);
//             } else {
//                 console.log(edited);
//                 res.send(edited);
//             }
//         }
//     )
// })
// router.get("/api/workouts", (req, res) => {
//     db.Workout.find({})
//     .sort({ date: -1 })
//     .then(dbWorkout => {
//         res.json(dbWorkout);
//     })
//     .catch(err => {
//         res.status(400).json(err);
//     });
// });

// router.get("api/workouts/range", (req, res) => {
//     db.Workout.find({})
//     .then((dbWorkout) => {
//         res.json(dbWorkout);
//     })
//     .catch (err => {
//         res.status(400).json(err);
//     });
// });

// module.exports = router;

//////////////////////////////////////////////////////////////////////////

// const router = require("express").Router;
// const db = require("../models");



//     router.get("/api/workouts", (req, res) => {
//         db.Workout.find({}).then(dbWorkout => {
//             res.json(dbWorkout);
//         })
//         .catch(err => {
//             res.status(400).json(err);
//         });
//     })
//     router.get("/api/workouts/range", ({}, res) => {
//       db.Workout.find({}).then((dbWorkout) => {
//         res.json(dbWorkout);
//       }).catch(err => {
//         res.status(400).json(err);
//       });
//     });
//     router.post("/api/workouts/", (req, res) => {
//         db.Workout.create(req.body).then((dbWorkout) => {
//           res.json(dbWorkout);
//         }).catch(err => {
//             res.status(400).json(err);
//           });
//       });
//       router.put("/api/workouts/:id", (req, res) => {
//         db.Workout.findByIdAndUpdate(
//           { _id: req.params.id }, { exercises: req.body }
//         ).then((dbWorkout) => {
//           res.json(dbWorkout);
//         }).catch(err => {
//           res.status(400).json(err);
//         });
//     });
