import React from 'react';
import {
  Animated,
  Easing,
  Platform,
  Touchable,
  StyleSheet,
  requireNativeComponent,
} from 'react-native';

const NativeMethodsMixin = require('react-native/Libraries/Renderer/shims/NativeMethodsMixin');

const ParallaxView = requireNativeComponent('ParallaxView', null);
const invariant = require('invariant');
const AnimatedParallaxView = Animated.createAnimatedComponent(ParallaxView);
const ensurePositiveDelayProps = function (props: any) {
  invariant(
    !(
      props.delayPressIn < 0 ||
      props.delayPressOut < 0 ||
      props.delayLongPress < 0
    ),
    'Touchable components cannot have negative delay properties'
  );
};

const createReactClass = require('create-react-class');

const PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

const TouchableOpacity = ((createReactClass({
  displayName: 'TouchableOpacity',
  mixins: [Touchable.Mixin.withoutDefaultFocusAndBlur, NativeMethodsMixin],

  getDefaultProps() {
    return {
      activeOpacity: 0.2,
    };
  },

  getInitialState() {
    return {
      ...this.touchableGetInitialState(),
      anim: new Animated.Value(this._getChildStyleOpacityWithDefault()),
    };
  },

  componentDidMount() {
    ensurePositiveDelayProps(this.props);
  },

  UNSAFE_componentWillReceiveProps(nextProps) {
    ensurePositiveDelayProps(nextProps);
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.props.disabled !== prevProps.disabled) {
      this._opacityInactive(250);
    }
  },

  /**
   * Animate the touchable to a new opacity.
   */
  setOpacityTo(value: number, duration: number) {
    Animated.timing(this.state.anim, {
      toValue: value,
      duration,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn(e) {
    if (e.dispatchConfig.registrationName === 'onResponderGrant') {
      this._opacityActive(0);
    } else {
      this._opacityActive(150);
    }
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut(e) {
    this._opacityInactive(250);
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandleFocus(e) {
    if (Platform.isTV) {
      this._opacityActive(150);
    }
    this.props.onFocus && this.props.onFocus(e);
  },

  touchableHandleBlur(e) {
    if (Platform.isTV) {
      this._opacityInactive(250);
    }
    this.props.onBlur && this.props.onBlur(e);
  },

  touchableHandlePress(e) {
    const { eventKeyAction } = e;
    let { disableATVonPressLimiter } = this.props;
    if (disableATVonPressLimiter) {
      this.props.onPress(e);
    } else if (eventKeyAction === 1) {
      this.props.onPress(e);
    }
  },

  touchableHandleLongPress(e) {
    this.props.onLongPress && this.props.onLongPress(e);
  },

  touchableGetPressRectOffset() {
    return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },

  touchableGetHitSlop() {
    return this.props.hitSlop;
  },

  touchableGetHighlightDelayMS() {
    return this.props.delayPressIn || 0;
  },

  touchableGetLongPressDelayMS() {
    return this.props.delayLongPress === 0
      ? 0
      : this.props.delayLongPress || 500;
  },

  touchableGetPressOutDelayMS() {
    return this.props.delayPressOut;
  },

  _opacityActive(duration: number) {
    this.setOpacityTo(this.props.activeOpacity, duration);
  },

  _opacityInactive(duration: number) {
    this.setOpacityTo(this._getChildStyleOpacityWithDefault(), duration);
  },

  _getChildStyleOpacityWithDefault() {
    const childStyle = StyleSheet.flatten(this.props.style) || {};
    return childStyle.opacity == null ? 1 : childStyle.opacity;
  },

  render() {
    return (
      <AnimatedParallaxView
        accessible={this.props.accessible !== false}
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityHint={this.props.accessibilityHint}
        accessibilityRole={this.props.accessibilityRole}
        accessibilityStates={this.props.accessibilityStates}
        accessibilityState={this.props.accessibilityState}
        accessibilityActions={this.props.accessibilityActions}
        onAccessibilityAction={this.props.onAccessibilityAction}
        style={[this.props.style, { opacity: this.state.anim }]}
        nativeID={this.props.nativeID}
        testID={this.props.testID}
        onLayout={this.props.onLayout}
        isTVSelectable
        nextFocusDown={this.props.nextFocusDown}
        nextFocusForward={this.props.nextFocusForward}
        nextFocusLeft={this.props.nextFocusLeft}
        nextFocusRight={this.props.nextFocusRight}
        nextFocusUp={this.props.nextFocusUp}
        hasTVPreferredFocus={this.props.hasTVPreferredFocus}
        tvParallaxProperties={this.props.tvParallaxProperties}
        hitSlop={this.props.hitSlop}
        focusable={
          this.props.focusable !== false && this.props.onPress !== undefined
        }
        onClick={this.touchableHandlePress}
        onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
        onResponderTerminationRequest={
          this.touchableHandleResponderTerminationRequest
        }
        onResponderGrant={this.touchableHandleResponderGrant}
        onResponderMove={this.touchableHandleResponderMove}
        onResponderRelease={this.touchableHandleResponderRelease}
        onResponderTerminate={this.touchableHandleResponderTerminate}
      >
        {this.props.children}
        {Touchable.renderDebugView({
          color: 'cyan',
          hitSlop: this.props.hitSlop,
        })}
      </AnimatedParallaxView>
    );
  },
}): any): React.ComponentType<Props>);

export default TouchableOpacity;
