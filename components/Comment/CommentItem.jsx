import { useEffect, useState } from "react";
import { Image, View, Text, Pressable, FlatList, Linking } from "react-native";
import { callGetUserInfo } from "../../client/spotifyClient";
import styles from "../../constants/styles";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import {
  checkLikeStatus,
  likeComment,
  unlikeComment,
  getReplies,
  clearReplyListener,
  likeReply,
  checkReplyLikeStatus,
  unlikeReply,
  deleteReply,
  deleteComment,
} from "../../client/firestoreApi";
import { AntDesign } from "@expo/vector-icons";
import CustomColors from "../../constants/Colors";

const defaultImage =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const CommentItem = ({
  item,
  track,
  textInputRef,
  setPlaceholder,
  setCommentReplyingTo,
  isReply = false,
  originalComment = null,
}) => {
  const token = useSelector((state) => state.token.value);
  const currentUser = useSelector((state) => state.currentUser.user);

  const [likeId, setLikeId] = useState(false);
  const [replyList, setReplyList] = useState([]);
  const [user, setUser] = useState(false);
  const currentCommentId = item.id;

  const [showReplies, setShowReplies] = useState(false);

  useEffect(async () => {
    setUser(await callGetUserInfo(item.creator, token));
  }, []);

  useEffect(() => {
    getReplies(track.id, item.id, setReplyList);
    return () => clearReplyListener();
  }, []);

  useEffect(async () => {
    if (isReply) {
      setLikeId(
        await checkReplyLikeStatus(
          track.id,
          originalComment,
          item.id,
          currentUser.id
        )
      );
    } else {
      const likedStatus = await checkLikeStatus(
        track.id,
        item.id,
        currentUser.id
      );
      setLikeId(likedStatus);
    }
  }, [currentUser]);

  const renderItem = ({ item }) => {
    const newItem = item;
    return (
      <CommentItem
        item={newItem}
        track={track}
        textInputRef={textInputRef}
        setPlaceholder={setPlaceholder}
        setCommentReplyingTo={setCommentReplyingTo}
        isReply={true}
        originalComment={currentCommentId}
      />
    );
  };

  return (
    <>
      <View
        style={
          isReply
            ? styles.individualReplyContainer
            : styles.individualCommentContainer
        }
      >
        <Pressable
          onPress={() => {
            Linking.openURL(user.external_urls.spotify);
          }}
        >
          <Image
            style={isReply ? styles.replyProfilePic : styles.commentProfilePic}
            source={{ uri: user ? user.images[0].url : defaultImage }}
          />
        </Pressable>
        <View style={styles.commentTextContainer}>
          <View>
            <Text style={styles.commentDisplayName}>{user.display_name}</Text>
            <Text style={styles.comment}>{item.comment}</Text>
            <View style={{ flexDirection: "row" }}>
              {isReply ? null : (
                <Pressable
                  onPress={() => {
                    textInputRef.current.focus();
                    setPlaceholder(`Reply to ${user.display_name}...`);
                    setCommentReplyingTo(item.id);
                  }}
                >
                  <Text style={styles.replyText}>Reply</Text>
                </Pressable>
              )}
              {item.creator == currentUser.id ? (
                <Pressable
                  onPress={async () => {
                    if (isReply) {
                      await deleteReply(track.id, originalComment, item.id);
                    } else {
                      await deleteComment(track.id, item.id);
                    }
                  }}
                  style={isReply ? null : { paddingLeft: 5 }}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
          <View>
            {likeId != false ? (
              <Pressable
                onPress={async () => {
                  if (isReply) {
                    await unlikeReply(
                      track.id,
                      originalComment,
                      item.id,
                      likeId
                    );
                    setLikeId(
                      await checkReplyLikeStatus(
                        track.id,
                        originalComment,
                        item.id,
                        currentUser.id
                      )
                    );
                  } else {
                    await unlikeComment(track.id, item.id, likeId);
                    setLikeId(false);
                  }
                }}
              >
                <FontAwesome name="heart" size={15} color="black" />
              </Pressable>
            ) : (
              <Pressable
                onPress={async () => {
                  if (isReply) {
                    await likeReply(
                      track.id,
                      originalComment,
                      item.id,
                      currentUser.id
                    );
                    setLikeId(
                      await checkReplyLikeStatus(
                        track.id,
                        originalComment,
                        item.id,
                        currentUser.id
                      )
                    );
                  } else {
                    await likeComment(track.id, item.id, currentUser.id);
                    setLikeId(
                      await checkLikeStatus(track.id, item.id, currentUser.id)
                    );
                  }
                }}
              >
                <FontAwesome name="heart-o" size={15} color="black" />
              </Pressable>
            )}

            <Text style={{ textAlign: "center", fontSize: 10 }}>
              {item.countOfLikes}
            </Text>
          </View>
        </View>
      </View>
      <View>
        {showReplies ? (
          <>
            <Pressable
              style={{ marginTop: -5, marginLeft: 50, flexDirection: "row" }}
              onPress={() => {
                setShowReplies(false);
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: CustomColors.dark.formBackground,
                  fontFamily: "PoppinsBold",
                }}
              >{`Hide ${replyList.length} replies...`}</Text>
              <AntDesign
                name="up"
                size={10}
                color={CustomColors.dark.formBackground}
              />
            </Pressable>
            <FlatList
              data={replyList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </>
        ) : replyList ? (
          replyList.length > 0 ? (
            <Pressable
              style={{ marginTop: -5, marginLeft: 50, flexDirection: "row" }}
              onPress={() => {
                setShowReplies(true);
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: CustomColors.dark.formBackground,
                  fontFamily: "PoppinsBold",
                }}
              >{`View ${replyList.length} replies...`}</Text>
              <AntDesign
                name="down"
                size={10}
                color={CustomColors.dark.formBackground}
              />
            </Pressable>
          ) : null
        ) : null}
      </View>
    </>
  );
};

export default CommentItem;
