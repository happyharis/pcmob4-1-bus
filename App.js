import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

  function loadBusStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData.services);
        const myBus = responseData.services.filter(
          (service) => service.no === "155"
        )[0];
        console.log(myBus.next.time);
        setArrival(myBus.next.time);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadBusStopData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Arrival Time: </Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator color="blue" /> : arrival}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => setLoading(true)}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#f0f",
    padding: 20,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
  },
});
