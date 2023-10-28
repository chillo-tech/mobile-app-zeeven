import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { colors } from '../../utils';
import { Camera, FlashMode } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';

function ScanScreen({route, navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions().then(() => console.log('granted'));

    // Should launch scan ?
    if (route.params) {
      try {
        const {launchScan = false} = route.params
        setModalVisible(!launchScan)
      } catch (e) {
        console.warn(e)
      }
    }

  }, [route.params]);

  const handleBarCodeScanned = ({ type, data }) => {
    setModalVisible(!modalVisible);
    setScanned(false);
    navigation.navigate({
      name: 'scan-ticket-response',
      params: {type, data}
    })
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleCancel = () => {
    setFlashMode(FlashMode.off);
    setModalVisible(false);
    navigation.pop();
  }

  const handleFlash = () => {
    if(flashMode === FlashMode.off){
      setFlashMode(FlashMode.torch);
    } else {
      setFlashMode(FlashMode.off);
    }
  }

  return (
      <>
        <SafeAreaView style={styles.container}>
          {modalVisible ? null : (
              <>
                <Camera
                    barCodeScannerSettings={{
                      barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                    }}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.fill}
                    flashMode={flashMode}
                >
                  <View style={styles.actionsContainer}>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.description}>Scannez un QR Code ZEEVEN</Text>
                    </View>
                    <View style={styles.scanArea}/>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.button} onPress={handleFlash}>
                        <Entypo name="flashlight" size={60} color={colors.white} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={handleCancel}>
                        <Entypo name="circle-with-cross" size={60} color={colors.white} />
                      </TouchableOpacity>
                    </View>
                  </View>

                </Camera>
                {scanned && <Button title={'Nouveau SCAN'} onPress={() => setScanned(false)} />}
              </>
          )}
        </SafeAreaView>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.white,
    // borderWidth: 3,
    //borderColor: colors.error,
  },
  actionsContainer: {
    flex: 1,
    // borderWidth: 3,
    // borderColor: colors.success,
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 60
  },
  button: {

  },
  description: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900'
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
  fill: {
    flex: 1
  },
  scanArea: {
    borderWidth: 3,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 150,
    borderColor: colors.white
  }
});

export default ScanScreen;
