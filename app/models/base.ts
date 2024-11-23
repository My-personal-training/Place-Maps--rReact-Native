export interface Customizable {
  style?: object;
}

// To avoid the export default warning, we can use the following code:
// This code does't do anything, but it will prevent the warning.
const BaseDefault = {};
export default BaseDefault;
