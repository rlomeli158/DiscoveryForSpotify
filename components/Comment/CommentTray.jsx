import React, { useEffect, useCallback, useRef } from "react";
import { View, Text } from "../Themed";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { closeTray } from "../../redux/features/commentsTray";
import Comment from "./Comment";

const CommentTray = () => {
  const commentTrayState = useSelector((state) => state.commentsTray.open);
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (commentTrayState && bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  }, [commentTrayState]);

  const renderContent = () => {
    return <Comment />;
  };

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["70%"]}
      index={commentTrayState ? 0 : -1}
      handleHeight={40}
      enablePanDownToClose
      onClose={() => {
        dispatch(closeTray());
      }}
      backdropComponent={renderBackdrop}
    >
      {commentTrayState ? renderContent() : null}
    </BottomSheet>
  );
};

export default CommentTray;
