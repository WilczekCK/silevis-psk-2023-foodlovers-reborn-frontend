import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';


// Register Font
Font.register({
  family: "Roboto",
  src:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    fontFamily: "Roboto"
  },
  attachmentInfo: {
    fontSize: "12px",
    fontWeight: "800"
  }
});

// Create Document Component
export default function MyDocument (props) { 
    return (
        <Document>
            <Page size="A4" style={styles.page}>
            <View style={styles.attachmentInfo}>
                <Text>
                    Załącznik nr 1 do Zarządzenia Nr 54/19
                </Text>
                <Text>
                    Rektora Politechniki Świętokrzyskiej z dnia 20 września 2019 r.
                </Text>
            </View>
            </Page>
        </Document>
    )
};