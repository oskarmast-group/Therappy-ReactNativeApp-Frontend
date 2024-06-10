import { StyleSheet, View, Image, ImageProps } from "react-native";
import { DARKER_TEXT, GREEN } from "../../constant/colors";

export interface ImageContainerProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  children?: any;
}

// export interface ImageProps2 extends ImageProps {
//   width?: number;
//   height?: number;
// }

const ImageContainer: React.FC<ImageContainerProps> = ({
  width,
  height,
  borderRadius,
  children,
}) => {
  return (
    <View
      style={[
        styles.imageContainer,
        {
          width: width ?? 66,
          height: height ?? 66,
          borderRadius: borderRadius ?? 12,
        },
      ]}
    >
      {children}
    </View>
  );
};

const ImageComponent: React.FC<ImageProps> = ({ width, height, ...props }) => {
  return (
    <Image
      style={[styles.image, { width: width ?? 66, height: height ?? 66 }]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    overflow: "hidden",
  },
  image: {
    width: 66,
    height: 66,
  },
  container: {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  containerBorder: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: GREEN,
    borderRadius: 20,
    padding: 10,
  },
  linkChildrenContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    color: DARKER_TEXT,
    width: "100%",
  },
  informationContainer: {
    flex: 1,
    minHeight: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export { ImageContainer, ImageComponent };
export default styles;
