import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

const Form = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(null);
  const [currentCity, setCurrentCity] = useState("");
  const [datePickerShow, setDatePickerShow] = useState(false);
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!firstName) {
      newErrors.firstName = "First name cannot be empty";
      valid = false;
    }
    if (!email) {
      newErrors.email = "Email cannot be empty";
      valid = false;
    }
    if (!dob) {
      newErrors.dob = "Date of birth cannot be empty";
      valid = false;
    }
    if (!currentCity) {
      newErrors.currentCity = "City cannot be empty";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid || gender==="") {
      setFormError(
        "It seems some details are missing from your profile. To connect you with others, we require the information they consider essential in a match."
      );
    } else {
      setFormError("");
    }
    return valid && gender!=="";
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch(
          "http://192.168.1.4:5000/api/user/createuser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName,
              email,
              dateOfBirth: dob,
              gender,
              cityOfResidence: currentCity,
            }),
          }
        );
        const jsonData = await response.json();
        console.log(jsonData);
        if (jsonData.success === true) {
          navigation.navigate("Welcome");
        } else {
          throw new Error(
            jsonData.error || "There was an error while submitting form"
          );
        }
      } catch (error) {
        // console.error("Failed:", error);
        Alert.alert("Oh No:(", error.message);
      }
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setDatePickerShow(Platform.OS === "ios");
    if (selectedDate) {
      setDob(selectedDate);
      setErrors((prevErrors) => ({ ...prevErrors, dob: null }));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrow} onPress={handleSubmit}>
        <Ionicons name="arrow-forward" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.label}>FIRST NAME</Text>
      <TextInput
        style={[styles.input, errors.firstName ? styles.errorInput : null]}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        onBlur={() => setErrors((prev) => ({ ...prev, firstName: null }))}
      />
      {errors.firstName && (
        <Text style={styles.errorText}>{errors.firstName}</Text>
      )}

      <Text style={styles.label}>
        EMAIL (We will use it to recover your password)
      </Text>
      <TextInput
        style={[styles.input, errors.email ? styles.errorInput : null]}
        placeholder="Enter your email address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        onBlur={() => setErrors((prev) => ({ ...prev, email: null }))}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={styles.label}>DATE OF BIRTH</Text>
      <TouchableOpacity
        style={[
          styles.input,
          styles.datePicker,
          errors.dob ? styles.errorInput : null,
        ]}
        onPress={() => setDatePickerShow(true)}
      >
        <Text style={styles.dateText}>
          {dob ? dob.toLocaleDateString() : "Select a date"}
        </Text>
      </TouchableOpacity>
      {datePickerShow && (
        <DateTimePicker
          value={dob || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
      {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

      <Text
        style={[styles.label, gender==="" && formError!=="" ? { color: "red" } : {}]}
      >
        GENDER
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonStyle}
          title="Male"
          onPress={() => {
            setGender(true);
            setErrors((prev) => ({ ...prev, gender: null }));
          }}
          color={gender === true ? "blue" : "#ccc"}
        />
        <Button
          title="Female"
          style={styles.buttonStyle}
          onPress={() => {
            setGender(false);
            setErrors((prev) => ({ ...prev, gender: null }));
          }}
          color={gender === false ? "red" : "#ccc"}
        />
      </View>

      <Text style={styles.label}>WHERE DO YOU LIVE</Text>
      <TextInput
        style={[styles.input, errors.currentCity ? styles.errorInput : null]}
        placeholder="Enter your home city"
        value={currentCity}
        onChangeText={(text) => setCurrentCity(text)}
        onBlur={() => setErrors((prev) => ({ ...prev, currentCity: null }))}
      />
      {errors.currentCity && (
        <Text style={styles.errorText}>{errors.currentCity}</Text>
      )}

      {formError && <Text style={styles.formErrorText}>{formError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80, // Increased top spacing
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  errorInput: {
    borderBottomColor: "red",
  },
  datePicker: {
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 12,
  },
  dateText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
    height: 44, // Increased button height for better touch area
  },
  arrow: {
    position: "absolute",
    top: 40, // Adequate space from the top of the screen
    right: 20, // Adequate space from the right edge
  },
  label: {
    fontSize: 14,
    fontWeight: "bold", // Bold label text
    color: "black",
    marginBottom: 5,
  },
  errorText: {
    fontSize: 12, // Smaller font size for error text
    color: "red",
    marginBottom: 5,
  },
  formErrorText: {
    fontSize: 14,
    color: "red",
    marginTop: 10, // Added spacing for general error message
  },
  buttonStyle: {
    width: 350,
    margin: 0,
  },
});

export default Form;
