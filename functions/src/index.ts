import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";
import {Post} from "./types";

admin.initializeApp();
const env = functions.config();

const firestore = admin.firestore();
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const postIndex = client.initIndex("post_search");

exports.indexPost = functions.firestore
    .document("posts/{postId}")
    .onCreate((snap) => {
      const data = snap.data();
      const objectID = snap.id;
      postIndex.saveObject({
        objectID,
        ...data,
      });
    });

exports.updatePostIndex = functions.firestore
    .document("posts/{postId}")
    .onUpdate((change) => {
      const newData = change.after.data();
      const objectId = change.after.id;
      return postIndex.saveObject({
        objectId,
        ...newData,
      });
    });


exports.unindexPost = functions.firestore
    .document("posts/{postId}")
    .onDelete((snap) => {
      const objectID = snap.id;
      return postIndex.deleteObject(objectID);
    });

exports.searchPost = functions.https.onCall(async (data) => {
  const {searchKeyword, searchOptions} = data;
  const result = await postIndex.search(searchKeyword, searchOptions);
  return result;
});

exports.searchPostByTag = functions.https.onCall(async (data) => {
  const {tag, offset, limit} = data;
  const snapshot = await firestore.collection("posts")
      .where("tags", "array-contains", tag)
      .orderBy("createdAt")
      .limit(limit)
      .offset(offset)
      .get();
  const res = [] as Post[];
  snapshot.forEach((doc) => {
    res.push({...doc.data(), objectID: doc.id} as Post);
  });
  return res;
});
