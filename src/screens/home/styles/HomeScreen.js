import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '$grayBackground'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$grayBackground',
  },
  bottomContainer: {
    flex: 0.1,
    backgroundColor: '$bottomColor'
  }
})

export default styles