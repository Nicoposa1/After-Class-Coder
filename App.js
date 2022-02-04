import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, TextInput } from 'react-native';
// import { SearchBar } from 'react-native-elements';


const App = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredData(responseJson);
        setData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(data);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <Text style={styles.itemStyle}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <TextInput
          onChangeText={(text) => searchFilter(text)}
          placeholder="Type Here..."
          value={search}
          style={styles.searchInput}
        />
        {/* <SearchBar */}
        {/* //   onChangeText={(text) => searchFilter(text)}
        //   placeholder="Type Here..."
        //   value={search}
        //   style={styles.searchInput}
        //   round
        //   searchIcon={{ size: 24 }}
        //   onClear={(text) => searchFilter('')}
        // /> */}
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
  },
  itemStyle: {
    padding: 10,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 15,
    margin: 5,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    borderColor: '#0f0f0f',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
});

export default App;
