import { Component } from 'custom-element-ts/src/ts/CustomElement'
import 'ts/Layouts'

import html from './index.html'
import css from '!!raw-loader!./style.css'

import * as Prism from 'prismjs'
import DemoFlipTs from '!!raw-loader!ts/Layouts/Demos/Flip/index.ts'

@Component({
	selector: 'page-demo',
	template: html,
	style: css
})
export class Demo extends HTMLElement {

	demoFlipTs: string = ''

	connected() {
		this.demoFlipTs = DemoFlipTs
		//Prism.highlightAllUnder(this)
	}
}
