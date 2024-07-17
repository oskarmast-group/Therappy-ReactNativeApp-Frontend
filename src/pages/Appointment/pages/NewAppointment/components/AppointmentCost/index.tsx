import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {PRIMARY_GREEN} from '../../../../../../resources/constants/colors';
import {formatMoney} from '../../../../../../utils/text';
import {Pricing} from '../../../../../../interfaces/Reservations';
import {BaseText} from '../../../../../../components/Text';

const AppointmentCost: React.FC<{loading: boolean; pricing?: Pricing}> = ({
  loading,
  pricing,
}) => {
  return (
    <View>
      <BaseText fontSize={18} weight={800} marginTop={10} marginBottom={4}>
        Costo
      </BaseText>
      {loading && <ActivityIndicator color={PRIMARY_GREEN} size="small" />}
      {!loading &&
        pricing?.parts &&
        Array.isArray(pricing.parts) &&
        pricing.parts.map((part, i) => (
          <BaseText key={i}>
            {part.name}: {formatMoney(part.amount)}
          </BaseText>
        ))}
      {!loading && typeof pricing?.total === 'number' && (
        <BaseText weight={700}>Total: {formatMoney(pricing.total)}</BaseText>
      )}
    </View>
  );
};

export default AppointmentCost;
