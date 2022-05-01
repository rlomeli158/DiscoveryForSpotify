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
let replyListenerInstance = null;

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

export const getReplies = async (trackId, commentId, setReplyList) => {
  const db = getFirestore(getApps()[0]);
  try {
    const commentsQuery = query(
      collection(db, "track", trackId, "comments", commentId, "replies"),
      orderBy("countOfLikes", "desc")
    );

    replyListenerInstance = onSnapshot(commentsQuery, (comments) => {
      const cleanedReplies = comments.docs.map((value) => {
        const id = value.id;
        const data = value.data();
        return { id, ...data };
      });

      setReplyList(cleanedReplies);
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

export const clearReplyListener = () => {
  if (replyListenerInstance != null) {
    replyListenerInstance();
    replyListenerInstance = null;
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

export const replyToComment = async (userId, trackId, commentId, reply) => {
  const db = getFirestore(getApps()[0]);

  try {
    await addDoc(
      collection(db, "track", trackId, "comments", commentId, "replies"),
      {
        creator: userId,
        comment: reply,
        timestamp: Timestamp.now(),
        countOfLikes: 0,
      }
    );
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

export const likeReply = async (
  trackId,
  originalCommentId,
  replyId,
  userId
) => {
  const db = getFirestore(getApps()[0]);
  const updateRef = doc(
    db,
    "track",
    trackId,
    "comments",
    originalCommentId,
    "replies",
    replyId
  );

  try {
    await updateDoc(updateRef, {
      countOfLikes: increment(1),
    });

    await addDoc(
      collection(
        db,
        "track",
        trackId,
        "comments",
        originalCommentId,
        "replies",
        replyId,
        "likers"
      ),
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

export const unlikeReply = async (
  trackId,
  originalCommentId,
  replyId,
  likeId
) => {
  const db = getFirestore(getApps()[0]);
  const updateRef = doc(
    db,
    "track",
    trackId,
    "comments",
    originalCommentId,
    "replies",
    replyId
  );

  try {
    await updateDoc(updateRef, {
      countOfLikes: increment(-1),
    });

    await deleteDoc(
      doc(
        db,
        "track",
        trackId,
        "comments",
        originalCommentId,
        "replies",
        replyId,
        "likers",
        likeId
      )
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

export const checkReplyLikeStatus = async (
  trackId,
  originalCommentId,
  replyId,
  userId
) => {
  const db = getFirestore(getApps()[0]);

  try {
    let found = false;
    const allLikers = await getDocs(
      collection(
        db,
        "track",
        trackId,
        "comments",
        originalCommentId,
        "replies",
        replyId,
        "likers"
      )
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

export const deleteComment = async (trackId, commentId) => {
  const db = getFirestore(getApps()[0]);
  const deleteRef = doc(db, "track", trackId, "comments", commentId);
  try {
    await deleteDoc(deleteRef);
  } catch (e) {
    console.log(e);
  }
};

export const deleteReply = async (trackId, originalCommentId, replyId) => {
  const db = getFirestore(getApps()[0]);
  const deleteRef = doc(
    db,
    "track",
    trackId,
    "comments",
    originalCommentId,
    "replies",
    replyId
  );

  try {
    await deleteDoc(deleteRef);
  } catch (e) {
    console.log(e);
  }
};
