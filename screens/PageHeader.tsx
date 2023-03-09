import * as React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Searchbar, Avatar} from 'react-native-paper';

export default function MerchantHeader() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);
  return (
    <View style={styles.row}>
      {/* Banner */}
      <ImageBackground
        source={require('../assets/banner.png')}
        style={styles.banner}
        resizeMode="cover">
        <Searchbar
          style={styles.search}
          placeholder="Today's Agenda..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          inputStyle={styles.searchInput}
        />
        <Avatar.Icon size={40} icon="menu" theme={icons} />
      </ImageBackground>
    </View>
    //2 rows, 5 columns
  );
}

export function PartnerHeader() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);
  return (
    <View style={styles.row}>
      {/* Banner */}
      <View style={styles.banner}>
        <Searchbar
          style={styles.search}
          placeholder="Today's Agenda..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          inputStyle={styles.searchInput}
        />
        <Avatar.Icon size={40} icon="menu" theme={icons} />
      </View>
    </View>
    //2 rows, 5 columns
  );
}
const icons = {
  roundness: 40,
  colors: {
    primary: '#ffffff',
    accent: '#f1c40f',
  },
};

const styles = StyleSheet.create({
  banner: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#0ec167',
  },
  search: {
    width: 300,
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 12,
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: -10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  searchInput: {
    height: 40,
    margin: 0,
    padding: 0,
    paddingBottom: 4,
  },
});
