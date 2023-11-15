import { generate as generateColors } from "@ant-design/colors";
import { RefineThemes } from "@refinedev/antd";

const blackishBluePalette = generateColors("#1890ff"); // Replace '#1890ff' with the primary color of your choice

const { Blue, Purple, Magenta, Red, Orange, Yellow } = RefineThemes;

const colourTheme = {
  // Primary color
  "@primary-color": blackishBluePalette[5],

  // Text color
  "@text-color": "#333",

  // Background color
  "@background-color-light": blackishBluePalette[1],

  // Link color
  "@link-color": blackishBluePalette[6],

  // Border color
  "@border-color-base": blackishBluePalette[2],

  // Success color
  "@success-color": "#52c41a",

  // Error color
  "@error-color": "#f5222d",

  // Warning color
  "@warning-color": "#faad14",
};

const themeConfig = {
  // algorithm: [theme.compactAlgorithm],
  token: {
    fontSize: 16,
  },
  components: {
    Button: {
      borderRadius: 2,
      algorithm: true, // Enable algorithm
    },
    Input: {
      algorithm: true, // Enable algorithm
      focus: {
        borderColor: "black",
      },
    },
  },
  ...colourTheme,
  ...Blue,
};

export default themeConfig;
