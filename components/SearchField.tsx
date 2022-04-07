import { StyleSheet } from "react-native";
import { Text, View } from '../components/Themed';
// import { View } from './Themed';
// import { Text } from 'react-native';

export default function SearchField({ path }: { path: string }) {
  return (
    <View>
      <Text style={styles.fieldName} >Artist</Text>
      <Text style={styles.fieldDescription} >Artist’s name . . .</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldName: {
    textAlign: "center",
    textAlignVertical: "top",
    fontSize: 24,
    fontFamily: "Helvetica",
    letterSpacing: -0.40799999237060547,
    lineHeight: 22,
  },
  fieldDescription: {
    textAlign: "left",
    textAlignVertical: "top",
    fontSize: 14,
    fontFamily: "Helvetica",
    letterSpacing: -0.40799999237060547,
    lineHeight: 22,
    color: "#b4b4b4",
  },
});