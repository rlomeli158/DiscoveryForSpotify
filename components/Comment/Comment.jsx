import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Dimensions,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import {
  clearCommentListener,
  getComments,
  putComment,
} from "../../client/firestoreApi";
import CustomColors from "../../constants/Colors";
import styles from "../../constants/styles";
import { Text } from "../Themed";
import CommentItem from "./CommentItem";

const { width: screenWidth } = Dimensions.get("window");

const Comment = () => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const currentUser = useSelector((state) => state.currentUser.user);
  const trackToCommentOn = useSelector((state) => state.commentsTray.data);

  useEffect(() => {
    getComments(trackToCommentOn.id, setCommentList);
    return () => clearCommentListener();
  }, []);

  const renderItem = ({ item }) => {
    return <CommentItem item={item} track={trackToCommentOn} />;
  };

  return (
    <KeyboardAvoidingView
      style={styles.commentContainer}
      behavior="padding"
      keyboardVerticalOffset={screenWidth / 1.4}
    >
      <FlatList
        data={commentList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.commentAreaContainer}>
        <Image
          style={styles.commentProfilePic}
          source={{ uri: currentUser.images[0].url }}
        />
        <TextInput
          onChangeText={(newText) => {
            setComment(newText);
          }}
          value={comment}
          style={styles.commentInput}
        />
        <Pressable
          onPress={async () => {
            await putComment(currentUser.id, trackToCommentOn.id, comment);
            setComment("");
          }}
        >
          <Ionicons
            name="arrow-up-circle"
            size={34}
            color={CustomColors.dark.primaryColor}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Comment;
