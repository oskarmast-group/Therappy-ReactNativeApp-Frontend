import React from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { PRIMARY_GREEN } from "../../resources/constants/colors";
import { formatMoney } from "../../utils/text";

const AppointmentCost: React.FC<{ loading: boolean; pricing?: any }> = ({
  loading,
  pricing,
}) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Costo</Text>
      {loading && <ActivityIndicator color={PRIMARY_GREEN} size="small" />}
      {!loading &&
        pricing?.parts &&
        Array.isArray(pricing.parts) &&
        pricing.parts.map((part, i) => (
          <Text key={i} style={styles.body}>
            {part.name}: {formatMoney(part.amount)}
          </Text>
        ))}
      {!loading && typeof pricing?.total === "number" && (
        <Text style={[styles.body, styles.total]}>
          Total: {formatMoney(pricing.total)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
    marginBottom: 4,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 4,
    marginBottom: 4,
  },
  total: {
    fontWeight: "700",
  },
});

export default AppointmentCost;
