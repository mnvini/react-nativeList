import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native'
import { connect } from 'react-redux'
import { CardSection } from './common'
import * as actions from '../actions'

class ListItem extends Component {

  componentWillUpdate() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.spring();
  }

  renderDescripton() {
    const { expanded, children } = this.props;

    if (expanded)
      return (
        <CardSection>
          <Text style={{ flex: 1 }}>
            {children.description}
          </Text>
        </CardSection>
      )
  }


  render() {
    const { title, id } = this.props.children
    const { titleStyle } = styles
    return (
      <TouchableWithoutFeedback onPress={() => this.props.selectLibrary(id)}>
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
          {this.renderDescripton()}
        </View>
      </TouchableWithoutFeedback>
    )
  }

}
const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
})

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.children.id;
  return { expanded }
}

export default connect(mapStateToProps, actions)(ListItem);
