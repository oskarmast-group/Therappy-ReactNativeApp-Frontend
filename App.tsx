import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import Login from "./src/screen/Login";
import Home from "./src/screen/Home";
import Providers from "./Providers";
import { Navigate, Route, Routes } from "react-router-native";
import Register from "./src/screen/Register";
import Profile from "./src/screen/Profile";
import PrivateRoute from "./src/components/containers/PrivateRoute";
import Therapist from "./src/screen/Therapist";
import Appointment from "./src/screen/Appointment";
import Videocall from "./src/screen/VideoCall";
import Logout from "./src/screen/Logout";
import Timetable from "./src/screen/Timetable";
import Payments from "./src/screen/Payments";
import PasswordRecovery from "./src/screen/PasswordRecovery";
import RegisterTherapist from "./src/screen/RegisterTherapist";

export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Providers>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/home/*" element={<PrivateRoute component={Home} />} />
          <Route path="/recuperar" element={<PasswordRecovery />} />
          <Route path="/registro-terapeutas" element={<RegisterTherapist />} />
          <Route
            path="/perfil/*"
            element={<PrivateRoute component={Profile} />}
          />
          <Route
            path="/terapeutas/*"
            element={<PrivateRoute component={Therapist} />}
          />
          <Route
            path="/pagos"
            element={<PrivateRoute component={Payments} />}
          />
          <Route
            path="/appointment/*"
            element={<PrivateRoute component={Appointment} />}
          />
          <Route
            path="/videollamada/*"
            element={<PrivateRoute component={Videocall} />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/horario"
            element={<PrivateRoute component={Timetable} />}
          />
        </Routes>
      </Providers>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
