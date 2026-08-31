import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    width: '100vh',
    height: '100vh'
  },
  section: {
    margin: 10,
    padding: 10,
   
  }
});

// Create Document Component
const MyDocument = () => (
  <Document style={{ position: 'absolute'}}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);


export default MyDocument;