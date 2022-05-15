// This is the first file that ReactNative will run when it starts up.
import App from "./app/app.tsx"
import "react-native-get-random-values"
import { registerRootComponent } from "expo"

registerRootComponent(App)
export default App
