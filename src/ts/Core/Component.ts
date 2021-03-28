import { findVariablesInHTMLElement, setVariablesInNodes } from './Template'
import { Type, recordToArray, flatify } from './Utils'

export interface ComponentParameters {
	selector: string
	classes?: string
	attributes?: object
	extends?: string
	template?: string
	style?: string
	useShadow?: boolean
}

const createTemplate = (html?: string, style?: string): HTMLTemplateElement => {
	const template = document.createElement('template')
	template.innerHTML = (style ? `<style>${style}</style>` : '') + (html ?? '')
	return template
}

export const Component = (config: ComponentParameters) => {
	if (config.selector.indexOf('-') <= 0) throw new Error('You need at least 1 dash in the component element name.')
	return <T extends Type<HTMLElement>>(component: T) => {
		const template = createTemplate(config.template, config.style)

		const init = component.prototype.init ?? function() { }
		component.prototype.connectedCallback = function() {
			this.baseContent = this.innerHTML
			this.innerHTML = ''
			if (config.classes)
				this.setAttribute('class', config.classes)
			if (config.attributes)
				for (const [key, value] of Object.entries(config.attributes))
					this.setAttribute(key, value);
			const clone = document.importNode(template.content, true)
			if (config.useShadow)
				this.attachShadow({ mode: 'open' }).appendChild(clone)
			else
				this.appendChild(clone)
			this.constructor.__variables__ = findVariablesInHTMLElement(this)
			init.call(this)
			this.constructor.__isInitialized__ = true
			setVariablesInNodes(this, flatify(recordToArray(this.constructor.__variables__)))
		}

		const destroy = component.prototype.destroy ?? function() { }
		component.prototype.disconnectedCallback = () => destroy.call(this)

		if (!component.prototype.constructor.hasOwnProperty('__attributes__'))
			component.prototype.constructor.__attributes__ = []

		Object.defineProperty(component.prototype.constructor, 'observedAttributes', {
			get() {
				return this.__attributes__;
			}
		})

		const update = component.prototype.update ?? function() { }
		Object.assign(component.prototype, {
			attributeChangedCallback(name: string, oldValue: any, newValue: any) {
				if (oldValue === newValue) return;
				(this as any)["__" + name] = newValue
				if ((this.constructor as any).__isInitialized__) {
					update.call(this)
					setVariablesInNodes(this as any, (this.constructor as any).__variables__[name])
				}
			}
		})

		if (typeof config.extends !== 'undefined')
			window.customElements.define(config.selector, component, { extends: config.extends })
		else
			window.customElements.define(config.selector, component)
	}
}

export const Attribute = () => {
	return <T extends HTMLElement>(component: T, propertyKey: string) => {
		if (!component.constructor.hasOwnProperty('__attributes__'))
			(component.constructor as any).__attributes__ = [];
		(component.constructor as any).__attributes__.push(propertyKey)

		Object.defineProperty(component, propertyKey, {
			get() {
				return (this as any)["__" + propertyKey]
			},
			set(value: any) {
				(this as any)["__" + propertyKey] = value
				if (value)
					this.setAttribute(propertyKey, value)
				else
					this.removeAttribute(propertyKey);
			},
			enumerable: true
		})
	}
}
