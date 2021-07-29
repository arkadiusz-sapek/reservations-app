import '@emotion/react';
import { ThemeTyping } from 'settings/variables';

declare module '@emotion/react' {
    export interface Theme extends ThemeTyping {}
}
