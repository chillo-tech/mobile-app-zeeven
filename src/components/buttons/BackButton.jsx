import React, { useContext } from 'react';
import { StackActions } from '@react-navigation/native';
import IconButton from './IconButton';
import { ApplicationContext } from '../../context/ApplicationContextProvider';
import { colors } from '../../utils/styles';

function BackButton({ navigation, icon = 'arrowleft', color = colors.primary }) {
  const { resetAd } = useContext(ApplicationContext);
  const goBack = () => {
    resetAd();
    const popAction = StackActions.pop(1);
    navigation.dispatch(popAction);
  };
  return <IconButton icon={icon} color={color} onclick={goBack} />;
}

export default BackButton;
