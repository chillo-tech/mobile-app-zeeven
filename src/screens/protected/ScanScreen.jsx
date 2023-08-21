import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { colors } from '../../utils';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Entypo } from '@expo/vector-icons'; 

function ScanScreen({route, navigation}) {
  console.log('====================================');
  console.log({route});
  console.log('====================================');
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setModalVisible(!modalVisible);
    setScanned(false);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
        {modalVisible ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : (
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
    borderWidth: 3,
    borderColor: colors.error,
  },
  actionsContainer: {
    flex: 1,
    borderWidth: 3,
    borderColor: colors.success,
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
    color: colors.white,
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
