const { Router } = require('express');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

const router = Router();
// router.get('/all', async (req, res, next) => {
//   try {
//     const noteSnapshot = await db.collection('feedback').get();
//     const feedbacks = [];
//     noteSnapshot.forEach((doc) => {
//       feedbacks.push({
//         id: doc.id,
//         data: doc.data(),
//       });
//     });
//     res.json(feedbacks);
//   } catch (e) {
//     next(e);
//   }
// });

// router.get('/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     if (!id) throw new Error('id is blank');
//     const feedbacks = await db.collection('feedback').doc(id).get();
//     if (!feedbacks.exists) {
//       throw new Error('feedback does not exists');
//     }
//     res.json({
//       id: feedbacks.id,
//       data: feedbacks.data(),
//     });
//   } catch (e) {
//     next(e);
//   }
// });

router.post('/create', async (req, res, next) => {
  try {
    const emotion = req.body.emotion;
    if (!req.body.code || req.body.code !== 'KFeedback2020!') {
      res.sendStatus(401);
    }
    if (!emotion) throw new Error('emotion is blank');
    const data = { ...req.body };
    const ref = await db.collection('feedback').add(data);
    res.json({
      id: ref.id,
      data,
    });
  } catch (e) {
    next(e);
  }
});

// router.put('/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const emotion = req.body.emotion;
//     if (!id) throw new Error('id is blank');
//     if (!emotion) throw new Error('emotion is blank');
//     const data = { ...req.body };
//     await db.collection('feedback').doc(id).set(data, { merge: true });
//     res.json({
//       id,
//       data,
//     });
//   } catch (e) {
//     next(e);
//   }
// });

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error('id is blank');
    await db.collection('feedback').doc(id).delete();
    res.json({
      id,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
