import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View,TextInput,ScrollView } from 'react-native';


export default function App() {
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=8990f6bf"
  const [state,setState] = useState({
    s: "Enter a movie",
    results: [],
    selected: {}
  });

  const search = () => {
    axios(apiurl + "&s=" + state.s).then (({data}) => {
      let results = data.Search
      setState(prevState => {
        return {...prevState, results:results}
      })
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Database</Text>
      <TextInput
        style={styles.searchbox}
        value={state.s}
        onChangeText={text => setState(prevState => {
          return {...prevState, s:text}
        })}
        onSubmitEditing = {search}
      />
      <ScrollView style = { styles.results}>
        {state.results.map(result => (
          <View key={ result.imdbID} style={styles.results}>
            <Text style = { styles.heading}>{result.Tite}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  tite: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20

  },
  searchbox:{
    fontSize: 20,
    fontWeight:'300',
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 40
  },
  results:{
    flex:1,
    width: '100',
    marginBottom: 20
  },
  heading:{
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565'
  }

});
