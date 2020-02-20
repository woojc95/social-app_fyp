import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()


// with onRequest, firebase is going to provide me with a URL to see the response
// provide you with a complete serve environment without you worrying about devOps etc.
export const getFeed = functions.https.onRequest(async (req, res) => {
    const docs = await admin.firestore().collection('post').limit(10).get()
    res.send(docs.docs.map(doc => doc.data()))
})