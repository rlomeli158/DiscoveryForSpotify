import { Text, View } from "../components/Themed";
import { useSelector } from "react-redux";

export default function TabTwoScreen() {
  const token = useSelector((state) => state.token.value);
  return (
    <View>
      <Text>{token}</Text>
    </View>
  );
}
