import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

export type LoginNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export type HomeNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;
