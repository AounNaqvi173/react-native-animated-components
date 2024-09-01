import React, {useRef} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {typography} from '@utils/typography';
import PieChart from '@components/charts/PieChart';
import LineChart from '@components/charts/LineChart';

type ChartRef = {
  animate: (forward?: boolean) => void;
};

const MyButton = ({title, onPress}: {title: string; onPress: () => void}) => {
  return (
    <Pressable onPress={onPress} style={styles.btnContainer}>
      <Text style={styles.btnLabel}>{title}</Text>
    </Pressable>
  );
};

const LineChartScreen = () => {
  const lineChartRef = useRef<ChartRef>(null);
  const pieChartRef = useRef<ChartRef>(null);
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 8 : 24;
  const paddingBottom = insets.bottom > 0 ? insets.bottom + 8 : 24;

  const onAnimate = (forward = true) => {
    if (forward) {
      lineChartRef.current?.animate();
      pieChartRef.current?.animate();
    } else {
      lineChartRef.current?.animate(false);
      pieChartRef.current?.animate(false);
    }
  };

  return (
    <View style={[styles.container, {paddingTop, paddingBottom}]}>
      <View style={styles.chartsContainer}>
        <LineChart ref={lineChartRef} />
        <PieChart ref={pieChartRef} />
      </View>

      <View style={styles.btnsContainer}>
        <MyButton title="Animate" onPress={onAnimate} />
        <MyButton title="Animate Back" onPress={() => onAnimate(false)} />
      </View>
    </View>
  );
};

export default LineChartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#eeeee2',
    justifyContent: 'space-between',
  },
  chartsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  btnsContainer: {
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    marginTop: 16,
  },
  btnContainer: {
    backgroundColor: '#556d36',
    height: 52,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    minWidth: 140,
  },
  btnLabel: {
    color: 'white',
    lineHeight: 22,
    fontFamily: typography.semiBold,
  },
});
