import {initAppBarOpacity, initDropdown} from './app-bar'
import lazySizes from 'lazysizes'

window.lazySizesConfig = window.lazySizesConfig || {}
window.lazySizesConfig.expand = 1000

lazySizes.init()
initAppBarOpacity()
initDropdown()
