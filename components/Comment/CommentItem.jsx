import { useEffect, useState } from "react";
import { Image, View, Text, Pressable } from "react-native";
import { callGetUserInfo } from "../../client/spotifyClient";
import styles from "../../constants/styles";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import {
  checkLikeStatus,
  likeComment,
  unlikeComment,
} from "../../client/firestoreApi";

const defaultImage =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const CommentItem = ({ item, track }) => {
  const token = useSelector((state) => state.token.value);
  const [likeId, setLikeId] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(async () => {
    setUser(await callGetUserInfo(item.creator, token));
  }, []);

  useEffect(async () => {
    const likedStatus = await checkLikeStatus(track.id, item.id, user.id);
    setLikeId(likedStatus);
  }, [user]);

  return (
    <View style={styles.individualCommentContainer}>
      <Image
        style={styles.commentProfilePic}
        source={{ uri: user ? user.images[0].url : defaultImage }}
      />
      <View style={styles.commentTextContainer}>
        <View>
          <Text style={styles.commentDisplayName}>{user.display_name}</Text>
          <Text style={styles.comment}>{item.comment}</Text>
        </View>
        <View>
          {likeId != false ? (
            <Pressable
              onPress={async () => {
                await unlikeComment(track.id, item.id, likeId);
                setLikeId(false);
              }}
              // style={{
              //   // backgroundColor: "#F28",
              //   height: "100%",
              //   width: "100%",
              //   justifyContent: "center",
              // }}
            >
              <FontAwesome name="heart" size={15} color="black" />
            </Pressable>
          ) : (
            <Pressable
              onPress={async () => {
                await likeComment(track.id, item.id, user.id);
                setLikeId(await checkLikeStatus(track.id, item.id, user.id));
              }}
              // style={{
              //   // backgroundColor: "#F28",
              //   height: "100%",
              //   width: "100%",
              //   justifyContent: "center",
              // }}
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
  );
};

export default CommentItem;
