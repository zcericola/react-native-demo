import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Note from './Note';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      noteArray: [],
      noteText: ''
    };
  }

  addNote = () => {
    let { noteArray, noteText } = this.state;
    let date = new Date();
    if (noteText && noteArray) {
      let noteArrayCopy = noteArray.slice();

      noteArrayCopy.push({
        'date': `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
        'text': noteText
      });
      this.setState({ noteArray: noteArrayCopy, noteText: '' });
    }
  };

  deleteNote = (index) => {
    let { noteArray, noteText } = this.state;
    let copy = noteArray.slice();
    copy.splice(index,1);

    this.setState({
      noteArray: copy})

  }
  

  render() {
    //mapping over the array on state and returning the Note component with all of the prop values passed in
    let notes = this.state.noteArray.map((val, i) => {
      return (
        <Note
          key={i}
          keyval={i}
          val={val}
          deleteMethod={() => this.deleteNote(i)}
        />
      );
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>~ Notes ~</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>{notes}</ScrollView>
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            onChangeText={noteText => this.setState({ noteText })}
            value={this.state.noteText}
            placeholder="Type your note here..."
            placeholderTextColor="white"
          />
        </View>
        <TouchableOpacity onPress={this.addNote} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//This is where your CSS styles are
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#3D9970',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd'
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
    marginTop: 20
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed'
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#3D9970',
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 36
  }
});
