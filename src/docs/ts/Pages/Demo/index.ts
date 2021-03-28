import { Component } from 'ts/CustomElement'
import 'docs/ts/Layouts'

import html from './index.html'
import css from '!!raw-loader!./style.css'

import * as Prism from 'prismjs'
import DemoFlipTs from '!!raw-loader!docs/ts/Layouts/Demos/Flip/index.ts'

@Component({
	selector: 'page-demo',
	template: html,
	style: css
})
export class Demo extends HTMLElement {

	demoFlipTs: string = ''

	init() {
		this.demoFlipTs = DemoFlipTs
		//Prism.highlightAllUnder(this)
	}
}
