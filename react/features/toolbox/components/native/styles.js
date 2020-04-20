// @flow

import { ColorSchemeRegistry, schemeColor } from '../../../base/color-scheme';
import { BoxModel, ColorPalette } from '../../../base/styles';

const NAVIGATION_BUTTON_SIZE = 30;
const BUTTON_SIZE = 50;
const HANG_BUTTON_SIZE = 60;
// Toolbox, toolbar:

/**
 * The style of toolbar buttons.
 */
const toolbarButton = {
    backgroundColor: schemeColor('button'),
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 0,
    flex: 0,
    flexDirection: 'row',
    height: BUTTON_SIZE,
    justifyContent: 'center',

    // XXX We probably tested BoxModel.margin and discovered it to be too small
    // for our taste.
    marginHorizontal: 7,
    width: BUTTON_SIZE
};
const navigationBarButton = {
    backgroundColor: 'transparent',
    borderRadius: NAVIGATION_BUTTON_SIZE / 2,
    borderWidth: 0,
    flex: 0,
    flexDirection: 'row',
    height: NAVIGATION_BUTTON_SIZE,
    justifyContent: 'center',

    // XXX We probably tested BoxModel.margin and discovered it to be too small
    // for our taste.
    marginHorizontal: 7,
    width: NAVIGATION_BUTTON_SIZE
};
const hangToolbarButton = {
    backgroundColor: schemeColor('button'),
    borderRadius: HANG_BUTTON_SIZE / 2,
    borderWidth: 0,
    flex: 0,
    flexDirection: 'row',
    height: HANG_BUTTON_SIZE,
    justifyContent: 'center',

    // XXX We probably tested BoxModel.margin and discovered it to be too small
    // for our taste.
    marginHorizontal: 7,
    width: HANG_BUTTON_SIZE
};
/**
 * The icon style of the toolbar buttons.
 */
const toolbarButtonIcon = {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 22
};

/**
 * The style of toolbar buttons which display white icons.
 */
const whiteToolbarButton = {
    ...toolbarButton,
    backgroundColor: schemeColor('buttonToggled')
};

/**
 * The icon style of toolbar buttons which display yellow icons.
 */
const yellowToolbarButtonIcon = {
    ...toolbarButtonIcon,
    color: '#f8991d'
};

/**
 * The icon style of toolbar buttons which display white icons.
 */
const whiteToolbarButtonIcon = {
    ...toolbarButtonIcon,
    color: '#ffffff'
};

/**
 * The Toolbox and toolbar related styles.
 */
const styles = {

    expandMenuContainer: {
        alignItems: 'center',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'column'
    },

    sheetGestureRecognizer: {
        alignItems: 'stretch',
        flexDirection: 'column'
    },

    /**
     * The style of the toolbar.
     */
    toolbar: {
        alignItems: 'center',
        flexDirection: 'row',
        flexGrow: 0,
        justifyContent: 'center',
        marginBottom: BoxModel.margin / 2,
        paddingHorizontal: BoxModel.margin
    },

    /**
     * The style of the root/top-level {@link Container} of {@link Toolbox}.
     */
    toolbox: {
        flexDirection: 'column',
        flexGrow: 0
    }
};

export default styles;

/**
 * Color schemed styles for the @{Toolbox} component.
 */
ColorSchemeRegistry.register('Toolbox', {
    /**
     * Styles for buttons in the toolbar.
     */
    buttonStyles: {
        iconStyle: toolbarButtonIcon,
        style: toolbarButton
    },

    buttonStylesBorderless: {
        iconStyle: whiteToolbarButtonIcon,
        style: {
            ...toolbarButton,
            backgroundColor: 'transparent'
        }
    },

    /**
     * Overrides to the standard styles that we apply to the chat button, as
     * that behaves slightly differently to other buttons.
     */
    chatButtonOverride: {
        toggled: {
            backgroundColor: ColorPalette.blue
        }
    },

    hangupButtonStyles: {
        iconStyle: whiteToolbarButtonIcon,
        style: {
            ...hangToolbarButton,
            backgroundColor: schemeColor('hangup')
        },
        underlayColor: ColorPalette.buttonUnderlay
    },

    /**
     * Styles for toggled buttons in the toolbar.
     */
    toggledButtonStyles: {
        iconStyle: yellowToolbarButtonIcon,
        style: {
            ...whiteToolbarButton,
            borderColor: schemeColor('buttonToggledBorder'),
            borderWidth: 1
        }
    },

    navigationBarButtonStyles: {
        iconStyle: yellowToolbarButtonIcon,
        style: {
            ...navigationBarButton,
            backgroundColor: 'transparent',
            borderWidth: 0
        }
    }
});
