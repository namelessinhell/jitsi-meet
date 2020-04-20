// @flow

import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { getConferenceName } from '../../../base/conference';
import { connect } from '../../../base/redux';
import { PictureInPictureButton } from '../../../mobile/picture-in-picture';
import { isToolboxVisible } from '../../../toolbox';

import ConferenceTimer from '../ConferenceTimer';
import styles, { NAVBAR_GRADIENT_COLORS } from './styles';

import VideoMuteButton from '../../../toolbox/components/VideoMuteButton';
import SwitchCameraButton from '../../../toolbox/components/SwitchCameraButton';

import { StyleType } from '../../../base/styles';
import { ColorSchemeRegistry } from '../../../base/color-scheme';

import ToggleCameraButton from '../../../toolbox/components/native/ToggleCameraButton';

type Props = {

    /**
     * Name of the meeting we're currently in.
     */
    _meetingName: string,

    /**
     * The color-schemed stylesheet of the feature.
     */
    _styles: StyleType,

    _bottomSheetStyles: StyleType,

    /**
     * True if the navigation bar should be visible.
     */
    _visible: boolean
};

/**
 * Implements a navigation bar component that is rendered on top of the
 * conference screen.
 */
class NavigationBar extends Component<Props> {
    /**
     * Implements {@Component#render}.
     *
     * @inheritdoc
     */
    render() {
        if (!this.props._visible) {
            return null;
        }
        const { _styles } = this.props;
        const { buttonStyles, toggledButtonStyles, navigationBarButtonStyles } = _styles;
        const { _bottomSheetStyles } = this.props;
        const { _audioOnly } = this.props;
        const buttonProps = {
            afterClick: this._onCancel,
            showLabel: true,
            styles: _bottomSheetStyles.buttons
        };
        if ( _audioOnly == false ) {
            return [
                <LinearGradient
                    colors = { NAVBAR_GRADIENT_COLORS }
                    key = { 1 }
                    pointerEvents = 'none'
                    style = { styles.gradient }>
                    <SafeAreaView>
                        <View style = { styles.gradientStretchTop } />
                    </SafeAreaView>
                </LinearGradient>,
                <View
                    key = { 2 }
                    pointerEvents = 'box-none'
                    style = { [styles.navBarWrapper, {justifyContent: 'flex-end'}] }>

                    <View
                        pointerEvents = 'box-none'
                        style = { styles.roomNameWrapper }>
                        <Text
                            numberOfLines = { 1 }
                            style = { styles.roomName }>
                            { this.props._meetingName }
                        </Text>
                        <ConferenceTimer />
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                    <VideoMuteButton
                        styles = { navigationBarButtonStyles }
                        toggledStyles = { navigationBarButtonStyles } />
                    <SwitchCameraButton styles = { navigationBarButtonStyles }
                        toggledStyles = { navigationBarButtonStyles } />
                </View>
                </View>,

            ];
        }
        return [
            <LinearGradient
                colors = { NAVBAR_GRADIENT_COLORS }
                key = { 1 }
                pointerEvents = 'none'
                style = { styles.gradient }>
                <SafeAreaView>
                    <View style = { styles.gradientStretchTop } />
                </SafeAreaView>
            </LinearGradient>,
            <View
                key = { 2 }
                pointerEvents = 'box-none'
                style = { [styles.navBarWrapper, {justifyContent: 'flex-end'}] }>

                <View
                    pointerEvents = 'box-none'
                    style = { styles.roomNameWrapper }>
                    <Text
                        numberOfLines = { 1 }
                        style = { styles.roomName }>
                        { this.props._meetingName }
                    </Text>
                    <ConferenceTimer />
                </View>
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>

            </View>
            </View>,

        ];
    }
    _onCancel() {
        return false;
    }
}

/**
 * Maps part of the Redux store to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {{
 *     _meetingName: string,
 *     _visible: boolean
 * }}
 */
function _mapStateToProps(state) {
    const { enabled: audioOnly } = state['features/base/audio-only'];
    return {
        _audioOnly: Boolean(audioOnly),
        _meetingName: getConferenceName(state),
        _visible: isToolboxVisible(state),
        _styles: ColorSchemeRegistry.get(state, 'Toolbox'),
        _bottomSheetStyles: ColorSchemeRegistry.get(state, 'BottomSheet'),
    };
}

export default connect(_mapStateToProps)(NavigationBar);
