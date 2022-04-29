import { getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";

let commentListenerInstance = null;

export const getComments = async (trackId, setCommentList) => {
  const db = getFirestore(getApps()[0]);
  try {
    const commentsQuery = query(
      collection(db, "track", trackId, "comments"),
      orderBy("timestamp", "desc")
    );

    commentListenerInstance = onSnapshot(commentsQuery, (comments) => {
      const cleanedComments = comments.docs.map((value) => {
        const id = value.id;
        const data = value.data();
        return { id, ...data };
      });

      setCommentList(cleanedComments);
    });
  } catch (e) {
    console.error("Error querying: ", e);
  }
};

export const clearCommentListener = () => {
  if (commentListenerInstance != null) {
    commentListenerInstance();
    commentListenerInstance = null;
  }
};

export const putComment = async (userId, trackId, comment) => {
  const db = getFirestore(getApps()[0]);

  try {
    await addDoc(collection(db, "track", trackId, "comments"), {
      creator: userId,
      comment: comment,
      timestamp: Timestamp.now(),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
