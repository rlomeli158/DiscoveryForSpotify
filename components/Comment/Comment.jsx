import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
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
  replyToComment,
} from "../../client/firestoreApi";
import CustomColors from "../../constants/Colors";
import styles from "../../constants/styles";
import { Text } from "../Themed";
import CommentItem from "./CommentItem";

const { width: screenWidth } = Dimensions.get("window");

const Comment = () => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [inputPlaceholder, setInputPlaceholder] = useState("Add a comment...");
  const [commentReplyingTo, setCommentReplyingTo] = useState();
  const currentUser = useSelector((state) => state.currentUser.user);
  const trackToCommentOn = useSelector((state) => state.commentsTray.data);
  let textInputRef = useRef();

  useEffect(() => {
    getComments(trackToCommentOn.id, setCommentList);
    return () => clearCommentListener();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <CommentItem
        item={item}
        track={trackToCommentOn}
        textInputRef={textInputRef}
        setPlaceholder={setInputPlaceholder}
        setCommentReplyingTo={setCommentReplyingTo}
      />
    );
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
          ref={textInputRef}
          placeholder={inputPlaceholder}
          placeholderTextColor={CustomColors.dark.background}
          onBlur={() => {
            setInputPlaceholder("Add a comment...");
          }}
        />
        <Pressable
          onPress={async () => {
            if (inputPlaceholder.includes("Reply") && comment != "") {
              await replyToComment(
                currentUser.id,
                trackToCommentOn.id,
                commentReplyingTo,
                comment
              );
            } else if (comment != "") {
              await putComment(currentUser.id, trackToCommentOn.id, comment);
            }
            setComment("");
            textInputRef.current.blur();
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
