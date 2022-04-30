import { getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  Timestamp,
  orderBy,
  query,
  onSnapshot,
  updateDoc,
  increment,
} from "firebase/firestore";

let commentListenerInstance = null;

export const getComments = async (trackId, setCommentList) => {
  const db = getFirestore(getApps()[0]);
  try {
    const commentsQuery = query(
      collection(db, "track", trackId, "comments"),
      orderBy("likes", "desc")
      // orderBy("timestamp", "desc")
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
      likes: 1,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const likeComment = async (trackId, commentId) => {
  const db = getFirestore(getApps()[0]);
  const updateRef = doc(db, "track", trackId, "comments", commentId);

  try {
    await updateDoc(updateRef, {
      likes: increment(1),
    });
  } catch (e) {
    console.log(e);
  }
};
