import { useEffect, useState } from "react";
import { Image, View, Text, Pressable } from "react-native";
import { callGetUserInfo } from "../../client/spotifyClient";
import styles from "../../constants/styles";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { likeComment } from "../../client/firestoreApi";

const defaultImage =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const CommentItem = ({ item, track }) => {
  const token = useSelector((state) => state.token.value);
  const [user, setUser] = useState(false);

  useEffect(async () => {
    setUser(await callGetUserInfo(item.creator, token));
  }, []);

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
          <Pressable
            onPress={async () => {
              await likeComment(track.id, item.id);
            }}
          >
            <FontAwesome name="heart-o" size={15} color="black" />
            <Text style={{ textAlign: "center", fontSize: 10 }}>
              {item.likes}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
