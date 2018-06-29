import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import SVGIcon from '../../../../src/components/SVGIcon/SVGIcon'
import Grow from '../../../../src/components/Transitions/Grow'
import Fade from '../../../../src/components/Transitions/Fade'
import Slide from '../../../../src/components/Transitions/Slide'
import styles from './styles'
import NavigationLink from './NavigationLink'

class NavGroup extends React.Component {
  state = {
    isOpen: false
  }

  handleClick = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  includesSearchTerm = (string) => {
    const { searchTerm } = this.props
    if (!searchTerm) { return false}
    return string.toLowerCase().includes(searchTerm.toLowerCase())
  }

  renderLinks = () => {
    const {links, searchTerm} = this.props
    if(links.length === 0) { return }

    return links.map((link) => {
      if(searchTerm && !this.includesSearchTerm(link.title)) { return }
      return (
        <NavigationLink
          key={link.id}
          title={link.title}
          path={link.path}
        />
      )
    })
  }

  renderIcon = () => {
    if(this.props.role === 'link') { return }
    return (
      <SVGIcon
        name={this.state.isOpen ? 'arrowUp' : 'arrowDown'}
        style={styles.navGroupIcon}
      />
    )
  }

  render() {
    const {id, heading, resultInGroup} = this.props
    return (
      <div style={styles.navGroupContainer}>
        <div
          style={styles.navGroupTitleContainer}
          onClick={this.handleClick}
          key={`${this.props.id}-navGroup`}
        >
          <div style={styles.navGroupTitle}>{this.props.heading}</div>
          {this.renderIcon()}
        </div>
        <div style={styles.navGroupLinks}>
          <Grow in={this.state.isOpen || resultInGroup} transitionTime={300} timeout={100}>
           <Fade in={this.state.isOpen || resultInGroup} transitionTime={200}>
            <Slide in={this.state.isOpen || resultInGroup} transitionTime={350}>
              {this.renderLinks()}
            </Slide>
            </Fade>
          </Grow>
        </div>
      </div>
    )
  }
}

NavGroup.propTypes = {
  heading: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
  resultInGroup: PropTypes.bool,
}

export default Radium(NavGroup)
