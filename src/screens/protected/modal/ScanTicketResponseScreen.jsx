import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Text, StatusBar } from 'react-native';
import { colors } from '../../../utils';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import PrimaryOutlineButton from '../../../components/buttons/PrimaryOutlineButton';
import { CommonActions } from '@react-navigation/native';
import { ApplicationContext } from '../../../context/ApplicationContextProvider';
import { SecurityContext } from '../../../context/SecurityContextProvider';
const dataPattern = /^([0-9]+)\|([0-9]+)\|([0-9]+)$/;

const url = `/backend/event`;
const Divider = () => <View style={styles.divider} />;

function ScanTicketResponseScreen({ route: { params }, navigation }) {
  const { type, data } = params;
  const [isValid, setIsValid] = React.useState(dataPattern.test(data));

  const [ticketInformations, setTicketInformations] = React.useState({});
  const { protectedAxios } = useContext(SecurityContext);
  const {
    updateEvent,
    state: { event },
  } = useContext(ApplicationContext);

  const goTo = (routeName) => {
    return () => {
      navigation.dispatch(
        CommonActions.navigate({
          name: routeName,
          params: {
            launchScan: true,
          },
          merge: true,
        })
      );
    };
  };
  const saveScan = async (eventPublicId, scan) => {
    try {
      await protectedAxios.post(`${url}/${eventPublicId}/scan`, scan);
      //setIsloading(false);
      //setRefreshing(false);
    } catch (e) {
     // setIsloading(false);
     console.log(e)
    }
  };
  const addToScans = (scan) => {
    const { scans = [] } = event;
    const { eventPublicId, guestPublicId } = scan;
    const scanIndex = scans.findIndex((entry) => {
      const { guestPublicId: scannedGuestPublicId, eventPublicId: scannedEventPublicId } = entry;
      return scannedEventPublicId === eventPublicId && scannedGuestPublicId === guestPublicId;
    });
    const isNotScanned = scanIndex === -1;
    if (isNotScanned) {
      const date = new Date(new Date().setSeconds(30));
      const updatedScan = { ...scan, date };
      scans.push(updatedScan);
      event.scans = scans;
      updateEvent(event);
      saveScan(eventPublicId, updatedScan);
    }
  };
  React.useEffect(() => {
    let isTicketValid = dataPattern.test(data);
    const [guestEventPublicId, guestInvitationPublicId, guestPublicId] = data.split('|');

    if (!event.plan){
      event.plan = {
        plan: {
          contacts: {}
        }
      }
    }

    if (!event.publicId){
      event.publicId = eventPublicId
    }

    if (!event.invitation){
      event.invitation = {
        publicId: event.publicId
      }
    }

    const {
      scans = [],
      plan: { contacts = {} },
      publicId: eventPublicId,
      invitation: { publicId: invitationPublicId },
    } = event;

    const scanIndex = scans.findIndex(
      (entry) => entry.eventPublicId === guestEventPublicId && entry.guestPublicId === guestPublicId
    );
    const isNotScanned = scanIndex === -1;

    const contactsId = Object.keys(contacts);

    isTicketValid = isNotScanned && contactsId.includes(guestPublicId);
    isTicketValid = isTicketValid && eventPublicId === guestEventPublicId;
    isTicketValid = isTicketValid && invitationPublicId === guestInvitationPublicId;

    setIsValid(() => isTicketValid);
  }, []);

  React.useEffect(() => {
    try {
      if (isValid) {
        const [guestEventPublicId, guestInvitationPublicId, guestPublicId] = data.split('|');
        const { scans = [], plan } = event;
        const { tables = {}, contacts = {} } = plan;
        const currentGuest = ({} = contacts[guestPublicId]);
        const tableList = Object.values(tables);
        const filteredTables = tableList.filter(({ contactIds }) => {
          return contactIds.includes(guestPublicId);
        });

        if (filteredTables.length > 0) {
          const guestTable = filteredTables[0];
          const { name: guestTableName, publicId: tablePublicId } = guestTable;

          setTicketInformations((prevState) => ({
            ...prevState,
            tableName: guestTableName,
            ticketNumber: guestPublicId,
            event: guestEventPublicId,
            invitation: guestInvitationPublicId,
            guest: currentGuest,
          }));
          const scan = {
            eventPublicId: guestEventPublicId,
            invitationId: guestInvitationPublicId,
            guestPublicId,
            tablePublicId,
          };
          addToScans(scan);
        } else {
          setIsValid(false);
        }
      }
    } catch (e) {
      console.warn(e)
    }
  }, [data, isValid]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={[
          styles.container,
          isValid ? styles.validTicketContainer : styles.invalidTicketContainer,
        ]}
      >
        <View style={styles.cardContainer}>
          <Text style={[styles.title, isValid ? styles.validTitle : styles.invalidTitle]}>
            {isValid ? 'VALID' : 'INVALID'}
          </Text>
          <Divider />
          <View style={styles.cardContent}>
            {isValid ? (
              <>
                <View style={styles.ticketLine}>
                  <Text style={styles.label}>Numéro</Text>
                  <Text style={{ fontWeight: 'bold' }}>{ticketInformations.ticketNumber}</Text>
                </View>
                <View style={styles.titleWrapper}>
                  <Text style={styles.label}>Prénom Nom</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 26 }}>
                    {ticketInformations?.guest?.firstName} {ticketInformations?.guest?.lastName}
                  </Text>
                  {ticketInformations?.guest?.partner ? (
                    <Text style={styles?.title}>{ticketInformations?.guest?.partner}</Text>
                  ) : null}
                </View>
                {ticketInformations?.tableName?.toLowerCase() !== 'contacts' ? (
                  <View style={styles.ticketLine}>
                    <Text style={styles.label}>Position</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 36 }}>
                      {ticketInformations.tableName}
                    </Text>
                  </View>
                ) : null}
              </>
            ) : (
              <View style={{ gap: 5 }}>
                <Text
                  style={[
                    styles.label,
                    { textAlign: 'center', fontWeight: 'bold', marginBottom: 20 },
                  ]}
                >
                  Ticket invalide
                </Text>
                <Text style={[styles.label, { textAlign: 'center' }]}>
                  Soit il a déjà été scanné.
                </Text>
                <Text style={[styles.label, { textAlign: 'center' }]}>
                  Soit l'évènement a déjà expiré.
                </Text>
                <Text style={[styles.label, { textAlign: 'center' }]}>
                  Soit le QR Code du ticket n'appartient pas à un évènement Zeeven.
                </Text>
              </View>
            )}
          </View>
          <View style={styles.cardBottom}>
            <PrimaryOutlineButton onPress={goTo('scan-ticket')}>
              Scanner à nouveau
            </PrimaryOutlineButton>
            <PrimaryButton onPress={goTo('event-guests')}>Afficher la liste</PrimaryButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  titleWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validTicketContainer: {
    backgroundColor: colors.success,
  },
  invalidTicketContainer: {
    backgroundColor: colors.error,
  },
  cardContainer: {
    backgroundColor: colors.white,
    height: 450,
    width: 300,
    borderRadius: 5,
    elevation: 5,
  },
  cardContent: {
    padding: 15,
    gap: 10,
  },
  cardBottom: {
    flex: 1,
    gap: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  divider: {
    height: 2,
    width: '100%',
    borderBottomWidth: 2,
    borderStyle: 'dotted',
    borderBottomColor: colors.darkgray,
  },
  ticketLine: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 20,
  },
  label: {
    fontSize: 16,
    color: colors.darkgray,
  },
  textTitleContent: {
    width: '100%',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  validTitle: {
    color: colors.success,
  },
  invalidTitle: {
    color: colors.error,
  },
});

export default ScanTicketResponseScreen;
