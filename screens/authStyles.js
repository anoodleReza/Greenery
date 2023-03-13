import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Subheading: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'black',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  segmentButton: {
    width: 280,
    margin: 4,
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Highlight: {
    color: '#0066FF',
    textDecorationLine: 'underline',
  },
  paperinput: {
    width: 280,
    margin: 4,
  },
  input: {
    width: 280,
    margin: 4,
  },
  buttonDefault: {
    margin: 10,
  },
  button: {
    backgroundColor: '#A9FDAC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 20,
    width: 300,
    height: 40,
  },
  surface: {
    padding: 8,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  Image: {
    width: 200,
    height: 200,
  },
  ImageS: {
    width: 200,
    height: 100,
    marginTop: 25,
  },
});

export {styles};
