// @flow

import { IconSwitchCamera, IconCamera, IconCameraDisabled } from '../../icons';

import AbstractNavigationBarButton from './AbstractNavigationBarButton';
import type { Props } from './AbstractNavigationBarButton';

/**
 * An abstract implementation of a button for toggling video mute.
 */
export default class AbstractSwitchCameraButton<P : Props, S : *>
    extends AbstractNavigationBarButton<P, S> {

    icon = IconSwitchCamera;
    toggledIcon = IconSwitchCamera;

    _isToggled() {
        return true;
    }

    _isDisabled() {

    }
}
