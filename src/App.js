import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Clipboard,
  Alert,
  Text,
  StyleSheet,
  Image
} from "react-native";
import CryptoJS from "react-native-crypto-js";

export default function App() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  const encryptMessage = () => {
    const ciphertext = CryptoJS.AES.encrypt(message, key).toString();
    setEncryptedMessage(ciphertext);
  };

  const decryptMessage = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedMessage(plaintext);
    } catch (error) {
      setDecryptedMessage("");
      Alert.alert(
        "Error",
        "La contraseña es incorrecta. Por favor, intenta con otra clave.",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed")
          }
        ]
      );
    }
  };

  const copyToClipboard = (text) => {
    if (text === "") {
      Alert.alert("Error", "Por favor, cifra un mensaje primero.", [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed")
        }
      ]);
    } else {
      Clipboard.setString(text);
      Alert.alert(
        "Copiado al portapapeles",
        `Se ha copiado el texto "${text}" en el portapapeles.`
      );
    }
  };

  const clearAll = () => {
    setMessage("");
    setKey("");
    setEncryptedMessage("");
    setDecryptedMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("./logo.jpg")} style={styles.logo} />
        <View style={styles.lockAndName}>
          <Text style={styles.lockIcon}>{"\u{1F512}"}</Text>
          <Text style={styles.header}>CryptMsg</Text>
        </View>
      </View>
      <Text style={styles.instructions}>
        Introduce el mensaje y la clave para cifrar y descifrar
      </Text>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
          placeholder="Introduce el mensaje"
        />
        <TextInput
          style={styles.input}
          onChangeText={setKey}
          value={key}
          placeholder="Introduce la clave"
        />
        <Button
          title="Cifrar mensaje"
          onPress={encryptMessage}
          color="#2196F3"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEncryptedMessage}
          value={encryptedMessage}
          placeholder="Mensaje cifrado"
          editable={true}
        />
        <View style={styles.buttonRow}>
          <Button
            title="Copiar"
            onPress={() => copyToClipboard(encryptedMessage)}
            disabled={!encryptedMessage}
            color="#4CAF50"
          />
          <Button
            title="Descifrar mensaje"
            onPress={() => {
              if (key === "") {
                Alert.alert("Error", "Por favor, ingresa una contraseña.", [
                  {
                    text: "OK",
                    onPress: () => console.log("OK Pressed")
                  }
                ]);
              } else if (encryptedMessage === "") {
                Alert.alert("Error", "Por favor, cifra un mensaje primero.", [
                  {
                    text: "OK",
                    onPress: () => console.log("OK Pressed")
                  }
                ]);
              } else {
                decryptMessage();
              }
            }}
            color="#F44336"
          />
        </View>
        <TextInput
          style={styles.inputLarge}
          value={decryptedMessage}
          placeholder="Mensaje descifrado"
          editable={false}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
        <View style={styles.buttonRow}>
          <Button
            title="Copiar"
            onPress={() => copyToClipboard(decryptedMessage)}
            disabled={!decryptedMessage}
            color="#4CAF50"
          />
          <Button title="Limpiar todo" onPress={clearAll} color="#FF9800" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000"
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF"
  },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
    color: "#FFFFFF"
  },
  inputSection: {
    width: "90%", // Ancho del inputSection
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#000000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    color: "#000000", // Texto negro
    backgroundColor: "#FFFFFF",
    width: "100%", // Ancho del campo de entrada en porcentaje
    marginHorizontal: 0 // Margen horizontal en 0
  },
  inputLarge: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    color: "#000000", // Texto negro
    backgroundColor: "#FFFFFF",
    width: "100%", // Ancho del campo de entrada en porcentaje
    marginHorizontal: 0 // Margen horizontal en 0
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  lockAndName: {
    flexDirection: "row",
    alignItems: "center"
  },
  lockIcon: {
    fontSize: 30,
    marginRight: 10
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 10
  }
});
