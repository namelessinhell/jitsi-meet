// @flow

import {
    ACTION_SHORTCUT_TRIGGERED,
    AUDIO_MUTE,
    createShortcutEvent,
    sendAnalytics
} from '../../analytics';
import { translate } from '../../base/i18n';
import { MEDIA_TYPE } from '../../base/media';
import { connect } from '../../base/redux';
import { AbstractAudioChangeButton } from '../../base/toolbox';
import type { AbstractButtonProps } from '../../base/toolbox';
import { isLocalTrackMuted } from '../../base/tracks';
import { muteLocal } from '../../remote-video-menu/actions';
import {
    Icon,
    IconDeviceBluetooth,
    IconDeviceEarpiece,
    IconDeviceHeadphone,
    IconDeviceSpeaker
} from '../../base/icons';
import React, { Component } from 'react';
import {AudioRoutePickerDialog} from '../../mobile/audio-mode/components/AudioRoutePickerDialog';
import { NativeModules } from 'react-native';
import { openDialog } from '../../base/dialog';
declare var APP: Object;

const { AudioMode } = NativeModules;

type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function used to open/show the
     * {@code AudioRoutePickerDialog}.
     */
    dispatch: Function
};

/**
 * Component that renders a toolbar button for toggling audio mute.
 *
 * @extends AbstractAudioChangeButton
 */
class AudioChangeButton extends AbstractAudioChangeButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.mute';
    label = 'toolbar.audioRoute';
    tooltip = 'toolbar.audioRoute';

    /**
     * Initializes a new {@code AudioMuteButton} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

    }

    /**
     * Registers the keyboard shortcut that toggles the audio muting.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
       // this.getDeviceList(this.props);
    }

    /**
     * Unregisters the keyboard shortcut that toggles the audio muting.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillUnmount() {

    }



    /**
     * Indicates if audio is currently muted ot nor.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isAudioMuted() {
        return this.props._audioMuted;
    }

    _onKeyboardShortcut: () => void;

    /**
     * Creates an analytics keyboard shortcut event and dispatches an action to
     * toggle the audio muting.
     *
     * @private
     * @returns {void}
     */
    _onKeyboardShortcut() {
        sendAnalytics(
            createShortcutEvent(
                AUDIO_MUTE,
                ACTION_SHORTCUT_TRIGGERED,
                { enable: !this._isAudioMuted() }));

        super._handleClick();
    }

    /**
     * Changes the muted state.
     *
     * @param {boolean} audioMuted - Whether audio should be muted or not.
     * @protected
     * @returns {void}
     */
    _setAudioMuted(audioMuted: boolean) {
        this.props.dispatch(muteLocal(audioMuted));
    }

    /**
     * Return a boolean value indicating if this button is disabled or not.
     *
     * @returns {boolean}
     */
    _isDisabled() {
        return this.props._disabled;
    }

    _handleClick() {
        console.log("Clicked \n");
        this.props.dispatch(openDialog(AudioRoutePickerDialog));
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code AudioMuteButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _audioMuted: boolean
 * }}
 */
function _mapStateToProps(state): Object {
    const tracks = state['features/base/tracks'];
    return {
        _audioMuted: isLocalTrackMuted(tracks, MEDIA_TYPE.AUDIO),
        _disabled: state['features/base/config'].startSilent,

    };
}

export default translate(connect(_mapStateToProps)(AudioChangeButton));