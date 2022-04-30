import { getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  Timestamp,
  orderBy,
  query,
  getDoc,
  onSnapshot,
  updateDoc,
  increment,
  decrement,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

let commentListenerInstance = null;

export const getComments = async (trackId, setCommentList) => {
  const db = getFirestore(getApps()[0]);
  try {
    const commentsQuery = query(
      collection(db, "track", trackId, "comments"),
      orderBy("countOfLikes", "desc")
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
      countOfLikes: 0,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const likeComment = async (trackId, commentId, userId) => {
  const db = getFirestore(getApps()[0]);
  const updateRef = doc(db, "track", trackId, "comments", commentId);

  try {
    await updateDoc(updateRef, {
      countOfLikes: increment(1),
    });

    await addDoc(
      collection(db, "track", trackId, "comments", commentId, "likers"),
      {
        liker: userId,
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const unlikeComment = async (trackId, commentId, likeId) => {
  const db = getFirestore(getApps()[0]);
  const updateRef = doc(db, "track", trackId, "comments", commentId);

  try {
    await updateDoc(updateRef, {
      countOfLikes: increment(-1),
    });

    await deleteDoc(
      doc(db, "track", trackId, "comments", commentId, "likers", likeId)
    );
  } catch (e) {
    console.log(e.message);
  }
};

export const checkLikeStatus = async (trackId, commentId, userId) => {
  const db = getFirestore(getApps()[0]);

  try {
    let found = false;
    const allLikers = await getDocs(
      collection(db, "track", trackId, "comments", commentId, "likers")
    );

    allLikers.forEach((doc) => {
      if (doc.data()["liker"] === userId) {
        found = doc.id;
      }
    });

    return found;
  } catch (err) {
    console.log(err.message);
  }
};
